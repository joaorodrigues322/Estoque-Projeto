// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";

import "firebase/compat/firestore";

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDQ8v_uQoTbGb2AGMOi-g_xyDOdSm0gZ6I",
  authDomain: "meu-estoque-melhor-606fe.firebaseapp.com",
  projectId: "meu-estoque-melhor-606fe",
  storageBucket: "meu-estoque-melhor-606fe.appspot.com",
  messagingSenderId: "610562951264",
  appId: "1:610562951264:web:66caa4a9bbc509c4d29b05"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore };
