import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faq = [
  {
    question: "¿Cómo presento una demanda?",
    answer: "Debes llenar el formulario en la sección 'Presentar Demanda' y adjuntar los documentos requeridos."
  },
  {
    question: "¿Dónde puedo hacer seguimiento a mi demanda?",
    answer: "En el panel principal, selecciona 'Seguimiento de Demanda' para ver el estado actual."
  },
  {
    question: "¿A quién puedo contactar si tengo dudas?",
    answer: "Puedes escribirnos al correo soporte@justiciaapp.com o usar el formulario de contacto."
  }
];

export default function DemandHelp() {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center mb-6">
        <HelpCircle className="text-indigo-600 mr-2" size={32} />
        <h2 className="text-2xl font-bold text-indigo-700">Centro de Ayuda</h2>
      </div>

      <div className="space-y-6">
        {faq.map((item, index) => (
          <motion.div
            key={index}
            className="bg-indigo-50 p-4 rounded-lg shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-indigo-800 font-semibold">{item.question}</h3>
            <p className="text-gray-700 mt-1">{item.answer}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
