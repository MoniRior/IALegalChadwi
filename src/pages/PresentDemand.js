import { useState } from "react";
import { motion } from "framer-motion";

export default function PresentDemand() {
  const [form, setForm] = useState({
    demandType: "",
    description: "",
    urgency: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Demanda presentada:", form);
    // Aquí iría lógica de envío o redirección
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Presentar Demanda</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-gray-700">Tipo de demanda</label>
          <select
            name="demandType"
            value={form.demandType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="laboral">Laboral</option>
            <option value="familiar">Familiar</option>
            <option value="penal">Penal</option>
            <option value="civil">Civil</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Describa su situación brevemente..."
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Urgencia</label>
          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          >
            <option value="">Seleccione el nivel</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700"
        >
          Continuar
        </motion.button>
      </form>
    </motion.div>
  );
}
