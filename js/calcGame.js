//js code for the calc game
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const actions = {
  addition: { iconName: "fa-plus", result: (a, b) => a + b, numOfStar: currentUser ? currentUser.mathStars.add : 0},
  subtraction: { iconName: "fa-minus", result: (a, b) => a - b, numOfStar: currentUser ? currentUser.mathStars.sub : 0},
  multiplication: {
    iconName: "fa-xmark",
    result: (a, b) => a * b,
    numOfStar: currentUser ? currentUser.mathStars.mul : 0,
  },
  division: { iconName: "fa-divide", result: (a, b) => a / b, numOfStar: currentUser ? currentUser.mathStars.div : 0},
};

const levels = {
  level1: { timerSec: 10, range: 10 },
  level2: { timerSec: 8, range: 10 },
  level3: { timerSec: 6, range: 10 },
  level4: { timerSec: 8, range: 20 },
  level5: { timerSec: 6, range: 30 },
};

function generateExerciseAcordingLevel(operationId) {
  exerciseElement.classList.remove("time-end", "correctly", "mistake");

  stopTimer = false;

  stringInputNum = "";

  if (actions[operationId].numOfStar < 50) {
    let my_level = returnLevel(actions[operationId].numOfStar);

    var num1 = Math.floor(Math.random() * levels[my_level].range) + 1;
    var num2 = Math.floor(Math.random() * levels[my_level].range) + 1;
    if (operationId == "division")
      while (num1 % num2 != 0) {
        num1 = Math.floor(Math.random() * levels[my_level].range) + 1;
        num2 = Math.floor(Math.random() * levels[my_level].range) + 1;
      }
    if (operationId == "subtraction") {
      while (num1 - num2 < 0) {
        num1 = Math.floor(Math.random() * levels[my_level].range) + 1;
        num2 = Math.floor(Math.random() * levels[my_level].range) + 1;
      }
    }

    exerciseElement.innerHTML = "";

    current_result = actions[operationId].result(num1, num2);
    // Create and append the content
    exerciseElement.innerHTML = `${num1} <i class="fa-solid ${actions[operationId].iconName}"></i> ${num2} <i class="fa-solid fa-equals"></i> `;

    clearAllTimeouts();
    timer(levels[my_level].timerSec);
  } else {
    youWon();
  }
}

function returnLevel(numOfStar) {
  switch (true) {
    case numOfStar < 10:
      return "level1";
    case numOfStar < 20:
      return "level2";
    case numOfStar < 30:
      return "level3";
    case numOfStar < 40:
      return "level4";
    case numOfStar < 50:
      return "level5";
  }
}

function youWon() {
  console.log("Congratulations! You won!");
  openPopup("not-valid-popup");
  // Add your custom logic here
}

let AddScore = 3;
let subScore = 1;
let mulScore = 4;
let divScore = 0;

let result = 0;

let Name = currentUser.username;
let current_result = 0;
let stringInputNum = "";
let stopTimer = false;
let operationId = "addition";

var starContainer = document.getElementById("my_stars");
const exerciseElement = document.getElementById("the-exercise");
const digitButtons = document.getElementsByClassName("digit-button");

var myInterval = setInterval(animateStartButton, 1500);

var start_button = document.getElementById("start_button");

function animateStartButton() {
  start_button.classList.add("grow");
  setTimeout(() => {
    start_button.classList.add("change-color-green");
  }, 100);
  setTimeout(() => {
    start_button.classList.remove("grow", "change-color-green");
  }, 700);
}

document.getElementById("start_game_text").innerText =
  "שלום " + Name + "!" + "\n" + "אני שבי המחשבון" + "\n" + "רוצה להתחיל לשחק?";

const actionButtons = document.getElementsByClassName("action-button");

start_button.addEventListener("click", function () {
  changeSpeachDiv("start-game", "instructions");
  clearInterval(myInterval);
  myInterval = setInterval(() => {
    animateButtons();
  }, Array.from(actionButtons).length * 1000);
  // Loop through each element and attach event listener
  Array.from(actionButtons).forEach((element) => {
    element.addEventListener("click", function () {
      // Extract the ID from the element
      operationId = element.id;
      // Call the "do an action" function with the ID
      if (myInterval) {
        clearInterval(myInterval);
      }
      defineOpertion(operationId);
    });
    document.getElementById("equal").addEventListener("click", function () {
      if (!stopTimer) {
        stopTimer = true;

        changeSpeachDiv("timer", "equalSpeechDiv");
        setTimeout(function () {
          changeSpeachDiv("equalSpeechDiv", "timer");
        }, 1900);

        setTimeout(function () {
          generateExerciseAcordingLevel(operationId);
        }, 2000);
      }
    });
  });

  Array.from(digitButtons).forEach((button) => {
    button.addEventListener("click", function () {
      // Extract the ID from the element
      const id = button.id;
      typeDigit(id);
    });
  });
});

function changeSpeachDiv(currentId, newId) {
  let currentDiv = document.getElementById(currentId);
  currentDiv.style.display = "none";
  let newDiv = document.getElementById(newId);
  newDiv.style.display = "flex";
}

