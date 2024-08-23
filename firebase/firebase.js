// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyArAJDhHeB_Fwg-p6SMIl8zA7Mn3D1BNN0",
  authDomain: "chat-karo-5a521.firebaseapp.com",
  projectId: "chat-karo-5a521",
  storageBucket: "chat-karo-5a521.appspot.com",
  messagingSenderId: "795312260629",
  appId: "1:795312260629:web:cff737cc9e5b305a61b01c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);