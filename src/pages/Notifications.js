// src/pages/Notifications.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BellRing, MailOpen } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export default function Notifications() {
  const { currentUser, authLoading } = useAuth();
  const [demands, setDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Notificaciones";
    if (authLoading) return;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchDemands = async () => {
      setLoading(true);
      try {
        const userPath = `/Usuarios/${currentUser.uid}`;
        // Intentar demandas asignadas a la instancia legal
        let q = query(
          collection(db, "Demandas"),
          where("instanciaLegal", "==", userPath)
        );
        let snap = await getDocs(q);
        let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        // Si no hay asignadas, cargar las que están en revisión
        if (docs.length === 0) {
          q = query(
            collection(db, "Demandas"),
            where("estatus", "==", "En revisión")
          );
          snap = await getDocs(q);
          docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
        setDemands(docs);
      } catch (err) {
        console.error("Error cargando demandas:", err);
        setError("No se pudieron cargar las demandas.");
      } finally {
        setLoading(false);
      }
    };

    fetchDemands();

    // Ejemplo de mensajes recibidos (sólo demo)
    setReceivedMessages([
      {
        id: 1,
        from: "Ana Torres",
        role: "Demandante",
        demandId: "DMD-00123",
        content: "¿Cuándo se programará la audiencia inicial?",
        date: "2025-06-07",
      },
      {
        id: 2,
        from: "Pedro Lara",
        role: "Demandado",
        demandId: "DMD-00124",
        content: "Tengo pruebas nuevas. ¿Dónde las subo?",
        date: "2025-06-08",
      },
    ]);
  }, [authLoading, currentUser]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedDemand || !recipient || !message.trim()) {
      setStatusMessage("Por favor, completa todos los campos.");
      return;
    }
    // Aquí iría addDoc a Firestore u otra lógica
    console.log("Enviando notificación:", {
      demanda: selectedDemand,
      destinatario: recipient,
      mensaje: message,
    });
    setStatusMessage(
      `Notificación enviada a ${recipient} en la demanda ${selectedDemand}.`
    );
    setSelectedDemand("");
    setRecipient("");
    setMessage("");
  };

  return (
    <div className="p-6 space-y-10">
      {/* Enviar notificación */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Enviar Notificación Legal</h1>
        <form
          onSubmit={handleSend}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-2xl"
        >
          {loading && <p className="text-gray-500">Cargando demandas...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block font-semibold mb-1">Seleccionar Demanda</label>
            <select
              value={selectedDemand}
              onChange={(e) => setSelectedDemand(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={loading}
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
            <label className="block font-semibold mb-1">Destinatario</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">-- Selecciona destinatario --</option>
              <option value="demandante">Demandante</option>
              <option value="demandado">Demandado</option>
              <option value="ambos">Ambos</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Mensaje</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded resize-none h-36"
              placeholder="Ej. Su próxima audiencia será el 15 de junio a las 10:00 AM en la sala 3."
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            disabled={loading}
          >
            <BellRing size={18} /> Enviar Notificación
          </motion.button>

          {statusMessage && (
            <p className="text-sm text-green-600 mt-2">{statusMessage}</p>
          )}
        </form>
      </section>

      {/* Mensajes Recibidos */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Mensajes Recibidos</h2>
        <div className="space-y-4 max-w-2xl">
          {receivedMessages.length === 0 ? (
            <p className="text-gray-600">No hay mensajes nuevos de los usuarios.</p>
          ) : (
            receivedMessages.map((msg) => (
              <div key={msg.id} className="message-box p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MailOpen size={16} />
                    <span className="font-medium">{msg.from} ({msg.role})</span>
                  </div>
                  <span className="text-sm text-gray-500">{msg.date}</span>
                </div>
                <p className="mt-2">{msg.content}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
