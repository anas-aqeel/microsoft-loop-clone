import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


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
const db = getFirestore(app);
export { db }