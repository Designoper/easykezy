// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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
const db = getDatabase(app);


function sendMail(){
    // Get elements
    var name = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("asunto").value;
    var body = document.getElementById("contenido-mail").value;

    // Create mailID
    var currentDate = new Date();
    var mailId = "mail-" + (email.split("@"))[0] + currentDate.getDay() + currentDate.getHours() + currentDate.getMinutes() + currentDate.getSeconds();  // jaja sry

    // Send data
    set(ref(db, 'mailbox/' + mailId), {
        body: body,
        email: email,
        name : name,
        subject : subject
    })
    .then(() => {
        // Data saved successfully!
        alert("Correo de contacto enviado");
    })
    .catch((error) => {
        console.log(error)
    });
}


button.onclick = () => sendMail();