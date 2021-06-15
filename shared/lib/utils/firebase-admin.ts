import admin from "firebase-admin";

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: "beranabyte-1fb86",
      private_key: privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    } as admin.ServiceAccount),
    databaseURL: "https://beranabyte-1fb86.firebaseio.com",
  });
}

export const FirebaseAdminAuth = admin.auth();
export const FirestoreAdminDb = admin.firestore();
export const ServerTimestamp = admin.firestore.FieldValue.serverTimestamp();
export const UsersCollection = FirestoreAdminDb.collection("users");
export const BlogMetaCollection = FirestoreAdminDb.collection("blogs-meta");