function animateButtons() {
  Array.from(actionButtons).forEach((button, index) => {
    setTimeout(() => {
      button.classList.add("grow");
      setTimeout(() => {
        button.classList.add("change-color-blue");
        setTimeout(() => {
          button.classList.remove("grow", "change-color-blue");
        }, 500);
      }, 500);
    }, index * 1000);
  });
}

function defineOpertion(operationId) {
  stopTimer = true;

  changeSpeachDiv("instructions", "timer");

  refreshStar();

  generateExerciseAcordingLevel(operationId);
}

let numberElement = document.getElementById("number");

function generateExercise(operationId) {
  exerciseElement.classList.remove("time-end", "correctly", "mistake");

  stopTimer = false;

  stringInputNum = "";

  var num1 = Math.floor(Math.random() * 10) + 1;
  var num2 = Math.floor(Math.random() * 10) + 1;
  if (operationId == "division")
    while (num1 % num2 != 0) {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
    }
  if (operationId == "subtraction") {
    while (num1 - num2 < 0) {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
    }
  }

  exerciseElement.innerHTML = "";

  current_result = actions[operationId].result(num1, num2);
  // Create and append the content
  exerciseElement.innerHTML = `${num1} <i class="fa-solid ${actions[operationId].iconName}"></i> ${num2} <i class="fa-solid fa-equals">  </i>`;

  clearAllTimeouts();
  timer(10);
  // Call the timer function
  // var Interval2=setInterval(changeNumber, 900);
}

let timeoutIds = []; // Array to store timeout IDs

function timer(sec) {
  for (let i = sec; i >= 0; i--) {
    let timeoutId = setTimeout(function () {
      if (stopTimer) {
        clearAllTimeouts();
        return;
      }
      let percentage = 100 - (i / sec) * 100;
      document.getElementById("per").style.transform =
        "scale(" + percentage / 100 + ")";
      numberElement.textContent = i;
      if (i == 0) {
        if (
          !(
            exerciseElement.classList.contains("correctly") ||
            exerciseElement.classList.contains("mistake")
          )
        ) {
          exerciseElement.classList.add("time-end");
          exerciseElement.innerHTML = "הזמן תם";
          setTimeout(function () {
            generateExerciseAcordingLevel(operationId);
          }, 2000);
        }
        clearAllTimeouts();
        return;
      }
    }, (sec - i) * 1000); // Multiply the delay by (10 - i) seconds
    timeoutIds.push(timeoutId);
  }
}

function clearAllTimeouts() {
  timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  timeoutIds = [];
}

function refreshStar() {
  starContainer.innerHTML = "";
  for (let i = 10; i <= actions[operationId].numOfStar; i += 10) {
    starContainer.innerHTML += `<img src="/img/star.png" alt="כוכב" class="star">`;
  }
}

function typeDigit(digitId) {
  const exerciseElement = document.getElementById("the-exercise");
  stringInputNum += digitId;
  // Set the text content of the target element
  exerciseElement.innerHTML += digitId;
  if (parseInt(stringInputNum) == current_result) {
    exerciseElement.classList.add("correctly");
    exerciseElement.innerHTML = "נכון מאוד!";
    stopTimer = true;
    actions[operationId].numOfStar++;

    if (actions[operationId].numOfStar % 10 == 0) refreshStar();
    setTimeout(function () {
      generateExerciseAcordingLevel(operationId);
    }, 2000);
  } else if (
    parseInt(stringInputNum) > current_result ||
    (current_result < 10 && stringInputNum.length > 0) ||
    (current_result < 100 && stringInputNum.length > 1) ||
    (current_result < 1000 && stringInputNum.length > 2)
  ) {
    exerciseElement.classList.add("mistake");
    exerciseElement.innerHTML = "טעות...";
    stopTimer = true;

    setTimeout(function () {
      generateExerciseAcordingLevel(operationId);
    }, 2000);
  }
  // exerciseElement.innerHTML = document.getElementById(digitId).innerText;
}

var overlay = document.getElementById("overlay");

function openPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.classList.add("open-popup");
  overlay.style.display = "block";
}

function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.classList.remove("open-popup");
  overlay.style.display = "none";
}

document
  .getElementById("startAgain")
  .addEventListener("click", function () {
    closePopup("not-valid-popup");
    actions[operationId].numOfStar = 0;
    generateExerciseAcordingLevel(operationId);
    refreshStar();
  });


function saveStars() { 

    currentUser.mathStars.add = actions["addition"].numOfStar;
    currentUser.mathStars.sub = actions["subtraction"].numOfStar;
    currentUser.mathStars.mul = actions["multiplication"].numOfStar;
    currentUser.mathStars.div = actions["division"].numOfStar;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
 }

  document.getElementById("go-home").addEventListener('click', function() {
    document.body.classList.add('fade-out');
    setTimeout(function() {
        saveStars();
        window.location.href = '../index.html';

    }, 500);}
    );