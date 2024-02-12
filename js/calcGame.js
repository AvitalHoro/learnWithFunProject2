const actions = {
    addition: { iconName: "fa-plus", result: (a, b) => a + b, numOfStar: 0 },
    subtraction: { iconName: "fa-minus", result: (a, b) => a - b, numOfStar: 0 },
    multiplication: { iconName: "fa-xmark", result: (a, b) => a * b, numOfStar: 0 },
    division: { iconName: "fa-divide", result: (a, b) => a / b, numOfStar: 0 }
};

let AddScore = 3;
let subScore = 1;
let mulScore = 4;
let divScore = 0;

let result = 0;

let Name = "אביטל";
let current_result=0;
let stringNum = "";
let stopTimer = false;
let operationId = 'addition';

var starContainer = document.getElementById("my_stars");
const exerciseElement = document.getElementById("the-exercise");
const digitButtons = document.getElementsByClassName('digit-button');



var myInterval = setInterval(
    animateStartButton, 1500);

var start_button = document.getElementById("start_button");

function animateStartButton() {
    start_button.classList.add('grow');
    setTimeout(() => {
        start_button.classList.add('change-color-green');
    }, 100)
    setTimeout(() => {
        start_button.classList.remove('grow', 'change-color-green');
    }, 700);
}

document.getElementById("start_game_text").innerText = "שלום " + Name + "!"  + "\n" +  "אני שבי המחשבון" + "\n" + "רוצה להתחיל לשחק?";

const actionButtons = document.getElementsByClassName('action-button');

start_button.addEventListener('click', function () {
    changeSpeachDiv('start-game', 'instructions');
    clearInterval(myInterval)
    myInterval = setInterval(() => {
        animateButtons();
    }, Array.from(actionButtons).length * 1000);
    // Loop through each element and attach event listener
Array.from(actionButtons).forEach(element => {
    element.addEventListener('click', function () {
        // Extract the ID from the element
        operationId = element.id;
        // Call the "do an action" function with the ID
        if (myInterval) {
            clearInterval(myInterval);
        }
                defineIcon(operationId);
    });
});


    Array.from(digitButtons).forEach(button => {
        button.addEventListener('click', function () {
            // Extract the ID from the element
            const id = button.id;
            typeDigit(id);
        });
    });
    
});

function changeSpeachDiv(currentId, newId) {
    let currentDiv = document.getElementById(currentId);
    currentDiv.style.display = 'none';
    let newDiv =document.getElementById(newId);
    newDiv.style.display = 'flex';
}


function animateButtons() {
    Array.from(actionButtons).forEach((button, index) => {
        setTimeout(() => {
            button.classList.add('grow');
            setTimeout(() => {
                button.classList.add('change-color-blue');
                setTimeout(() => {
                    button.classList.remove('grow', 'change-color-blue');
                }, 500);
            }, 500);
        }, index * 1000);
    });
}



// var myInterval = setInterval(() => {
//     animateButtons();
// }, Array.from(actionElements).length * 1000);




// var actions = [
//     { actionName: "addition", iconName: "fa-plus", result: (a,b)=>a+b, numOfStar: 0 },
//     { actionName: "addition", iconName: "fa-minus", result: (a,b)=>a-b,  numOfStar: 0},
//     { actionName: "multiplication", iconName: "fa-xmark", result: (a,b)=>a*b,  numOfStar: 0 },
//     { actionName: "division", iconName: "fa-divide", result: (a,b)=>a/b,  numOfStar: 0 },
// ];

function defineIcon(operationId) {
    stopTimer=true;



    // let iconName;
    // let numOfStar;

    // switch (operationId) {
    //     case 'addition':
    //         iconName = 'fa-plus';
    //         numOfStar = AddScore;
    //         break;
    //     case 'addition':
    //         iconName = 'fa-minus';
    //         numOfStar = subScore;
    //         break;
    //     case 'multiplication':
    //         iconName = 'fa-xmark';
    //         numOfStar = mulScore;
    //         break;
    //     case 'division':
    //         iconName = 'fa-divide';
    //         numOfStar = divScore;
    //         break;
    // }

    starContainer.innerHTML = '';

    changeSpeachDiv('instructions', 'timer');

    for (let i = 0; i < actions[operationId].numOfStar; i++) {
        starContainer.innerHTML += `<img src="/img/star.png" alt="כוכב" class="star">`;
    }
    
    generateExercise(operationId);

    // return setInterval(function () {
    //     generateExercise(operationId);
    // }, 10*1000);

    
}

