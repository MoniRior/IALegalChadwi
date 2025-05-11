import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

export default function UploadDemand() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Por favor seleccione un archivo");
    console.log("Archivo enviado:", file.name);
    // Aquí se puede manejar la carga al servidor
  };

  return (
    <motion.div
      className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Subir Demanda</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer">
          <Upload size={32} className="text-blue-500 mb-2" />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="uploadInput"
          />
          <label htmlFor="uploadInput" className="text-blue-600 hover:underline">
            {file ? file.name : "Haz clic para seleccionar el archivo"}
          </label>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          Subir Archivo
        </motion.button>
      </form>
    </motion.div>
  );
}
