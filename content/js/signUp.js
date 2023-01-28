/**
 * Target Elements in the DOM.
 */
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const submitBtn = document.getElementById("createAcc");

// Regular expressions for validation username, email and password.
const userNameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,13}[a-zA-Z]$/;
const emailRegex = /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/;
const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/;

// state it contains the status of userNameValidation, emailValid and passwordValid.
const state = { usernameValid: false, emailValid: false, passwordValid: false };

/**
 * @function
 * This function check if the all input is valid, if it valid invoked
 * fetchForm() function else throws an error below each input.
 *
 */
function submitForm(e) {
	e.preventDefault();
	if (!state.usernameValid && !state.emailValid && !state.passwordValid) {
		setError(userName, "Username must consist of 5 to 15 characters");
		setError(email, "Email must be in a valid format");
		setError(password, "Password must be at least 8 characters");
		setError(confirmPassword, "Password should the same previous");
		userName.focus();
	} else {
		fetchForm({
			username: userName.value,
			email: email.value,
			password: password.value,
			password_confirmation: confirmPassword.value,
		});
	}
}

/**
 * @param {EleRef} element Dom element reference.
 * @param {string} massage massage that will be throw below the input.
 * This function throws an error below the input.
 */
function setError(element, massage) {
	const parentElement = element.parentElement;
	const errorParent = parentElement.querySelector(".validation");
	const errorElement = parentElement
		.querySelector(".validation")
		.querySelector("small");

	errorParent.style.display = "block";
	errorElement.innerText = massage;
	parentElement.classList.add("error");
	parentElement.classList.remove("success");
}

/**
 * @param {EleRef} element Dom element reference.
 * This function removes the error element and adds a success class.
 */
function setSuccess(element) {
	const parentElement = element.parentElement;
	const errorParent = parentElement.querySelector(".validation");
	const errorElement = parentElement
		.querySelector(".validation")
		.querySelector("small");

	errorParent.style.display = "none";
	errorElement.innerText = "";
	parentElement.classList.add("success");
	parentElement.classList.remove("error");
}

/**
 *
 * @param {object} data {username,email,password,password_confirmation}.
 * This function is called when the user submitted the form.
 * send POST request to api endpoint if success set item in localStorage
 * and navigate to logged in page.
 */
async function fetchForm(data) {
	await fetch("https://goldblv.com/api/hiring/tasks/register", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((data) => {
			localStorage.setItem("email", `mailto:${data.email}`);
			window.location = "../pages/loggedIn.html";
		})
		.catch((error) => {
			throw new Error(error.massage);
		});
}

/**
 * User Name validations
 */
userName.addEventListener("input", () => {
	if (userName.value === "") {
		setError(userName, "User name cannot be empty");
		state.usernameValid = false;
	} else if (userNameRegex.test(userName.value) === false) {
		setError(userName, "Username must consist of 5 to 15 characters");
		state.usernameValid = false;
	} else {
		setSuccess(userName);
		state.usernameValid = true;
	}
});

/**
 * Email validations
 */
email.addEventListener("input", () => {
	if (email.value === "") {
		setError(email, "email cannot be empty");
		state.emailValid = false;
	} else if (!emailRegex.test(email.value)) {
		setError(email, "Email must be in a valid format");
		state.emailValid = false;
	} else {
		setSuccess(email);
		state.emailValid = true;
	}
});

/**
 * Password validations
 */
let confirmPass = "";
password.addEventListener("input", () => {
	if (password.value === "") {
		setError(password, "password cannot be empty");
	} else if (!passwordRegex.test(password.value)) {
		setError(password, "Password must be at least 8 characters");
	} else {
		setSuccess(password);
		confirmPass = password.value;
	}
});

/**
 * Confirm Password validations
 */
confirmPassword.addEventListener("input", () => {
	if (confirmPassword.value === "") {
		setError(confirmPassword, "password cannot be empty");
		state.passwordValid = false;
	} else if (confirmPassword.value !== confirmPass) {
		setError(confirmPassword, "Password should the same previous");
		state.passwordValid = false;
	} else {
		setSuccess(confirmPassword);
		state.passwordValid = true;
	}
});

// Submit Form btn
submitBtn.addEventListener("click", submitForm);
