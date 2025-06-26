// src/pages/TrackDemand.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, orderBy, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { motion } from "framer-motion";

export default function TrackDemand() {
  const { id } = useParams();                  // id de la demanda en la ruta
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Seguimiento de Demanda";
    if (!id) {
      setError("ID de demanda inválido");
      setLoading(false);
      return;
    }
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Primero intentamos leer subcolección 'Historial' con eventos de status
        const histRef = collection(db, "Demandas", id, "Historial");
        const q = query(histRef, orderBy("timestamp", "asc"));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const items = snap.docs.map(doc => ({  
            id: doc.id,
            ...doc.data(),
            date: doc.data().timestamp.toDate().toLocaleDateString(),
          }));
          setHistory(items);
        } else {
          // Si no hay historial, creamos unos pasos básicos
          const dSnap = await getDoc(doc(db, "Demandas", id));
          const d = dSnap.data();
          if (d) {
            setHistory([
              { id: 'created', date: d.fecha.toDate().toLocaleDateString(), status: 'Demanda presentada' },
              { id: 'current', date: d.fecha.toDate().toLocaleDateString(), status: d.estatus }
            ]);
          } else {
            setError("No se encontró la demanda.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar el seguimiento.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [id]);

  if (loading) return <p className="text-gray-500">Cargando seguimiento...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!history.length) return <p className="text-gray-500">No hay eventos de seguimiento.</p>;

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Seguimiento de Demanda
      </h2>
      <div className="space-y-4">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            className="border-l-4 border-green-500 pl-4 py-2 relative"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="absolute -left-2 top-2 w-4 h-4 bg-green-500 rounded-full"></span>
            <p className="text-sm text-gray-500">{item.date}</p>
            <p className="text-md font-medium text-gray-800">{item.status}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ← Volver
        </button>
      </div>
    </motion.div>
  );
}
