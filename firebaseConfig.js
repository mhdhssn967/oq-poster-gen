// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNhqRjCm3cx8kGdjmrdwQdlSLjz_FSIhs",
  authDomain: "poster-gen-46dde.firebaseapp.com",
  projectId: "poster-gen-46dde",
  storageBucket: "poster-gen-46dde.firebasestorage.app",
  messagingSenderId: "1046054746396",
  appId: "1:1046054746396:web:81a8d906cf2f2b757022d9",
  measurementId: "G-6JB0MNK1X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);