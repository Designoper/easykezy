// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBrLIXRuHjdUNj6Etk61qNi_L-KhzOBegk",

    authDomain: "easykezy.firebaseapp.com",

    databaseURL: "https://easykezy-default-rtdb.firebaseio.com",

    projectId: "easykezy",

    storageBucket: "easykezy.appspot.com",

    messagingSenderId: "1015448108936",

    appId: "1:1015448108936:web:8b9d9c3eaa265a0826843d",

    measurementId: "G-T23MDXNZ2S"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href="index.html";

}).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorMessage + " Error Code: " + errorCode);
});