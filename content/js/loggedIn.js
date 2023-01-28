/**
 * Target Element in the DOM.
 */
const mailLinkEle = document.querySelector(".mailLink");

// Get the mail from LocalStorage.
const email = localStorage.getItem("email");

// Set the anchor element href and text content.
mailLinkEle.setAttribute("href", email);
mailLinkEle.textContent = email;
