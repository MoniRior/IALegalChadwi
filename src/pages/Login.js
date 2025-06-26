// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "../services/firebase";  // tu init de auth

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    await signOut(auth);

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Lanzamos Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      // si no lanza error, el onAuthStateChanged actualizará tu contexto

      navigate("/demandado/demandas");
      //navigate("/dashboard");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales incorrectas.");
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
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Iniciar Sesión
        </h2>

        <div>
          <label className="block text-sm font-medium">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña</label>
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