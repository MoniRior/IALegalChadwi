import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, FilePlus, Search, LogOut, HelpCircle, Asterisk, StickyNote } from "lucide-react";

const menuItems = [
  { label: "Inicio", icon: <Home size={20} />, path: "/dashboard" },
  { label: "Presentar Demanda", icon: <FilePlus size={20} />, path: "/present-demand" },
  { label: "Demandas Activas", icon: <StickyNote size={20} />, path: "/track-demand" },
  { label: "Subir Documentos", icon: <FilePlus size={20} />, path: "/upload-documents" },
  { label: "Historial", icon: <Search size={20} />, path: "/track-demand" },
  { label: "Cambiar contraseña", icon: <Asterisk size={20} />, path: "/set-password" },
  { label: "Ayuda", icon: <HelpCircle size={20} />, path: "/demand-help" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Botón de hamburguesa fuera del layout principal */}
      {isMobile && (
      <button
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '3rem',
        zIndex: 1100,
      }}
      className="bg-purple-600 text-white p-3 rounded-full shadow-xl hover:bg-purple-700 transition"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
      )}

      {/* Contenedor principal */}
      <div className="flex min-h-screen bg-[#F9F9FF] relative">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || !isMobile) && (
            <motion.aside
              initial={{ x: isMobile ? -300 : 0 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className={`bg-white shadow-xl p-6 flex flex-col justify-between ${
                isMobile ? "fixed top-0 left-0 h-full w-64 z-[1050]" : "w-64"
              }`}
            >
              <div className="sidebar">
                <div className="space-y-6">
                  <h1 className="text-2xl font-extrabold text-purple-600 text-center">LegalApp</h1>
                  <nav className="space-y-2">
                    {menuItems.map(({ label, icon, path }) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-medium ${
                            location.pathname === path
                              ? "bg-purple-100 text-purple-700 shadow-inner"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {icon}
                          <span>{label}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <Link to="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="w-full flex items-center justify-center gap-2 bg-pink-100 text-pink-700 font-semibold py-2 px-4 rounded-xl hover:bg-pink-200 transition"
                    >
                      <LogOut size={18} /> Cerrar sesión
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Contenido principal */}
        <main className="flex-1 p-8 overflow-y-auto ml-0 md:ml-64">{children}</main>
      </div>
    </>
  );
}