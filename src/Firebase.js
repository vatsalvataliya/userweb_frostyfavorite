// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2GFTmLIgR_ApV2trSltyBRMk7k2zy5kg",
  authDomain: "react-ce731.firebaseapp.com",
  databaseURL: "https://react-ce731-default-rtdb.firebaseio.com",
  projectId: "react-ce731",
  storageBucket: "react-ce731.appspot.com",
  messagingSenderId: "1075034608890",
  appId: "1:1075034608890:web:6be482ba4240db266d6543",
  measurementId: "G-PCHJK136BM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);
export default db
