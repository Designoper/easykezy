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

// If cart has something
if (sessionStorage.getItem("cartList") != null){
    var cartList = sessionStorage.getItem("cartList");

    // Get games collection
    get(child(dbRef, "games")).then((snapshot) => {
        if (snapshot.exists()) {
            // Convert data to object
            var gameList = snapshot.val();

            // Convert cart data (string) to array
            var cartGames = cartList.split(",");


            // For total price
            var totalPrice = 0;

            // Clear default cart
            document.getElementById("product-list").innerHTML = "";

            // Get game info according to cart games
            for (const element in gameList) {
                cartGames.forEach(cartGame => {
                    if (cartGame == element) {
                        document.getElementById("product-list").innerHTML += `
                        <article class="product-item">
                            <figure class="cart-photo" style="background-image: url('./assets/img/videojuegos/${gameList[element].image}');"></figure>
                            <div class="cart-info">
                                <h4>${gameList[element].title}</h4>
                                <p>${gameList[element].price}€</p>
                            </div>
                        </article>
                    `

                        // Adding price
                        totalPrice += Number(gameList[element].price);
                    }
                });
            }

            // Show total price
            document.getElementById("totalPrice").innerHTML = totalPrice + "€";

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
else {
    document.getElementById("product-list").innerHTML = "No hay artículos en la cesta"
    document.getElementById("totalPrice").innerHTML = ""
}


window.clearCartList = function(){
    sessionStorage.removeItem("cartList");

    window.location.href = "cart.html";
}