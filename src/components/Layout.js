import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, FilePlus, Search, LogOut, HelpCircle, Asterisk, StickyNote } from "lucide-react";

const menuItems = [
  { label: "Inicio", icon: <Home size={20} />, path: "/dashboard", className: "sidebar-item" },
  { label: "Presentar Demanda", icon: <FilePlus size={20} />, path: "/present-demand", className: "sidebar-item" },
  { label: "Demandas Activas", icon: <StickyNote size={20} />, path: "/view-demand", className: "sidebar-item" },
  { label: "Subir Documentos", icon: <FilePlus size={20} />, path: "/upload-documents", className: "sidebar-item" },
  { label: "Historial", icon: <Search size={20} />, path: "/track-demand", className: "sidebar-item" },
  { label: "Cambiar contraseña", icon: <Asterisk size={20} />, path: "/set-password", className: "sidebar-item" },
  { label: "Ayuda", icon: <HelpCircle size={20} />, path: "/demand-help", className: "sidebar-item" },
]
export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#F9F9FF]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between">
      <div className="sidebar">
        <div className="space-y-6">
          <h1 className="text-2xl font-extrabold text-purple-600 text-center">LegalApp</h1>
          <nav className="space-y-2">
            {menuItems.map(({ label, icon, path }) => (
              <Link key={path} to={path}>
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div> 
  );
}
