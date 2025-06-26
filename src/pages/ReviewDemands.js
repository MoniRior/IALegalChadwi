// src/pages/ReviewDemands.js
// INSTANCIA LEGAL
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import {
  collection, query, where, getDocs, documentId
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ReviewDemands() {
  const { currentUser, authLoading } = useAuth();
  const [demands, setDemands]   = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      setLoading(false);
      return;
    }
    // ¡Limpio el state al cambiar de usuario!
    setDemands([]);
    setUsersMap({});
    
    const fetchDemandsAndUsers = async () => {
      setLoading(true);
      try {
        const userPath   = `/Usuarios/${currentUser.uid}`;
        const demandsRef = collection(db, "Demandas");
        const [snapDmd, snapDdo, snapInst] = await Promise.all([
          getDocs(query(demandsRef, where("demandante",      "==", userPath))),
          getDocs(query(demandsRef, where("demandado",       "==", userPath))),
          getDocs(query(demandsRef, where("instanciaLegal", "==", userPath)))
        ]);
        const all = [...snapDmd.docs, ...snapDdo.docs, ...snapInst.docs];
        const uniqueDemands = Array.from(
          new Map(all.map(d => [d.id, { id: d.id, ...d.data() }])).values()
        );
        setDemands(uniqueDemands);

        const uids = uniqueDemands
          .flatMap(d => [
            d.demandante?.split("/").pop(),
            d.demandado?.split("/").pop(),
            d.instanciaLegal?.split("/").pop()
          ])
          .filter(Boolean);
        const uniqueUids = Array.from(new Set(uids));

        let map = {};
        if (uniqueUids.length) {
          const usersSnap = await getDocs(
            query(
              collection(db, "Usuarios"),
              where(documentId(), "in", uniqueUids)
            )
          );
          usersSnap.forEach(uDoc => {
            map[uDoc.id] = uDoc.data();
          });
        }
        setUsersMap(map);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandsAndUsers();
  }, [authLoading, currentUser]);

  if (loading) return <p>Cargando demandas…</p>;
  if (!currentUser) return <p>Debes iniciar sesión.</p>;
  if (!demands.length) return <p>No hay demandas disponibles.</p>;

  return (
    <div className="p-61">
      <h1 className="text-2xl font-bold mb-6">Demandas Recibidas</h1>
      <div className="space-y-4">
        {demands.map(d => {
          const uidDmd  = d.demandante?.split("/").pop();
          const uidDdo  = d.demandado?.split("/").pop();
          const uidInst = d.instanciaLegal?.split("/").pop();
          return (
            <motion.div
              key={d.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h2 className="text-lg font-semibold">{d.tipo}</h2>
                <p className="text-sm text-gray-600">
                  ID: {d.id} • {d.fecha?.toDate?.().toLocaleDateString() ?? "—"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Descripción:</span>{" "}
                  {d.descripcion}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Demandante:</span>{" "}
                  {usersMap[uidDmd]?.nombre ?? uidDmd}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Demandado:</span>{" "}
                  {usersMap[uidDdo]?.nombre ?? uidDdo}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Instancia Legal:</span>{" "}
                  {usersMap[uidInst]?.nombre ?? "—"}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Estado:</span> {d.estatus}
                </p>
              </div>
              <Link
                to={`/legal/track-demand/${d.id}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Eye size={18} />
                Ver seguimiento
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
