import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://beranabyte-1fb86.firebaseio.com",
  });
}

export const FirebaseAdminAuth = admin.auth();
export const FirestoreAdminDb = admin.firestore();
export const ServerTimestamp = admin.firestore.FieldValue.serverTimestamp();
export const UsersCollection = FirestoreAdminDb.collection("users");
export const BlogMetaCollection = FirestoreAdminDb.collection("blogs-meta");
