import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Panel de Usuario";
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Bienvenido, Usuario</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            onClick={() => navigate("/login")}
          >
            Cerrar sesión
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Perfil</h2>
            <p className="text-gray-600">Edita tu información personal y preferencias.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Historial</h2>
            <p className="text-gray-600">Revisa tus actividades recientes.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Soporte</h2>
            <p className="text-gray-600">Contáctanos si necesitas ayuda.</p>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}