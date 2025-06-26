// src/pages/ReviewDemandado.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function ReviewDemandado() {
  const { currentUser, authLoading } = useAuth();
  const [demands, setDemands]     = useState([]);
  const [usersMap, setUsersMap]   = useState({});
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    document.title = "Demandas Contra Ti";

    if (authLoading) return;
    if (!currentUser) {
      setLoading(false);
      return;
    }


    const fetchDemandsAndUsers = async () => {
      setLoading(true);
      try {
        const userPath  = `/Usuarios/${currentUser.uid}`;
        const demandsRef = collection(db, "Demandas");

        // 1) Obtener demandas donde eres el demandado
        const snap = await getDocs(
          query(demandsRef, where("demandado", "==", userPath))
        );
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setDemands(docs);

        // 2) Extraer UIDs de demandante e instanciaLegal
        const uids = docs
          .flatMap(d => [
            d.demandante?.split("/").pop(),
            d.instanciaLegal?.split("/").pop()
          ])
          .filter(Boolean);
        const uniqueUids = Array.from(new Set(uids));

        // 3) Cargar datos de usuarios involucrados
        const map = {};
        await Promise.all(
          uniqueUids.map(async uid => {
            const snapU = await getDoc(doc(db, "Usuarios", uid));
            if (snapU.exists()) map[uid] = snapU.data();
          })
        );
        setUsersMap(map);
      } catch (err) {
        console.error("Error cargando demandas para demandado:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandsAndUsers();
  }, [authLoading, currentUser]);

  if (loading) return <p className="text-gray-500">Cargando demandas…</p>;
  if (!currentUser) return <p className="text-gray-500">Debes iniciar sesión.</p>;
  if (demands.length === 0) return <p className="text-gray-500">No tienes demandas contra ti.</p>;

  return (
    <div className="p-61">
      <h1 className="text-2xl font-bold mb-6">Demandas Contra Ti</h1>
      <div className="space-y-4">
        {demands.map(d => {
          const uidDmd  = d.demandante?.split("/").pop();
          const uidInst = d.instanciaLegal?.split("/").pop();

          return (
            <motion.div
              key={d.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex justify-between items-start"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{d.tipo}</h2>
                <p className="text-sm text-gray-600">
                  ID: {d.id} • {d.fecha?.toDate?.().toLocaleDateString()}
                </p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Descripción:</span> {d.descripcion}
                </p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Demandante:</span> {usersMap[uidDmd]?.nombre ?? uidDmd}
                </p>
                {uidInst && (
                  <p className="text-sm mt-1">
                    <span className="font-medium">Instancia Legal:</span> {usersMap[uidInst]?.nombre ?? uidInst}
                  </p>
                )}
                <p className="text-sm mt-1">
                  <span className="font-medium">Estado:</span> {d.estatus}
                </p>
              </div>

              <Link
                to={`/demandado/track-demand/${d.id}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Eye size={18} /> Ver seguimiento
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
