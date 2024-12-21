// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcj6OH2GSWzgbj0qlTw8khpMxr_wBGXeA",
  authDomain: "vox-debate.firebaseapp.com",
  projectId: "vox-debate",
  storageBucket: "vox-debate.firebasestorage.app",
  messagingSenderId: "61426780942",
  appId: "1:61426780942:web:cb093733224a12ce4f655f",
  measurementId: "G-25WRTSS1S0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
