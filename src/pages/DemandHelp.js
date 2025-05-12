import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Bot } from "lucide-react";

const faq = [
  {
    question: "¿Cómo presento una demanda?",
    answer:
      "Debes llenar el formulario en la sección 'Presentar Demanda' y adjuntar los documentos requeridos.",
  },
  {
    question: "¿Dónde puedo hacer seguimiento a mi demanda?",
    answer:
      "En el panel principal, selecciona 'Seguimiento de Demanda' para ver el estado actual.",
  },
  {
    question: "¿A quién puedo contactar si tengo dudas?",
    answer:
      "Puedes escribirnos al correo soporte@justiciaapp.com o usar el formulario de contacto.",
  },
];

export default function DemandHelp() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="help-container max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="help-header">
        <HelpCircle className="text-indigo-600" size={32} />
        <h2>Centro de Ayuda</h2>
      </div>

      <div className="faq-container">
        {faq.map((item, index) => (
          <div
            key={index}
            className="faq-card"
            onClick={() => toggle(index)}
            role="button"
            tabIndex={0}
          >
            <div className="faq-question">
              {item.question}
              {openIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="faq-answer expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          className="ai-chat-button"
          onClick={() => alert("Abriendo chat con la IA...")} // reemplaza con navegación real si existe
        >
          <Bot className="w-5 h-5" />
          Conversar con la IA
        </button>
      </div>
    </motion.div>
  );
}
