import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    direccion: "",
    estado: "",
    ciudad: "",
    genero: "",
    nacimiento: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.direccion) newErrors.direccion = "Dirección requerida.";
    if (!formData.estado) newErrors.estado = "Estado requerido.";
    if (!formData.ciudad) newErrors.ciudad = "Ciudad requerida.";
    if (!formData.genero) newErrors.genero = "Género requerido.";
    if (!formData.nacimiento) newErrors.nacimiento = "Fecha de nacimiento requerida.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
    } else {
      setErrors({});
      navigate("/dashboard");
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
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Completa tu Perfil</h2>

        <div>
          <label className="block text-sm font-medium">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-xl"
          />
          {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-xl"
            />
            {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-xl"
            />
            {errors.ciudad && <p className="text-red-500 text-sm">{errors.ciudad}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Género</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-xl"
            >
              <option value="">Selecciona</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            {errors.genero && <p className="text-red-500 text-sm">{errors.genero}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Nacimiento</label>
            <input
              type="date"
              name="nacimiento"
              value={formData.nacimiento}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-xl"
            />
            {errors.nacimiento && <p className="text-red-500 text-sm">{errors.nacimiento}</p>}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            Finalizar Registro
          </button>
        </div>
      </form>
    </motion.div>
  );
}
