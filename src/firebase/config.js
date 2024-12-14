import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBH4jXPZ03yBcoPuvgY57zlf9Sm3tLXFGk",
  authDomain: "prueba-img-9ccd7.firebaseapp.com",
  projectId: "prueba-img-9ccd7",
  storageBucket: "prueba-img-9ccd7.firebasestorage.app",
  messagingSenderId: "691707910104",
  appId: "1:691707910104:web:aee20f840ade9887eec4ad",
  measurementId: "G-HSDS23816V"
};

const app =initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);