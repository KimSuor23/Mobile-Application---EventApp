import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2kghLU1qo5JzXrXtL9LVN_voRkq3X2C8",
  authDomain: "user-kim-app.firebaseapp.com",
  projectId: "user-kim-app",
  storageBucket: "user-kim-app.appspot.com",
  messagingSenderId: "1027567043487",
  appId: "1:1027567043487:web:081436231cbedd06a4b3aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
};
