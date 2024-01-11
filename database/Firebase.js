// database/firebaseDb.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjgvqf-h1cSOQ543Q45WvnyQ2_10NR6ZU",
  authDomain: "regtest-7daaa.firebaseapp.com",
  projectId: "regtest-7daaa",
  storageBucket: "regtest-7daaa.appspot.com",
  messagingSenderId: "733406973982",
  appId: "1:733406973982:web:6f08257943a86ff4295e0f",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
