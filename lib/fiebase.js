// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR_E9lXe3C1zVEpMGT3ML4Tz-jL-uDrek",
  authDomain: "todoapp-b7643.firebaseapp.com",
  projectId: "todoapp-b7643",
  storageBucket: "todoapp-b7643.appspot.com",
  messagingSenderId: "375780846928",
  appId: "1:375780846928:web:b634c5b5f12c331c1cd055",
  measurementId: "G-8TNQJK83TH",
};
// Initialize Firebase
initializeApp(firebaseConfig);

// initializing services
export const db = getFirestore();

// collection reference
export const colRef = collection(db, "books");

// get collection database
// fetching single doc
// const d = doc(db, "books", "DOCUMENT ID");
// const document = getDoc(d);
// console.log(doc.data(), doc.id);
