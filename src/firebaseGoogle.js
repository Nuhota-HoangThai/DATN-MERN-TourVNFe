// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeFGfU94R-LcUocFXbsMhmjh_wE0u5M2M",
  authDomain: "mern-vivu3mien.firebaseapp.com",
  projectId: "mern-vivu3mien",
  storageBucket: "mern-vivu3mien.appspot.com",
  messagingSenderId: "1004647220673",
  appId: "1:1004647220673:web:b47016a68dad16218cdb40",
  measurementId: "G-1EPNF2DY06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
