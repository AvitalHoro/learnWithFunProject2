var showButton = document.getElementById('profile-img-header');
var ProfileDiv = document.getElementById('side-profile');


function showProfileSection() {
    console.log("kjhgf");
    // Toggle the visibility of the target div
    if (ProfileDiv.style.display === 'none') {
        ProfileDiv.style.display = 'block';
        ProfileDiv.style.width = '150px';

    } else {
        ProfileDiv.style.display = 'none';
    }


};

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

document.getElementById("calcGame").addEventListener('click', function() {
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = '../html/calcGame.html';
    }, 500);});


