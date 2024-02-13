//js code for the home page

var loginDiv = document.getElementById("overlay2");
var loginIframe = document.getElementById("login-frame");
var overlay = document.getElementById("overlay");



//an array contains the courses that the user can play
var courses = [
  { name: "עברית", imageUrl: "../img/hebrew.png" },
  { name: "חשבון", imageUrl: "../img/math.png" },
  { name: "אנגלית", imageUrl: "../img/english.png" },
  { name: "מדעים", imageUrl: "../img/sciences.png" },
  { name: "ציור", imageUrl: "../img/drawing.png" },
  { name: 'תנ"ך', imageUrl: "../img/bibble.png" },
];

// The function displays the user's profile section
var showButton = document.getElementById("profile-img-header");
showButton.addEventListener("click", showProfileSection);



// If the user is already connected, hide the login div
if (localStorage.getItem("isConnected") === "true") {
  loginIframe.src = "";
  loginDiv.style.visibility = "hidden";
}

// Render the courses about the user search
function renderCourses(filter) {
  var courseList = document.getElementById("items-grid");
  courseList.innerHTML = ""; // Clear previous content

  courses.forEach(function (course) {
    if (course.name.toLowerCase().includes(filter.toLowerCase())) {
      var courseDiv = document.createElement("div");
      courseDiv.classList.add("game-item", "grow-on-hover");

      var img = document.createElement("img");
      img.classList.add("game-item-img");
      img.src = course.imageUrl;
      img.alt = course.name;

      var button = document.createElement("button");
      button.classList.add("game-item-button", "glowing-border");
      if (course.name == "חשבון") {
        button.id = "calcGame";
      } else if (course.name == "עברית") {
        button.id = "hebrewGame";
      } //(course.name !== "חשבון" && course.name !== "עברית")
      else {
        button.classList.add("not-valid-button");
      }
      button.textContent = course.name;

      courseDiv.appendChild(img);
      courseDiv.appendChild(button);
      courseList.appendChild(courseDiv);
    }
  });
}

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  renderCourses(this.value.trim());
});

renderCourses("");

// Open popup when the user clicks on the login button
function openPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.classList.add("open-popup");
  overlay.style.display = "block";
}

// Close the popup when the user clicks outside of it
function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.classList.remove("open-popup");
  overlay.style.display = "none";
}

// Open popup not valid Close the popup when the user clicks outside of it
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("not-valid-button")) {
    openPopup("not-valid-popup");
  } else if (event.target.classList.contains("back-to-website-button")) {
    closePopup("not-valid-popup");
  }
});

//The function display the current user's information
function showProfileSection() {
  var ProfileDiv = document.getElementById("side-profile");

  // Toggle the visibility of the target div
  if (ProfileDiv.style.display === "none") {
    ProfileDiv.style.display = "flex";
  } else {
    ProfileDiv.style.display = "none";
  }

  var userName = document.getElementById("user-name");
  var userEmail = document.getElementById("user-email");
  var lastVisit = document.getElementById("user-last-visit");
  var Stars = document.getElementById("user-score");
  var rating = document.getElementById("user-rating");
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //display the users' details
  SumStars =
    currentUser.mathStars.add +
    currentUser.mathStars.sub +
    currentUser.mathStars.mult +
    currentUser.mathStars.div;
  Stars.innerText = "מספר כוכבים" + "\n" + SumStars;

  const date = new Date(currentUser.preDate);
  lastVisit.innerText =
    "הפעם האחרונה שלך פה" +
    "\n" +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();
  userEmail.innerText = "המייל שלך" + "\n" + currentUser.email;
  userName.textContent = "שלום" + "\n" + currentUser.username;
  totalPoints = totall(currentUser); //the sum of the users' stars from the games
  var rate = calcRate(currentUser); //calc the rating relative to other users
  rating.innerText = "דירוג" + "\n" + rate;
}

//sum the total points of an user
function totall(user) {
  var total =
    user.mathStars.add +
    user.mathStars.sub +
    user.mathStars.mult +
    user.mathStars.div +
    user.hebrewScore;
  return total;
}

//help function for comparison between points of two players
function sortByTotal(u1, u2) {
  return -(totall(u1) - totall(u2));
}

//The function calculates the rating of the player in relation to the other users
function calcRate(user) {
  const users = JSON.parse(localStorage.getItem("users"));
  var copy = [...users];
  copy.sort(sortByTotal);
  i = copy.findIndex((u) => u.username === user.username);
  return i + 1;
}

//logout from the user account
function logout() {
  var ProfileDiv = document.getElementById("side-profile");
  ProfileDiv.style.display = "none";
  var loginDiv = window.parent.document.getElementById("overlay2");
  loginDiv.style.visibility = "visible";
  var loginFrame = document.getElementById("login-frame");
  loginFrame.src = "/html/login.html";
  localStorage.setItem("isConnected", false);
}



document.getElementById("calcGame").addEventListener('click', function () {
  document.body.classList.add('fade-out');
  setTimeout(function () {
    window.location.href = '../html/calcGame.html';
  }, 500);
});

document.getElementById("hebrewGame").addEventListener('click', function () {
  document.body.classList.add('fade-out');
  setTimeout(function () {
    window.location.href = '../html/hebrew.html';
  }, 500);
});


