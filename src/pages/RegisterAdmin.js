import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterAdmin() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin registrado:", form);
    // Redirigir o validar
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">Registro Administrador</h2>

        <input
          type="text"
          name="firstName"
          placeholder="Nombre(s)"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Apellidos"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Número de teléfono"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Siguiente
        </button>
      </form>
    </motion.div>
  );
}
