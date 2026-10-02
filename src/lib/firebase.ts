import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Auth is loaded lazily: only the admin panel needs it, so public visitors never
// download the Auth SDK (or its hidden iframe).
let _auth: Auth | null = null;
export const getAppAuth = async (): Promise<Auth> => {
  if (_auth) return _auth;
  const { getAuth } = await import("firebase/auth");
  _auth = getAuth(app);
  return _auth;
};

// Storage is initialised lazily so a missing bucket doesn't break the app
let _storage: ReturnType<typeof import("firebase/storage").getStorage> | null = null;
export const getAppStorage = async () => {
  if (_storage) return _storage;
  const { getStorage } = await import("firebase/storage");
  _storage = getStorage(app);
  return _storage;
};

export { db };
