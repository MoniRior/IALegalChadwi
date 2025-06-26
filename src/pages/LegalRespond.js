// src/pages/RespondDemand.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../services/firebase";

export default function RespondDemand() {
  const { currentUser, authLoading } = useAuth();
  const [demands, setDemands]       = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [responseText, setResponseText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  useEffect(() => {
    document.title = "Responder Demanda";
    if (authLoading) return;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchDemands = async () => {
      setLoading(true);
      try {
        // Cargar demandas asignadas a esta instancia legal
        const userPath = `/Usuarios/${currentUser.uid}`;
        const q = query(
          collection(db, "Demandas"),
          where("estatus", "==", "En revisión")
        );
        const snap = await getDocs(q);
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setDemands(docs);
      } catch (err) {
        console.error("Error fetching demands:", err);
        setError("No se pudieron cargar las demandas.");
      } finally {
        setLoading(false);
      }
    };

    fetchDemands();
  }, [authLoading, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (!selectedId) {
      setError("Por favor selecciona una demanda.");
      return;
    }
    if (!responseText.trim()) {
      setError("El texto de la respuesta no puede estar vacío.");
      return;
    }

    try {
      // Agregar la respuesta a la subcoleccion "Respuestas"
      await addDoc(
        collection(db, "Demandas", selectedId, "Respuestas"),
        {
          texto: responseText,
          fecha: serverTimestamp(),
          respondedor: `/Usuarios/${currentUser.uid}`
        }
      );
      // Opcional: actualizar estatus en el documento principal
      await updateDoc(doc(db, "Demandas", selectedId), {
        estatus: "Respondida"
      });

      setStatusMessage(`Respuesta enviada para la demanda ${selectedId}.`);
      // Resetear campos
      setSelectedId("");
      setResponseText("");
    } catch (err) {
      console.error("Error al enviar respuesta:", err);
      setError("Ocurrió un error al enviar la respuesta.");
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
        Respondedor de Demandas
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando demandas...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}
          {statusMessage && <p className="text-green-600">{statusMessage}</p>}

          <div>
            <label className="block mb-1 text-gray-700">Seleccionar Demanda</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">-- Selecciona una demanda --</option>
              {demands.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.tipo} • {d.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Respuesta Legal</label>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Escribe aquí la respuesta formal..."
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700"
          >
            <SendHorizontal size={18} /> Enviar Respuesta
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
