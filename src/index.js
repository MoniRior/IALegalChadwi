// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app);
// **Export db so it can be imported in other files**
export { db };
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
