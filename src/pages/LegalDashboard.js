import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  UserCircle,
  FileText,
  Users,
  LifeBuoy,
  LogOut,
} from "lucide-react";

export default function LegalDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Instancia Legal");

  useEffect(() => {
    document.title = "Panel Legal";
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.name) setUsername(userData.name);
    else navigate("/login-legal");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login-legal");
  };

  const cards = [
    {
      title: "Demandas Recibidas",
      description: "Revisa, gestiona y responde las demandas activas.",
      icon: <FileText className="dashboard-icon" />,
      onClick: () => navigate("/legal/demandas"),
    },
    {
      title: "Registrar Usuario",
      description: "Agrega defensores, jueces u operadores.",
      icon: <Users className="dashboard-icon" />,
      onClick: () => navigate("/register-userlegal"),
    },
    {
      title: "Soporte",
      description: "Solicita asistencia técnica o legal.",
      icon: <LifeBuoy className="dashboard-icon" />,
      onClick: () => navigate("/demand-help"),
    },
    {
      title: "Perfil",
      description: "Actualiza tus datos o configura tu cuenta.",
      icon: <UserCircle className="dashboard-icon" />,
      onClick: () => navigate("/complete-profile"),
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
            Instancia: <span>{username}</span>
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
