// src/pages/LoginB.js
import React, { useState } from "react";
import { useNavigate }      from "react-router-dom";
import { motion }           from "framer-motion";

import { signInWithEmailAndPassword} from "firebase/auth";
import { auth, db }           from "../services/firebase";
import { doc, getDoc }        from "firebase/firestore";

export default function LoginB() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      // 1) Cerrar sesión previa
      //await signOut(auth);

      // 2) Iniciar sesión con Firebase Auth
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid  = cred.user.uid;

      // 3) Verificar campo `tipo` en Firestore
      const userSnap = await getDoc(doc(db, "Usuarios", uid));
      const userData = userSnap.data()  

      if (
          !userSnap.exists() || 
          (userData.tipo !== "demandado" && userData.tipo !== "demandante")
        ) {
            throw new Error("No tienes permisos de demandado.");
          }

      // 4) Redirigir al dashboard de demandados
      //navigate("/de-dashboard");
      navigate("/demandado/demandas");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.message === "Firebase: Error (auth/user-not-found)." ||
        err.message === "Firebase: Error (auth/wrong-password)." 
          ? "Credenciales inválidas." 
          : err.message
      );
    } finally {
      setLoading(false);
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
          Iniciar Sesión (Demandado)
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
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition ${loading ? "opacity-50" : ""}`}
          >
            {loading ? "Validando…" : "Ingresar"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
