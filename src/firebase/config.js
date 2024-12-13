import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBWpX9BLfT0uilS2MB93-RMhTBds8TZBKA",
  authDomain: "fb-crud-react-a7eb7.firebaseapp.com",
  projectId: "fb-crud-react-a7eb7",
  storageBucket: "fb-crud-react-a7eb7.firebasestorage.app",
  messagingSenderId: "693758047979",
  appId: "1:693758047979:web:31a15639f007f00adef0ae",
  measurementId: "G-HC7Z0TNDS7",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();