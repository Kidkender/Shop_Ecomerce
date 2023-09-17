import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyABQRWBFHtBJi-ABveLX1QRbPnds_aUOlk",

  authDomain: "ecomerce-24be4.firebaseapp.com",

  projectId: "ecomerce-24be4",

  storageBucket: "ecomerce-24be4.appspot.com",

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
