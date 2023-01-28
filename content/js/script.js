/**
 * Target Elements in the DOM.
 */
const getStartBtn = document.getElementById("getStarted");
const welcomeCard = document.querySelector(".welcome-card");
const signUpCard = document.querySelector(".signUp-card");

/**
 * This function invokes when clicking on (Get Started) button.
 * 1- Hide Welcome card.
 * 2- Show SignUp card.
 */
function start() {
	window.location = "content/pages/signUp.html";
}

// Start btn
getStartBtn.addEventListener("click", start);


