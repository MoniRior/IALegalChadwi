import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

export default function UploadDocuments() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert("Selecciona al menos un archivo");
    console.log("Archivos seleccionados:", selectedFiles);
    // Lógica para subir archivos al servidor
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Subir Documentos Adicionales</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center border-2 border-dashed border-blue-400 rounded-lg p-6 text-center">
          <UploadCloud size={40} className="text-blue-500 mb-2" />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="multiFileUpload"
          />
          <label htmlFor="multiFileUpload" className="text-blue-600 hover:underline cursor-pointer">
            {selectedFiles.length > 0
              ? `${selectedFiles.length} archivo(s) seleccionado(s)`
              : "Haz clic para seleccionar archivos"}
          </label>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          Enviar Documentos
        </motion.button>
      </form>
    </motion.div>
  );
}
