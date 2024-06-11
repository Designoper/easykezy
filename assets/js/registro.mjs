// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const button = document.getElementById("submit");
const span = document.getElementById("passwordCheck");
const password = document.getElementById("password");
const password2 = document.getElementById("conf-password");


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
const db = getDatabase(app);

function registerUser() {
    // Disable button so user cannot spam
    button.setAttribute("disabled", "");

    // Get inputs
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confPassword = document.getElementById("conf-password").value;

    if (password == confPassword) {
        // Register
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in

                // Create user ID
                var tempUser = email.split("@");
                var userId = "";

                // Get rid of "."
                if (tempUser[0].includes(".")) {
                    var str = tempUser[0].split(".");

                    str.forEach(element => {
                        userId += element;
                    });
                }
                else {
                    userId = tempUser[0];
                }

                // Add registered user to realtime database for App
                set(ref(db, 'users/' + userId), {
                    admin: false,
                    email: email,
                })

                // Redirect after 1 sec
                setTimeout(function () { window.location.href = "index.html"; }, 1000);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage + " Error code: " + errorCode);

            });
    }

}

button.onclick = () => registerUser();

function passwordMatch() {
    if (password.value === password2.value) {
        span.innerHTML = "";
    }
    else {
        span.innerHTML = "La contraseña no coincide";
    }
}

password.oninput = () => passwordMatch();
password2.oninput = () => passwordMatch();