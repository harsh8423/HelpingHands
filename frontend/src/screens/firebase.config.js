// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

import firebase from 'firebase/app'
import 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPS4Kl8jCcLduf8Z5NcvRxLmISQuoJA68",
  authDomain: "helpinghands-395514.firebaseapp.com",
  projectId: "helpinghands-395514",
  storageBucket: "helpinghands-395514.appspot.com",
  messagingSenderId: "711764144687",
  appId: "1:711764144687:web:b32eef8228c60ff8a38cda",
  measurementId: "G-X7Q1MKWDG6"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export default firebase

// export const auth = getAuth(app);