// src/firebaseAdmin.js
import admin from "firebase-admin";
import { readFileSync } from "fs";
import serviceAccount from "../firebase-service-account.json" assert { type: "json" };

// If you have a service account key JSON (recommended for real projects),
// you would load it here. For now, use application default credentials.

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
// }
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { db };
