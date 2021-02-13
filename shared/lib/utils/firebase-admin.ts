import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "beranabyte-1fb86",
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: "https://beranabyte-1fb86.firebaseio.com",
  });
}

export const firebaseAdminAuth = admin.auth();
export const firestoreAdminDb = admin.firestore();
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp();
