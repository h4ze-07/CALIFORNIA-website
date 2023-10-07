// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9W-THEIwmvuZGdkYFj1gysihS3h4KnZ0",
  authDomain: "california-website.firebaseapp.com",
  databaseURL: "https://california-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "california-website",
  storageBucket: "california-website.appspot.com",
  messagingSenderId: "185994566882",
  appId: "1:185994566882:web:e2bb52b0e9e4a78abb12bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB_URL = 'https://california-website-default-rtdb.europe-west1.firebasedatabase.app';