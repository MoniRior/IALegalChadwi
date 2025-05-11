import { motion } from "framer-motion";

const sampleStatuses = [
  { date: "2025-05-01", status: "Recibida por la instancia legal" },
  { date: "2025-05-03", status: "Asignada a un abogado" },
  { date: "2025-05-05", status: "En revisión" }
];

export default function TrackDemand() {
  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Seguimiento de Demanda</h2>
      <div className="space-y-4">
        {sampleStatuses.map((item, index) => (
          <motion.div
            key={index}
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
    </motion.div>
  );
}
