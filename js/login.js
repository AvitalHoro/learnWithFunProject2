
var loginDiv = window.parent.document.getElementById("overlay2");
var loginFrame = window.parent.document.getElementById("login-frame");
var body = window.parent.document.getElementById("body");  //להוסיף את התז בדף הבית
body.style.pointerEvents = 'none';
loginFrame.style.pointerEvents = 'auto';

var loginAttempts = 0;
var blockLoginTimer;
// var loginForm=document.getElementById("login-form");

//Initialize the array of users by two users
var users = [
    {
        firstName: "שרה",
        lastName: "כהן",
        email: "sarah.cohen@gmail.com",
        gender: "נקבה",
        username: "שרה123",
        password: "1234",
        hebrewScore:6,
        hebrewLevel:1,
        mathStars:{
            add: 2,
            sub: 0,
            mult: 1,
            div: 0},
        preDate: new Date('12/3/2022'),
        currentDate: new Date('12/3/2022')
    },
    {
        firstName: "יוני",
        lastName: "נתן",
        email: "yoni@gmail.com",
        gender: "זכר",
        username: "yonini",
        password: "6789",
        hebrewScore:2,
        hebrewLevel:1,
        mathStars:{
            add: 1,
            sub: 1,
            mult: 0,
            div: 0},
        preDate: new Date(2023,3,15,14,23,0),
        currentDate: new Date(2023,3,15,14,23,0)
    }
];

// Save the initial users array to Local Storage
localStorage.setItem('users', JSON.stringify(users));

function showSignup() {
    loginFrame.src = '/html/signup.html';
}


function login() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //check if the fields are full
    if (username == '' || password == '') {
        alert("יש להכניס שם משתמש וסיסמא");
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];


    // Check if username exists in Local Storage
    var user = users.find(function (user) {
        return user.username === username && user.password === password;
    });


    if (!user || user.password !== password) {
        alert('שם המשתמש או הסיסמא שגויים');

        loginAttempts = loginAttempts + 1;
        if (loginAttempts >= 5) {
            blockLogin();
            alert("יותר מדי נסיונות התחברות. המערכת נחסמת ל 30 שניות");
        }

        return; // Stop login process
    }

    user.preDate=user.currentDate;
    user.currentDate=new Date;

    // Successful login
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Login successful!');
 
    // window.currentUser = user;


    loginDiv.style.visibility = "hidden";
    body.style.pointerEvents = 'auto';
}


function blockLogin() {
    //Blocking further login attempts for one minute, after five incorrect attempts
    document.getElementById('login-button').disabled = true;
    // document.getElementById('error-message').innerText = "Too many failed login attempts. Please try again later.";
    // document.getElementById('error-message').style.display = 'block';
    blockLoginTimer = setTimeout(function () {
        document.getElementById('login-button').disabled = false;
        document.getElementById('error-message').style.display = 'none';
        loginAttempts = 0; // Reset login attempts counter
    }, 30000); // Blocked for 0.5 minute
}

