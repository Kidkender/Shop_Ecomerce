import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,

  authDomain: import.meta.env.VITE_REACT_FIREBASE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_REACT_FIREBASE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_REACT_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: "164127673506",

  appId: "1:164127673506:web:088eee9def0fce55eedbfb",

  measurementId: "G-HDZ9TKV7ZE",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
const analytics = getAnalytics(app);
