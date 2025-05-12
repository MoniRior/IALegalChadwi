import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    tipo: "demandante"
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!formData.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) newErrors.correo = "Correo inválido";
    if (!formData.telefono || !/^[0-9]{10}$/.test(formData.telefono)) newErrors.telefono = "Teléfono inválido";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
    } else {
      setErrors({});
      navigate("/set-password");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Registro de Demandante</h2>

        <div>
          <label className="block text-sm font-medium">Nombre completo  </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-xl"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Correo electrónico  </label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-xl"
          />
          {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Teléfono  </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-xl"
          />
          {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            onClick={() =>navigate("/complete-profile")}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            Continuar
          </button>
        </div>
      </form>
    </motion.div>
  );
}
