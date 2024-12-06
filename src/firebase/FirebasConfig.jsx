import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDrPGo157EHKMO9Qh50zSgbwVe8LPhAUtg",
    authDomain: "myecommerce-d5f00.firebaseapp.com",
    projectId: "myecommerce-d5f00",
    storageBucket: "myecommerce-d5f00.firebasestorage.app",
    messagingSenderId: "1074745327377",
    appId: "1:1074745327377:web:2e36603a4e0670165a16b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)
const auth = getAuth(app)
export { fireDB, auth }