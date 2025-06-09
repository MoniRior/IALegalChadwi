// src/pages/ReviewDemands.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export default function ReviewDemands() {
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Revisión de Demandas";

    // Simulación de llamada a API
    setTimeout(() => {
      setDemands([
        {
          id: "DMD-00123",
          title: "Incumplimiento de contrato",
          status: "Pendiente",
          claimant: "Ana Torres",
          defendant: "Carlos Méndez",
          date: "2025-06-01",
        },
        {
          id: "DMD-00124",
          title: "Demanda por daños y perjuicios",
          status: "En revisión",
          claimant: "Lucía Rivera",
          defendant: "Pedro Lara",
          date: "2025-06-03",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-61">
      <h1 className="text-2xl font-bold mb-4">Demandas Recibidas</h1>

      {loading ? (
        <p className="text-gray-500">Cargando demandas...</p>
      ) : demands.length === 0 ? (
        <p className="text-gray-500">No hay demandas disponibles.</p>
      ) : (
        <div className="space-y-4">
          {demands.map((demand) => (
            <motion.div
              key={demand.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h2 className="text-lg font-semibold">{demand.title}</h2>
                <p className="text-sm text-gray-600">
                  ID: {demand.id} • {demand.date}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Demandante:</span> {demand.claimant} |{" "}
                  <span className="font-medium">Demandado:</span> {demand.defendant}
                </p>
                <p className={`text-sm mt-1 ${demand.status === "Pendiente" ? "text-red-600" : "text-yellow-600"}`}>
                  Estado: {demand.status}
                </p>
              </div>
              <button
                onClick={() => alert(`Abrir demanda ${demand.id}`)} // puedes redirigir aquí si gustas
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Eye size={18} />
                Ver
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
