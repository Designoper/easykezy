// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const dbRef = ref(getDatabase(app));

// Get navbar
var navbar = document.getElementById("nav");

onAuthStateChanged(auth, (user) => {
    if (user) {
      	// USER IS SIGNED IN
      	// Se puede coger datos de "user". Ejemplo: "user.email" devuelve un string con el mail

		// Save if user is signed in sessionStorage
		sessionStorage.setItem("userIsSigned", "true");

		// Check if cart has items
		var totalItems = 0;
		if (sessionStorage.getItem("cartList") != null){
			var itemsList = sessionStorage.getItem("cartList").split(",");

			totalItems = itemsList.length;
		}

		// Check if user is admin
		var userID = user.email.split("@")[0];

		// Get rid of "."
		if (userID.includes(".")) {
			var str = userID.split(".");
			userID = "";

			str.forEach(element => {
				userID += element;
			});
		}
		
		// Check from DB if admin
		get(child(dbRef, "users/" + userID)).then((snapshot) => {
			if (snapshot.exists()) {
				var DBUser = snapshot.val()
				
				// Print header according if user is admin or not
				if (DBUser.admin == true){
					printSignedAdmin(totalItems);
				}
				else {
					printSignedNoAdmin(totalItems);
				}

			} else {
				console.log("No data available");

				printSignedNoAdmin(totalItems);
			}
		}).catch((error) => {
			console.error(error);
		});


	} else {
		// USER IS SIGNED OUT

		// Save if user is signed in sessionStorage
		sessionStorage.setItem("userIsSigned", "false");

		printNotSigned();
	}
});

// HEADER WITH NO SIGN IN
function printNotSigned(){
	navbar.innerHTML = `
        	<button type="button" popovertarget="nav" popovertargetaction="hide" aria-label="Cerrar menú de navegación">
				<svg viewBox="0 0 556 556">
					<path d="m24.336 24.336 506.648 506.648M530.984 24.336 24.336 530.984" />
				</svg>
			</button>

			<ul>
				<li><a href="./">Inicio</a></li>
				<li><a href="./quienes-somos.html">Quiénes somos</a></li>
				<li><a href="./nuestro-proyecto.html">Nuestro proyecto</a></li>
				<li><a href="./tienda.html">Tienda</a></li>
				<li><a href="./descargar-app.html">App</a></li>
				<li><a href="./buzon-contacto.html">Contacto</a></li>
				<li><a href="./login.html">Iniciar sesión</a></li>
				<li><a href="./registro.html">Registrarse</a></li>
			</ul>
      	`
}

function printSignedNoAdmin(numItems){
	navbar.innerHTML = `
        		<button type="button" popovertarget="nav" popovertargetaction="hide" aria-label="Cerrar menú de navegación">
					<svg viewBox="0 0 556 556">
						<path d="m24.336 24.336 506.648 506.648M530.984 24.336 24.336 530.984" />
					</svg>
				</button>

				<ul>
					<li><a href="./">Inicio</a></li>
					<li><a href="./quienes-somos.html">Quiénes somos</a></li>
					<li><a href="./nuestro-proyecto.html">Nuestro proyecto</a></li>
					<li><a href="./tienda.html">Tienda</a></li>
					<li><a href="./descargar-app.html">App</a></li>
					<li><a href="./buzon-contacto.html">Contacto</a></li>
					<li><a href="./cerrar-sesion.html">Cerrar sesión</a></li>
					<li><a href="./cart.html"><img src="./assets/img/header/cart.svg"><span>${numItems}</span></a></li>
				</ul>
      		`
}

function printSignedAdmin(numItems){
	navbar.innerHTML = `
        		<button type="button" popovertarget="nav" popovertargetaction="hide" aria-label="Cerrar menú de navegación">
					<svg viewBox="0 0 556 556">
						<path d="m24.336 24.336 506.648 506.648M530.984 24.336 24.336 530.984" />
					</svg>
				</button>

				<ul>
					<li><a href="./">Inicio</a></li>
					<li><a href="./quienes-somos.html">Quiénes somos</a></li>
					<li><a href="./nuestro-proyecto.html">Nuestro proyecto</a></li>
					<li><a href="./tienda.html">Tienda</a></li>
					<li><a href="./descargar-app.html">App</a></li>
					<li><a href="./buzon-contacto.html">Contacto</a></li>
					<li><a href="./admin.html">Admin</a></li>
					<li><a href="./cerrar-sesion.html">Cerrar sesión</a></li>
					<li><a href="./cart.html"><img src="./assets/img/header/cart.svg"><span>${numItems}</span></a></li>
				</ul>
      		`
}