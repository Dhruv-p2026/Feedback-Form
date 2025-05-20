import {getDatabase} from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIIZcAnCAY-EoSN_TE6EQzvvTREj5v_jE",
  authDomain: "feedback---20-04-2006.firebaseapp.com",
  databaseURL: "https://feedback---20-04-2006-default-rtdb.firebaseio.com",
  projectId: "feedback---20-04-2006",
  storageBucket: "feedback---20-04-2006.firebasestorage.app",
  messagingSenderId: "364354512201",
  appId: "1:364354512201:web:db7537e91a0bf210ab6698"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);





let db = getDatabase(app);
export default db;