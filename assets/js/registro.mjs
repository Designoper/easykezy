// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const button = document.getElementById("submit");

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
const db = getDatabase(app);

// const analytics = getAnalytics(app);

function registerUser() {
    // Disable button so user cannot spam
    button.setAttribute("disabled","");

    // Get inputs
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confPassword = document.getElementById("conf-password").value;

    if (password == confPassword) {
        // Register
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 

            // Add registered user to realtime database for App
            var userId = email.split("@");
            set(ref(db, 'users/' + userId[0]), {
                admin: false,
                email: email,
            })

            setTimeout(function(){window.location.href="index.html";}, 1000);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        
            console.log(errorMessage + " Error code: " + errorCode);
        });
    }
    else {
        alert("Password doesn't match")
    }
    
}

button.onclick = () => registerUser();