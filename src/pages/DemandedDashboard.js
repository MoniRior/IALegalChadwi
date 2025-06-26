import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UserCircle, History, LifeBuoy, LogOut } from "lucide-react";

export default function LegalDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Usuario");

  useEffect(() => {
    document.title = "Panel de Demandados";
    JSON.parse(localStorage.getItem("user"));

    // Recuperar datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem("user")) || null;

    if (userData && userData.name) {
      setUsername(userData.name);
    } else {
      // Si no hay usuario, redirige al login
      navigate("/login-b");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login-b");
  };

  const cards = [
    {
      title: "Perfil",
      description: "Edita tu información personal y preferencias.",
      icon: <UserCircle className="dashboard-icon" />,
      onClick: () => navigate("/complete-profile"),
    },
    {
      title: "Historial",
      description: "Revisa tus actividades recientes.",
      icon: <History className="dashboard-icon" />,
      onClick: () => navigate("/demandado/demandas"),
    },
    {
      title: "Soporte",
      description: "Contáctanos si necesitas ayuda.",
      icon: <LifeBuoy className="dashboard-icon" />,
      onClick: () => navigate("/demand-help"),
    },
  ];

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>
            Bienvenido, <span>{username}</span>  
          </h1>
          <button
            className="logout-btn"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </header>

        <section className="dashboard-section">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="dashboard-card"
              onClick={card.onClick}
              aria-label={card.title}
            >
              <div className="flex items-center gap-3">
                {card.icon}
                <h2>{card.title}</h2>
              </div>
              <p>{card.description}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </motion.div>
  );
}
