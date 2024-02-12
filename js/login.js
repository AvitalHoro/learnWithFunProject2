
var loginDiv=window.parent.document.getElementById("overlay");
var loginFrame = window.parent.document.getElementById("login-frame");

function showSignup() {
    loginFrame.src = 'signup.html';
}

// function showSignup() {
//     Change the parent frame to signup page
//     window.parent.showSignup();
// }

function login() {


    loginDiv.style.visibility="hidden";
    body.style.pointerEvents = 'auto';
}


// function showSignup() {
//     loginFrame.src = 'signup.html';
//   }

// function showLogin() {
//     loginFrame.src = 'login.html';
//   }