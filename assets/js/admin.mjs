// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


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
const dbRef = ref(getDatabase(app));

// Get mailbox collection
if (sessionStorage.getItem("userIsAdmin") == "true"){
    get(child(dbRef, "mailbox")).then((snapshot) => {
        if (snapshot.exists()) {
            // document.getElementById("buzon").innerHTML = `<h2>Formularios recibidos</h2> `
    
            // Convert data to object
            var mailList = snapshot.val();
    
            for (const element in mailList) {
                document.getElementById("buzon").innerHTML += `
                <article>
    
                    <ul>
                        <li><span>Nombre:</span> ${mailList[element].name}</li>
                        <li><span>Correo:</span> ${mailList[element].email}</li>
                        <li class="message"><h3>${mailList[element].subject}</h3>
                        ${mailList[element].body}</li>
                    </ul>
    
                </article>
                `
            }
    
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
else {
    // If not admin then redirect to home page
    document.getElementById("buzon").innerHTML += `
                <p>Acceso denegado</p>
                `;
    
    window.location.href="index.html";
}