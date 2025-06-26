import { useState } from "react";
import { motion } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../services/firebase';          
import { useAuth } from "../contexts/AuthContext";     

export default function PresentDemand() {
  const { currentUser, authLoading } = useAuth();
  console.log("currentUser en PresentDemand:", currentUser);
  const [form, setForm] = useState({
    demandType: "",
    description: "",
    urgency: "",
    demandadoUid: ""     
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authLoading) return;
    if (!currentUser) {
      setError("Debes iniciar sesión para presentar una demanda");
      return;
    }
    if (!form.demandadoUid) {
      setError("Es necesario indicar el UID del demandado");
      return;
    }
    
    setLoading(true);
    try {
      // Construye las “rutas” que se guardan en Firestore
      const demandantePath = `/Usuarios/${currentUser.uid}`;
      const demandadoPath  = `/Usuarios/${form.demandadoUid}`;

      await addDoc(collection(db, "Demandas"), {
        demandante:  demandantePath,
        demandado:   demandadoPath,
        descripcion: form.description,
        estatus:     "En revisión",
        fecha:       serverTimestamp(),
        tipo:        form.demandType,
        urgencia:    form.urgency
      });

      setSuccess("¡Demanda presentada correctamente!");
      setForm({
        demandType: "",
        description: "",
        urgency: "",
        demandadoUid: ""
      });
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al subir la demanda");
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
        Presentar Demanda
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-gray-700">Demandado (UID)</label>
          <input
            name="demandadoUid"
            value={form.demandadoUid}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Ingresa el UID del usuario demandado"
            required
          />
        </div>

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
          disabled={loading}
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Enviando…" : "Continuar"}
        </motion.button>
      </form>
    </motion.div>
  );
}
