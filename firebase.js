import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDGhuZOzUKKIWFN3h7h1L0P2LHxVXs4esg",
  authDomain: "clueless-closet-d888c.firebaseapp.com",
  projectId: "clueless-closet-d888c",
  storageBucket: "clueless-closet-d888c.appspot.com",
  messagingSenderId: "260071217422",
  appId: "1:260071217422:web:afcd20adfcc1a2cb7b5f5f",
  measurementId: "G-5VPNG22FDZ"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { auth, firestore }