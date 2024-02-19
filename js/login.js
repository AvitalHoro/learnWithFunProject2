//js code for the login page
var loginDiv = window.parent.document.getElementById("overlay2");
var loginFrame = window.parent.document.getElementById("login-frame");
var body = window.parent.document.getElementById("body");  //להוסיף את התז בדף הבית
body.style.pointerEvents = 'none';
loginFrame.style.pointerEvents = 'auto';

var loginAttempts = 0;
var blockLoginTimer;

//function to change to the signup page
function showSignup() {
    loginFrame.src = '/html/signup.html';
}

//checks and login function
function login() {

    localStorage.setItem('isConnected', false);

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //check if the fields are full
    if (username == '' || password == '') {
        alert("יש להכניס שם משתמש וסיסמא");
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];  //the users array from the local storage


    //Check if username exists in Local Storage
    var user = users.find(function (user) {
        return user.username === username && user.password === password;
    });


    if (!user || user.password !== password) {
        alert('שם המשתמש או הסיסמא שגויים');

        //Blocking a user after 5 failed attempts
        loginAttempts = loginAttempts + 1;
        if (loginAttempts >= 5) {
            blockLogin();
            alert("יותר מדי נסיונות התחברות. המערכת נחסמת ל 30 שניות");
        }

        return; // Stop login process
    }

    user.preDate = user.currentDate;
    user.currentDate = new Date;

    // Successful login
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('נכנסת בהצלחה!');


    if (user.gender == "זכר") {
        window.parent.document.getElementById("profile-img-header").src = "../img/boy_profile.png"
    }
    else {
        window.parent.document.getElementById("profile-img-header").src = "../img/girl_profile.png"
    }

    loginDiv.style.visibility = "hidden";
    body.style.pointerEvents = 'auto';
    localStorage.setItem('isConnected', true);
}

//freese the option to login for 30 seconds
function blockLogin() {
    document.getElementById('login-button').disabled = true;
    blockLoginTimer = setTimeout(function () {
        document.getElementById('login-button').disabled = false;
        document.getElementById('login-button').style.backgroundColor = 'blue';
        document.getElementById('error-message').style.display = 'none';
        loginAttempts = 0; // Reset login attempts counter
    }, 30000); // Blocked for 0.5 minute

}

