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

// Get games collection
get(child(dbRef, "games")).then((snapshot) => {
    if (snapshot.exists()) {
        document.getElementById("game-list").innerHTML = `<h2>Tienda</h2> `

        // Convert data to object
        var gameList = snapshot.val();

        for (const element in gameList) {
            document.getElementById("game-list").innerHTML += `
            <article>
				<img src="./assets/img/videojuegos/diabloiv.jpg" alt="">
				<h4><span>${gameList[element].title}</span><span>${gameList[element].price}€</span></h4>
				<button class="secondary card-buttons"><svg width="16" height="17" viewBox="0 0 16 17" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M4.19984 3.83333H14L12.6667 8.5H4.91781M13.3333 11.1667H5.33333L4 2.5H2M6 13.8333C6 14.2015 5.70152 14.5 5.33333 14.5C4.96514 14.5 4.66667 14.2015 4.66667 13.8333C4.66667 13.4651 4.96514 13.1667 5.33333 13.1667C5.70152 13.1667 6 13.4651 6 13.8333ZM13.3333 13.8333C13.3333 14.2015 13.0349 14.5 12.6667 14.5C12.2985 14.5 12 14.2015 12 13.8333C12 13.4651 12.2985 13.1667 12.6667 13.1667C13.0349 13.1667 13.3333 13.4651 13.3333 13.8333Z"
							stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>añadir al carrito</button>
				<button class="primary">comprar ahora</button>
			</article>
            `
        }

    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
