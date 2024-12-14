import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import { db } from "./config";
const collectionName = "Productos";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al subir la imagen");

    const data = await response.json();
    return data.imageUrl; // URL de la imagen devuelta por el backend
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};


// Guardar nuevo producto con URL de imagen
export const saveWebsite = (newLink) =>
  addDoc(collection(db, collectionName), newLink);


export const updateWebsite = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);



export const onGetLinks = (callback) => {
  const q = query(collection(db, collectionName), orderBy("name", "asc"));
  return onSnapshot(q, callback);
};

export const getWebsites = () => getDocs(collection(db, collectionName));

export const deleteWebsite = (id) => deleteDoc(doc(db, collectionName, id));

export const getWebsite = (id) => getDoc(doc(db, collectionName, id));

export const getUsuarios = async () => {
  const querySnapshot = await getDocs(collection(db, "Administradores"));
  const usuarios = [];
  querySnapshot.forEach((doc) => {
    usuarios.push({ id: doc.id, ...doc.data() });
  });
  return usuarios;
};