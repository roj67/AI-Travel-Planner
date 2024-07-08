// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQAubmGHvprXtMKyAXdFb4pIwz5Lq43Vk",
  authDomain: "react-native-projects-1511b.firebaseapp.com",
  projectId: "react-native-projects-1511b",
  storageBucket: "react-native-projects-1511b.appspot.com",
  messagingSenderId: "958279719236",
  appId: "1:958279719236:web:f122c94bad24f551f55f11",
  measurementId: "G-PQGFFS00BF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);