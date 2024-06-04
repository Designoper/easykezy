const acceptButton = document.getElementById("acceptButton");
const rejectButton = document.getElementById("rejectButton");
const cookiepopup = document.getElementById("cookiePopup");

acceptButton.onclick = () => cookiepopup.style.display = "none";
rejectButton.onclick = () => cookiepopup.style.display = "none";