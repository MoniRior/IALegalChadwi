import React, { useState } from "react";
import { motion }          from "framer-motion";
import { useNavigate }     from "react-router-dom";
import { auth, db } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp }      from 'firebase/firestore';

export default function RegisterUser() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    tipo: "demandante", 
    password: "",
    calle: "",
    codigoPostal: "",
    ciudad: "",
    genero: "",
    nacimiento: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
      if (!formData.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) newErrors.correo = "Correo inválido";
      if (!formData.telefono || !/^[0-9]{10}$/.test(formData.telefono)) newErrors.telefono = "Teléfono inválido";
    } else if (step === 2) {
      if (formData.password.length < 8) newErrors.password = "Debe tener al menos 8 caracteres.";
      else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Debe contener al menos una mayúscula.";
      else if (!/[0-9]/.test(formData.password)) newErrors.password = "Debe contener al menos un número.";
      if (formData.password !== confirmPassword) newErrors.confirm = "Las contraseñas no coinciden.";
    } else if (step === 3) {
      if (!formData.calle) newErrors.calle = "Calle requerida.";
      if (!formData.codigoPostal) newErrors.codigoPostal = "CP requerido.";
      if (!formData.ciudad) newErrors.ciudad = "Ciudad requerida.";
      if (!formData.genero) newErrors.genero = "Género requerido.";
      if (!formData.nacimiento) newErrors.nacimiento = "Fecha de nacimiento requerida.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateStep();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
    } else {
      setErrors({});
      if (step < 3) {
        setStep(step + 1);
      } else {
        try {
          // 1) Crear cuenta en Firebase Auth
          const userCred = await createUserWithEmailAndPassword(
            auth,
            formData.correo,
            formData.password
          );
          const { uid } = userCred.user;

          // 2) Guardar datos en Firestore bajo Usuarios/{uid}, incluyendo roles
          await setDoc(doc(db, "Usuarios", uid), {
            nombre:       formData.nombre,
            correo:       formData.correo,
            telefono:     formData.telefono,
            direccion: {
              calle:        formData.calle,
              codigoPostal: formData.codigoPostal,
              ciudad:       formData.ciudad
            },
            genero:       formData.genero,
            nacimiento:   formData.nacimiento,
            roles: {
              demandante:     formData.tipo === "demandante",
              demandado:      formData.tipo === "demandado",
              instanciaLegal: formData.tipo === "instanciaLegal"
            },
            createdAt:    serverTimestamp()
          });
          
          // 3) Redirigir
          navigate("/dashboard");
        } catch (error) {
          console.error("Error al registrar el usuario:", error);
        }
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-600">Registro de Demandante</h2>
            <div>
              <label className="block text-sm font-medium">Nombre completo</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl" />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Correo electrónico</label>
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl" />
              {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Teléfono</label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl" />
              {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-600">Crear Contraseña</h2>
            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Confirmar Contraseña</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-xl" />
              {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm}</p>}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-600">Completa tu Perfil</h2>
            <div>
              <label className="block text-sm font-medium">Calle</label>
              <input type="text" name="calle" value={formData.calle} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl" />
              {errors.calle && <p className="text-red-500 text-sm">{errors.calle}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Codigo Postal</label>
                <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl" />
                {errors.codigoPostal && <p className="text-red-500 text-sm">{errors.codigoPostal}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Ciudad</label>
                <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl" />
                {errors.ciudad && <p className="text-red-500 text-sm">{errors.ciudad}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Género</label>
                <select name="genero" value={formData.genero} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl">
                  <option value="">Selecciona</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.genero && <p className="text-red-500 text-sm">{errors.genero}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Nacimiento</label>
                <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} className="mt-1 p-2 w-full border rounded-xl" />
                {errors.nacimiento && <p className="text-red-500 text-sm">{errors.nacimiento}</p>}
              </div>
            </div>
          </>
        );
      default:
        return null;
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
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6"
      >
        {renderStep()}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            {step < 3 ? "Continuar" : "Finalizar Registro"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}