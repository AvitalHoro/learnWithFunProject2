//js code for the signup page

var loginDiv=window.parent.document.getElementById("overlay2");
var loginFrame = window.parent.document.getElementById("login-frame");
var body = window.parent.document.getElementById("body");  //להוסיף את התז בדף הבית
body.style.pointerEvents = 'none';
loginFrame.style.pointerEvents = 'auto';


//Sign-up attempt or sign-up
function signupClick() {

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var genderAll = document.querySelectorAll('input[name="gender"]');
    var username = document.getElementById('userName').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;

    //check if all the fields ar full
    if(firstName==''||lastName==''||email==''||username==''||password==''||password2==''||(genderAll[0].checked==false&&genderAll[1].checked==false)){
        alert('נא למלא את כל השדות');
        return;
    }

    var gender = document.querySelector('input[name="gender"]:checked').value;
    gender=(gender=='male')? "זכר" : "נקבה";

    //check if the password is more than 7 characters
    if(password.length<8){
        alert('הסיסמא צריכה להכיל לפחות 8 תווים');
        return;
    }

    //check if the passwords are the same
    if (password != password2) {
        alert('אי התאמה בסיסמא, הכנס שנית');
        return;
    }

    //check if the email address is correct
    if(!isCorrectEmail(email)){
        alert('כתובת אימייל לא תקינה');
        return;
    }


    var users = JSON.parse(localStorage.getItem('users')) || [];  //the array of the users from the local storage

    // Check if username already exists
    var existingUser = users.find(function(user) {
        return user.username === username;
    });
    if (existingUser) {
        alert('שם המשתמש כבר קיים, נסה שם אחר');
        return; // Stop registration process
    }

    index=users.length;
    
    // Create user object
    var newUser = {
        index: index,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        username: username,
        password: password,
        hebrewScore:0,
        hebrewLevel:1,
        mathStars:{
            add: 0,
            sub: 0,
            mult: 0,
            div: 0
        },
        preDate: new Date(),
        currentDate: new Date()
    };

    // Add the new user to the users array
    users.push(newUser);

    
    // Save the updated users array back to Local Storage
    localStorage.setItem('users', JSON.stringify(users));

    // Save the current user separately as "currentUser"
    localStorage.setItem('currentUser', JSON.stringify(newUser));


    alert('ברוך הבא! נרשמת בהצלחה');
    localStorage.setItem('isConnected', true);
    loginDiv.style.visibility = "hidden";
    body.style.pointerEvents = 'auto';

}

//function to change to the login page
function showLogin() {
    loginFrame.src = '/html/login.html';
}

//checking the email format
function isCorrectEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
