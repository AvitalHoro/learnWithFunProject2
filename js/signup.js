var loginDiv=window.parent.document.getElementById("overlay2");
var loginFrame = window.parent.document.getElementById("login-frame");

// window.parent.document.getElementById('signup-form').addEventListener('submit', function(event)
var body = window.parent.document.getElementById("body");  //להוסיף את התז בדף הבית
body.style.pointerEvents = 'none';
loginFrame.style.pointerEvents = 'auto';



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

    //check if the passwords are the same
    if (password != password2) {
        alert('אי התאמה בסיסמא, הכנס שנית');
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username already exists
    var existingUser = users.find(function(user) {
        return user.username === username;
    });
    if (existingUser) {
        alert('שם המשתמש כבר קיים, נסה שם אחר');
        // document.getElementById('error-message').style.display = 'block';
        return; // Stop registration process
    }


    
    // Create user object
    var newUser = {
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


function showLogin() {
    loginFrame.src = '/html/login.html';
}
