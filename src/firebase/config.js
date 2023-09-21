import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "683145378767",
  appId: "1:683145378767:web:06c4346b46f1a37cc2b0ba",
  measurementId: "G-D95YNJWJWP",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
const analytics = getAnalytics(app);
