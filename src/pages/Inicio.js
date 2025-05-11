import React from 'react';
import { useNavigate } from "react-router-dom";
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();
  return (
    <div className="pagina">
      <header className="logo">
        <img src="Img/ialogo.png" alt="Logo" className="logo-img" />
        Bienvenido
      </header>

      <div className="card">
        <p className="para">Para</p>
        <h2 className="rol demandado">Demandados</h2>
        <div className="btn-grupo uno">
          <button className="btn" onClick={() => navigate("/login")}>Log In</button>
        </div>
      </div>

      <div className="card">
        <p className="para">Para</p>
        <h2 className="rol demandante">Demandantes</h2>
        <div className="btn-grupo doble">
          <button className="btn" onClick={() => navigate("/login")}>Log In</button>
          <button className="btn" onClick={() => navigate("/register-user")}>Sign Up</button>
        </div>
      </div>

      <div className="card">
        <p className="para">Para</p>
        <h2 className="rol instancia">Instancias Legales</h2>
        <div className="btn-grupo doble">
          <button className="btn" onClick={() => navigate("/login")}>Log In</button>
          <button className="btn" onClick={() => navigate("/register-legal")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
