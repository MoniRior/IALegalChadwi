import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../index';

export default function LoginLegal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try{
      const q = query(
        collection(db, "Instancias"),
        where("correo", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if(!querySnapshot.empty){
        const userData = querySnapshot.docs[0].data();
        localStorage.setItem(
          "user",
          JSON.stringify({ name: userData.nombre , email: userData.correo })
        );
        setTimeout(() => navigate("/legal-dashboard"), 100);
      } else {
        setError("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
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
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Iniciar Sesión</h2>

        <div>
          <label className="block text-sm font-medium">Correo Electrónico  </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña  </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-xl"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </div>
      </form>
    </motion.div>
  );
}
