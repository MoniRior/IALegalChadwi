// src/pages/RespondDemand.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

export default function LegalRespond() {
  const [demands, setDemands] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [responseText, setResponseText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    document.title = "Responder Demanda";

    // Simulación de demandas disponibles para responder
    setDemands([
      { id: "DMD-00123", title: "Incumplimiento de contrato" },
      { id: "DMD-00124", title: "Demanda por daños y perjuicios" },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !responseText.trim()) {
      setStatusMessage("Por favor, completa todos los campos.");
      return;
    }

    // Aquí podrías hacer una llamada POST a tu backend
    console.log("Enviando respuesta:", { id: selectedId, texto: responseText });

    setStatusMessage(`Respuesta enviada para la demanda ${selectedId}.`);
    setResponseText("");
    setSelectedId("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Responder Demanda</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Seleccionar Demanda</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
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
          <label className="block font-semibold mb-1">Respuesta Legal</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded resize-none h-40"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Escribe aquí la respuesta formal..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          type="submit"
        >
          <SendHorizonal size={18} />
          Enviar Respuesta
        </motion.button>

        {statusMessage && (
          <p className="text-sm text-green-600 mt-2">{statusMessage}</p>
        )}
      </form>
    </div>
  );
}
