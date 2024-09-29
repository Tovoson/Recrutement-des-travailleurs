import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "recrutementtravail-c1a30.firebaseapp.com",
  projectId: "recrutementtravail-c1a30",
  storageBucket: "recrutementtravail-c1a30.appspot.com",
  messagingSenderId: "822893917953",
  appId: "1:822893917953:web:6927ba7de5a939fc784d00",
  measurementId: "G-G9JHRTEVFG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);