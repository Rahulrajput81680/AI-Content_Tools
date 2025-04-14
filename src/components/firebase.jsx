// // src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD-mBs-X8a1t8_r4gQdhJGys0EDKzPVfQ",
  authDomain: "ai-content-generator-e63eb.firebaseapp.com",
  projectId: "ai-content-generator-e63eb",
  storageBucket: "ai-content-generator-e63eb.firebasestorage.app",
  messagingSenderId: "1062408145951",
  appId: "1:1062408145951:web:7d865a142afee66d5c192a",
  measurementId: "G-58W7G7EYB9",
};

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// export { auth, db };