let numberElement = document.getElementById('number');



function generateExercise(operationId) {
    if (exerciseElement.classList.contains('time-end')) {
        exerciseElement.classList.remove('time-end');
    }
    if (exerciseElement.classList.contains('correctly')) {
        exerciseElement.classList.remove('correctly');
    }
    if (exerciseElement.classList.contains('mistake')) {
        exerciseElement.classList.remove('mistake');
    }
    stopTimer = false;

    stringNum = "";
    var num1 = Math.floor(Math.random() * 10) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;
    if (operationId == 'division')
        while (num1 % num2 != 0) {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        }
    if(operationId == 'subtraction')
    {
        while (num1 - num2 < 0) {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        }
    }

    exerciseElement.innerHTML = '';

    current_result = actions[operationId].result(num1,num2);
    // Create and append the content
    exerciseElement.innerHTML = `${num1} <i class="fa-solid ${actions[operationId].iconName}"></i> ${num2} <i class="fa-solid fa-equals">  </i>`;

    clearAllTimeouts();
    timer(10);
      // Call the timer function
    // var Interval2=setInterval(changeNumber, 900);
}

// function timer(sec) {
//     for (let i = sec; i >= 0; i--) {
//         setTimeout(function() {
//             if(stopTimer)
//                 return;
//             let percentage = 100 - ((i / sec) * 100);
//             document.getElementById('per').style.transform = 'scale(' + percentage / 100 + ')';
//             numberElement.textContent = i;
//             if(i==0 && !stopTimer)
//                 {
//                     if (!(exerciseElement.classList.contains('correctly') || exerciseElement.classList.contains('mistake'))) 
//                     {
//                     exerciseElement.classList.add('time-end');
//                     exerciseElement.innerHTML = "הזמן תם";
//                     setTimeout(function() {
//                         generateExercise(operationId);}, 3000);
//                     }
//                     return;
//         }}, (sec - i) * 1000); // Multiply the delay by (10 - i) seconds
//     }
// }

// function timer() {
//     while(!stopTimer)
//     {

//         setTimeout(function() {
//             let percentage = 100 - ((i / sec) * 100);
//             document.getElementById('per').style.transform = 'scale(' + percentage / 100 + ')';
//             numberElement.textContent = i;
//         }, (sec - i) * 1000); // Multiply the delay by (10 - i) seconds
//     }
// }

let timeoutIds = []; // Array to store timeout IDs

function timer(sec) {
for (let i = sec; i >= 0; i--) {
    let timeoutId = setTimeout(function() {
            if(stopTimer)
            {
                clearAllTimeouts();
                return;
                        }
                                    let percentage = 100 - ((i / sec) * 100);
            document.getElementById('per').style.transform = 'scale(' + percentage / 100 + ')';
            numberElement.textContent = i;
            if(i==0)
                {
                    if (!(exerciseElement.classList.contains('correctly') || exerciseElement.classList.contains('mistake'))) 
                    {
                    exerciseElement.classList.add('time-end');
                    exerciseElement.innerHTML = "הזמן תם";
                    setTimeout(function() {
                        generateExercise(operationId);}, 2000);
                    }
                    clearAllTimeouts();
                    return;
        }}, (sec - i) * 1000); // Multiply the delay by (10 - i) seconds
        timeoutIds.push(timeoutId);
    }
}

function clearAllTimeouts() {
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds = [];
}






function typeDigit(digitId) {
    const exerciseElement = document.getElementById("the-exercise");
    stringNum += digitId;
    // Set the text content of the target element
    exerciseElement.innerHTML += digitId;
    if(parseInt(stringNum)==current_result)
    {
        exerciseElement.classList.add('correctly');
        exerciseElement.innerHTML = "נכון מאוד!";
        stopTimer = true;
        actions['addition'].numOfStar++;
        setTimeout(function() {
        generateExercise(operationId);}, 2000);
    }
    else if (parseInt(stringNum)>current_result||(current_result<10 && stringNum.length>1) || (current_result<100 && stringNum.length>2) || (current_result<1000 && stringNum.length>3))
    {
        exerciseElement.classList.add('mistake');
        exerciseElement.innerHTML = "טעות...";
        stopTimer = true;

        setTimeout(function() {
            generateExercise(operationId);}, 2000);

    }
    // exerciseElement.innerHTML = document.getElementById(digitId).innerText;
}