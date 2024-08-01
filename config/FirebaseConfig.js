// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "screw-sync.firebaseapp.com",
    projectId: "screw-sync",
    storageBucket: "screw-sync.appspot.com",
    messagingSenderId: "960017478557",
    appId: "1:960017478557:web:f0dec63738007827c03574",
    measurementId: "G-TXY9EFKFSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);