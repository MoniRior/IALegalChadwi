// src/pages/RegisterUserLegal.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

export default function LegalUserRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    document.title = "Registrar Usuario Legal";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, role, password } = formData;

    if (!name || !email || !role || !password) {
      setStatusMessage("Todos los campos son obligatorios.");
      return;
    }

    // Aquí iría la lógica real de registro (POST a tu backend)
    console.log("Registrando usuario:", formData);

    setStatusMessage(`Usuario "${name}" registrado como ${role}.`);
    setFormData({ name: "", email: "", role: "", password: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registrar Nuevo Usuario Legal</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl"
      >
        <div>
          <label className="block font-semibold mb-1">Nombre Completo</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@dominio.com"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Rol del Usuario</label>
          <select
            name="role"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">-- Selecciona un rol --</option>
            <option value="juez">Juez</option>
            <option value="abogado_defensor">Abogado Defensor</option>
            <option value="auxiliar">Auxiliar Administrativo</option>
            <option value="legal_supervisor">Supervisor Legal</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Contraseña Temporal</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
            placeholder="******"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <UserPlus size={18} />
          Registrar Usuario
        </motion.button>

        {statusMessage && (
          <p className="text-sm text-green-600 mt-2">{statusMessage}</p>
        )}
      </form>
    </div>
  );
}
