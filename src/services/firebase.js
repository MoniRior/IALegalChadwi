import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth }         from "firebase/auth"

// configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDkiKJI1Yp3zmV_O-d8uxcvr_1BFUc59Nk",
  authDomain: "chadwi-edbb3.firebaseapp.com",
  projectId: "chadwi-edbb3",
  storageBucket: "chadwi-edbb3.firebasestorage.app",
  messagingSenderId: "77022654979",
  appId: "1:77022654979:web:707cf1c8a4b341f41b5436",
  //measurementId: "G-MY6Y39LMGG"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén la instancia de Firestore
export const db   = getFirestore(app);
export const auth = getAuth(app);