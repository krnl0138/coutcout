// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKfkuQnbL4D6h_tL_clwe8_t1bvyhk9C8",
  authDomain: "coutcout-a3079.firebaseapp.com",
  databaseURL:
    "https://coutcout-a3079-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "coutcout-a3079",
  storageBucket: "coutcout-a3079.appspot.com",
  messagingSenderId: "515022436304",
  appId: "1:515022436304:web:c32b10f2956425ba7d6bd5",
};

// Session persitence settings
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
