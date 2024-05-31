// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0fiZcoZrzPLV93Fnc27tDWDLwMj9TvFM",
  authDomain: "gemini-auth-64b83.firebaseapp.com",
  projectId: "gemini-auth-64b83",
  storageBucket: "gemini-auth-64b83.appspot.com",
  messagingSenderId: "733453859794",
  appId: "1:733453859794:web:1ba092b7a1ba2c8090260b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app)
export default app;