// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFAGxoLahfnOM-xJA1LnMLfnaJc4lMG3U",
    authDomain: "waste-management-system-6a82b.firebaseapp.com",
    projectId: "waste-management-system-6a82b",
    storageBucket: "waste-management-system-6a82b.appspot.com",
    messagingSenderId: "972896628852",
    appId: "1:972896628852:web:bc0beb6464c4fdf4f2e121"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);