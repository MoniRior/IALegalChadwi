import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const demandData = {
  title: "Demanda por incumplimiento de contrato",
  status: "En proceso",
  description: "La parte demandada no cumplió con los términos establecidos en el contrato firmado el 12 de marzo de 2023. Se solicita compensación económica.",
  submittedAt: "2024-09-01",
  attachedFiles: ["Contrato_firmado.pdf", "Pruebas_chat.png"]
};

export default function ViewDemand() {
    const navigate = useNavigate();
  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center mb-6">
        <FileText className="text-purple-600 mr-2" size={32} />
        <h2 className="text-2xl font-bold text-purple-700">VDetalles de la Demanda</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-purple-800">Título:</h3>
          <p className="text-gray-700">{demandData.title}</p>
        </div>

        <div>
          <h3 className="font-semibold text-purple-800">Estado:</h3>
          <p className="text-gray-700">{demandData.status}</p>
        </div>

        <div>
          <h3 className="font-semibold text-purple-800">Fecha de Envío:</h3>
          <p className="text-gray-700">{demandData.submittedAt}</p>
        </div>

        <div>
          <h3 className="font-semibold text-purple-800">Descripción:</h3>
          <p className="text-gray-700">{demandData.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-purple-800">Archivos Adjuntos:</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {demandData.attachedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
        <div>
            <button
            onClick={() => navigate("/respond-demand")}
            >
            Conversar sobre la demanda
          </button>
        </div>
      </div>
    </motion.div>
  );
}
