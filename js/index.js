var showButton = document.getElementById('profile-img-header');

showButton.addEventListener('click', showProfileSection);

var courses = [
    { name: "עברית", imageUrl: "../img/hebrew.png" },
    { name: "חשבון", imageUrl: "../img/math.png" },
    { name: "אנגלית", imageUrl: "../img/english.png" },
    { name: "מדעים", imageUrl: "../img/sciences.png" },
    { name: "ציור", imageUrl: "../img/drawing.png" },
    { name: "תנ\"ך", imageUrl: "../img/bibble.png" },
];

function renderCourses(filter) {
    var courseList = document.getElementById('items-grid');
    courseList.innerHTML = ''; // Clear previous content

    courses.forEach(function(course) {
        if (course.name.toLowerCase().includes(filter.toLowerCase())) {
            var courseDiv = document.createElement('div');
            courseDiv.classList.add('game-item', 'grow-on-hover');


            var img = document.createElement('img');
            img.classList.add('game-item-img');
            img.src = course.imageUrl;
            img.alt = course.name;

            var button = document.createElement('button');
            button.classList.add('game-item-button', 'glowing-border');
            if(course.name == "חשבון")
            {
                button.id="calcGame"
            }
            else if(course.name == "עברית")
            {

            }
            else //(course.name !== "חשבון" && course.name !== "עברית")
            {
                button.classList.add('not-valid-button');
                //var buttons = document.getElementsByClassName('not-valid-button');
    
            }
            button.textContent = course.name;

            courseDiv.appendChild(img);
            courseDiv.appendChild(button);
            courseList.appendChild(courseDiv);
        }
    });
}


var searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    renderCourses(this.value.trim());
});

renderCourses('');

var overlay = document.getElementById('overlay')

function openPopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.classList.add('open-popup');
    overlay.style.display = 'block';
}

function closePopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.classList.remove('open-popup');
    overlay.style.display = 'none';

}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('not-valid-button')) {
        openPopup('not-valid-popup');
    } else if (event.target.classList.contains('back-to-website-button')) {
        closePopup('not-valid-popup');
    }
});

function showProfileSection() {
    var ProfileDiv = document.getElementById('side-profile');

    // Toggle the visibility of the target div
    if (ProfileDiv.style.display === 'none') {
        ProfileDiv.style.display = 'flex';
        // ProfileDiv.style.width = '150px';

    } else {
        ProfileDiv.style.display = 'none';
    }

    var userName=document.getElementById("user-name");
    var plusStars=document.getElementById("plus-stars");
    var subStars=document.getElementById("sub-stars");
    var multStars=document.getElementById("mult-stars");
    var divStars=document.getElementById("div-stars");
    var hebrewLevel=document.getElementById("hebrew-level");
    var hebrewScore=document.getElementById("score-number");
    var currentUser=JSON.parse(localStorage.getItem('currentUser'));
    userName.textContent= currentUser.firstName+" "+currentUser.lastName;
    plusStars.textContent= currentUser.preDate;
    subStars.textContent= "חיסור: "+currentUser.mathStars.sub+" כוכבים";
    multStars.textContent= "כפל: "+currentUser.mathStars.mult+" כוכבים";
    divStars.textContent= "חילוק: "+currentUser.mathStars.div+" כוכבים";
    
    // var aaa = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     gender: gender,
    //     username: username,
    //     password: password,
    //     hebrewScore:0,
    //     hebrewLevel:0,
    //     mathStars:{
    //         add: 0,
    //         sub: 0,
    //         mult: 0,
    //         div: 0
    //     }
    // };



};

function logout(){
    var ProfileDiv = document.getElementById('side-profile');
    ProfileDiv.style.display = 'none';
    var loginDiv = window.parent.document.getElementById("overlay2");
    loginDiv.style.visibility="visible";
    var loginFrame = document.getElementById("login-frame");
    loginFrame.src='/html/login.html';
}

document.getElementById("calcGame").addEventListener('click', function() {
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = '../html/calcGame.html';
    }, 500);});


