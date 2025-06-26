import admin from "firebase-admin";
import { readFileSync } from "fs";
// si Node no soporta import, usa require:
// const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

async function migrar() {
  const list = await auth.listUsers();
  for (const user of list.users) {
    // Ajusta esto para obtener el nombre de Firestore si lo necesitas:
    // aquí sólo uso el UID como ejemplo
    const nombre = `Usuario ${user.uid.slice(-4)}`;
    await auth.updateUser(user.uid, { displayName: nombre });
    console.log(`UID ${user.uid} → displayName: ${nombre}`);
  }
  console.log("Migración completada.");
}

migrar().catch(console.error);
