// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASITLfk2CaC2wviW-yi2DJJzW8yC6rLo0",
  authDomain: "test-react-app-7458f.firebaseapp.com",
  projectId: "test-react-app-7458f",
  storageBucket: "test-react-app-7458f.firebasestorage.app",
  messagingSenderId: "317892009731",
  appId: "1:317892009731:web:f40105132a9ab12e229336",
  measurementId: "G-M7MCCTH13B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);