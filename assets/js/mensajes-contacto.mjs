// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const dbRef = ref(getDatabase(app));

// Get mailbox collection
get(child(dbRef, "mailbox")).then((snapshot) => {
    if (snapshot.exists()) {
        document.getElementById("buzon").innerHTML = `<h2>Formularios recibidos</h2> `

        // Convert data to object
        var mailList = snapshot.val();

        for (const element in mailList) {
            document.getElementById("buzon").innerHTML += `
            <article>

				<ul>
					<li>Nombre: ${mailList[element].name}</li>
					<li>Correo: ${mailList[element].email}</li>
					<li>Asunto: ${mailList[element].subject}</li>
					<li>${mailList[element].body}</li>
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
