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



    // Add more courses as needed
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
            if(course.name !== "חשבון" && course.name !== "עברית")
            {
                button.classList.add('not-valid-button');
                var buttons = document.getElementsByClassName('not-valid-button');
    
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


// var popup = document.getElementById('not-valid-popup');
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
// var buttons = document.getElementsByClassName('not-valid-button');
// for (var i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', openPopup);
// }

// var buttons = document.getElementsByClassName('back-to-website-button');
// for (var i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', closePopup);
// }

document.addEventListener('click', function(event) {
    // var popupId=document.getElementById('not-valid-popup');
    if (event.target.classList.contains('not-valid-button')) {
        openPopup('not-valid-popup');
    } else if (event.target.classList.contains('back-to-website-button')) {
        closePopup('not-valid-popup');
    }
});
