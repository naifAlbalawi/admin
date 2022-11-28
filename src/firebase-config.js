// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {firestore, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZiHqFG1Jyi4CXrTjkKgnIA0SBr-AlXmo",
  authDomain: "lost-found-items.firebaseapp.com",
  projectId: "lost-found-items",
  storageBucket: "lost-found-items.appspot.com",
  messagingSenderId: "192667446541",
  appId: "1:192667446541:web:8821d6cdae4158fc10d444"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)