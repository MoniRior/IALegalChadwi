import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterLegal() {
  const [form, setForm] = useState({
    institution: "",
    contactName: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Instancia legal registrada:", form);
    // Redirigir o validar
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-purple-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">Registro Instancia Legal</h2>

        <input
          type="text"
          name="institution"
          placeholder="Nombre de la institución"
          value={form.institution}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          type="text"
          name="contactName"
          placeholder="Nombre del responsable"
          value={form.contactName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo institucional"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Teléfono institucional"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
        >
          Siguiente
        </button>
      </form>
    </motion.div>
  );
}
