import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function RespondDemand() {
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (response.trim()) {
      // Aquí se enviaría la respuesta al backend
      setSubmitted(true);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center mb-6">
        <Send className="text-green-600 mr-2" size={32} />
        <h2 className="text-2xl font-bold text-green-700">Responder a Demanda</h2>
      </div>

      {submitted ? (
        <div className="text-green-600 font-semibold text-center">
          Respuesta enviada correctamente.<br></br>La IA procesara su respuesta y la contestara o enviara a la entidad legal correspondiente
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Escribe tu respuesta o duda:
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-4 h-40 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Redacta tu respuesta legal aquí..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700 transition"
          >
            Enviar Respuesta
          </button>
        </form>
      )}
    </motion.div>
  );
}