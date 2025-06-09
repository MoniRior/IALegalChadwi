// src/pages/Notifications.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BellRing, MailOpen } from "lucide-react";

export default function Notifications() {
  const [demands, setDemands] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Simulación de mensajes recibidos
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    document.title = "Notificaciones";

    // Simulación de demandas disponibles
    setDemands([
      {
        id: "DMD-00123",
        title: "Incumplimiento de contrato",
        claimant: "Ana Torres",
        defendant: "Carlos Méndez",
      },
      {
        id: "DMD-00124",
        title: "Demanda por daños y perjuicios",
        claimant: "Lucía Rivera",
        defendant: "Pedro Lara",
      },
    ]);

    // Simulación de mensajes entrantes
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
  }, []);

  const handleSend = (e) => {
    e.preventDefault();

    if (!selectedDemand || !recipient || !message.trim()) {
      setStatusMessage("Por favor, completa todos los campos.");
      return;
    }

    // Aquí se haría un POST al backend
    console.log("Enviando notificación:", {
      demanda: selectedDemand,
      destinatario: recipient,
      mensaje: message,
    });

    setStatusMessage(`Notificación enviada a ${recipient} en la demanda ${selectedDemand}.`);
    setMessage("");
    setRecipient("");
    setSelectedDemand("");
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
          <div>
            <label className="block font-semibold mb-1">Seleccionar Demanda</label>
            <select
              value={selectedDemand}
              onChange={(e) => setSelectedDemand(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">-- Selecciona una demanda --</option>
              {demands.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.id} - {d.title}
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
              className="w-full p-3 border border-gray-300 rounded resize-none h-36"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ej. Su próxima audiencia será el 15 de junio a las 10:00 AM en la sala 3."
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <BellRing size={18} />
            Enviar Notificación
          </motion.button>

          {statusMessage && (
            <p className="text-sm text-green-600 mt-2">{statusMessage}</p>
          )}
        </form>
      </section>
      <br></br>
      <br></br>
      {/* Mensajes recibidos */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Mensajes Recibidos</h2>
        <div className="space-y-4">
          {receivedMessages.length === 0 ? (
            <p className="text-gray-600">No hay mensajes nuevos de los usuarios.</p>
          ) : (
            receivedMessages.map((msg) => (
            <div key={msg.id} className="message-box">
            <div className="message-header">
                <div className="message-icon">
                <MailOpen size={16} />
                {msg.from} ({msg.role}) — {msg.demandId}
                </div>
                <span className="message-date">{msg.date}</span>
            </div>
            <p className="message-body">{msg.content}</p>
            </div>

            ))
          )}
        </div>
      </section>
    </div>
  );
}
