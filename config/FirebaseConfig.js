import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "screw-sync.firebaseapp.com",
    projectId: "screw-sync",
    storageBucket: "screw-sync.appspot.com",
    messagingSenderId: "960017478557",
    appId: "1:960017478557:web:f0dec63738007827c03574",
    measurementId: "G-TXY9EFKFSF"
};



const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export { db }
export { storage };