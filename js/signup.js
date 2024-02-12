
// window.parent.document.getElementById('signup-form').addEventListener('submit', function(event)
var loginDiv = window.parent.document.getElementById("overlay");
var loginFrame = window.parent.document.getElementById("login-frame");
var body = window.parent.document.getElementById("body");  //להוסיף את התז בדף הבית
var userKey = 0;
body.style.pointerEvents = 'none';
loginFrame.style.pointerEvents = 'auto';

function showLogin() {
    loginFrame.src = 'login.html';
}

function signupClick() {

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('userName').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;

    if (password != password2) {
        alert('אי התאמה בסיסמא, הכנס שנית');
        return;
    }

    // Create user object
    var user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        lastEntryDate: new Date().toISOString(), // Current date/time
        totalScore: 0, // Initial total score
        gameLevels: {
            game1: 1,
            game2: 1
        }
    };

    // Save user object to Local Storage
    localStorage.setItem(++userKey, JSON.stringify(user));

    // Clear form fields
    document.getElementById('signup-form').reset();

    alert('ברוך הבא! נרשמת בהצלחה');

    loginDiv.style.visibility = "hidden";
    body.style.pointerEvents = 'auto';
}

function showLogin() {
    // Change the parent frame to login page
    window.parent.showLogin();
}
