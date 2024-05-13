import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZAFQbkZ_uQdkPNKaM2XP8nOdWkltNAag",
  authDomain: "prestige-86c78.firebaseapp.com",
  projectId: "prestige-86c78",
  storageBucket: "prestige-86c78.appspot.com",
  messagingSenderId: "716481345878",
  appId: "1:716481345878:web:08277ce749df42dd94fef7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);