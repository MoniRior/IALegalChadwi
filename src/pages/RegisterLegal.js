import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase'; 

export default function RegisterLegal() {
  const [form, setForm] = useState({
    institution: "",
    contactName: "",
    password: "",
    correo: "",
    phone: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    competencia: "",
    tipo: "",
    nivel: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Instancia legal registrada:", form);
    // Redirigir o validar
    try{
      await addDoc(collection(db, "Instancias"), form);
      alert("Instancia legal registrada correctamente:");
    }catch(error){
      console.error("Error al registrar la instancia legal:", error);
    }
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

        {[
          { name: "institution", placeholder: "Nombre del tribunal" },
          { name: "contactName", placeholder: "Nombre del responsable" },
          { name: "password", placeholder: "Contraseña", type: "password" },
          { name: "correo", placeholder: "Correo institucional", type: "correo" },
          { name: "phone", placeholder: "Teléfono" },
          { name: "ciudad", placeholder: "Ciudad" },
          { name: "estado", placeholder: "Estado" },
          { name: "codigoPostal", placeholder: "Código Postal" },
          { name: "competencia", placeholder: "Competencia (ej. familiar)" },
          { name: "tipo", placeholder: "Tipo (ej. civil)" },
          { name: "nivel", placeholder: "Nivel (ej. primera instancia)" }
        ].map(({ name, placeholder, type = "text" }) => (

        <input
          key={name}
          type="text"
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
         ))}

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
