//! להעביר לדף הבית

//  var loginDiv=document.getElementById("overlay");
// var loginFrame = document.getElementById("login-frame");
// var body = document.getElementById("body");  //להוסיף את התז בדף הבית

// body.style.pointerEvents = 'none';
// body.style.pointerEvents='auto'; //ככה מחזירים בחזרה
// loginFrame.style.pointerEvents = 'auto';

// function showSignup() {
//     loginFrame.src = 'signup.html';
// }

// function showLogin() {
//     loginFrame.src = 'login.html';
// }

// function login() {



//     loginDiv.style.visibility="hidden";
//     body.style.pointerEvents = 'auto';
// }

// function signup() {



//     loginDiv.style.visibility="hidden";
//     body.style.pointerEvents = 'auto';
// }

//! עד כאן להעביר לדף הבית


//js code for the learning hebrew game

//an array contains the images and the word that in use in the game
var images = [

    { name: "תפוח", src: "/img/apple.png" },
    { name: "כלב", src: "/img/dog.jpg" },
    { name: "בית", src: "/img/house.jpg" },
    { name: "כדור", src: "/img/ball.jpg" },
    { name: "כובע", src: "/img/hat.jpg" },

    { name: "חיפושית", src: "/img/hipushit.jpg" },
    { name: "גלידה", src: "/img/iceCream.jpg" },
    { name: "קונכיה", src: "/img/kunchia.jpg" },
    { name: "תרוד", src: "/img/tarvad.jpeg" },
    { name: "להבה", src: "/img/lehava.jpg" },
    { name: "מכחול", src: "/img/mikchol.jpg" },

    { name: "אגרטל", src: "/img/agartal.jpg" },
    { name: "מנוף", src: "/img/manof.png" },
    { name: "עב", src: "/img/av.jpg" },
    { name: "יעה", src: "/img/yae.jpg" },
    { name: "סייח", src: "/img/syach.jpg" },
    { name: "קלחת", src: "/img/kalahat.jpg" }
]


var stage = 1;   //the current stage of the player
const endLevel1 = 5;
const endLevel2 = 10;
const endGame = 15;
const gameScreen = document.getElementById("gameScreen");
const imagesDiv = document.getElementById("images-div");
const startButton = document.getElementById("start-button");
const wordDiv = document.getElementById("word-div");
const successDiv = document.getElementById("success-div");
const gameOverDiv = document.getElementById("gameOver-div");
var numOfImg = 6;   //the number of images that take part in every stage
var mone = 0;   //count how much images passed the screen
var isClicked = false;   //ia the player clicked on a image
const nextLevText = document.getElementById("nextLevText-span");
const nextLevelDiv = document.getElementById("nextLevel-div");
const stageLabel = document.getElementById("stage-label");


function addRandAttribute(from) {
    var temp = from.map(function (im) {
        var newElement = Object.assign({}, im);
        newElement.randNum = randomNum();
        return newElement;
    });
    return temp;
}

function randomNum() {
    return Math.floor(Math.random() * images.length);
}

function createArr() {

    //A copy to the array with random nums
    // var imgCopy= images.map(function(im){
    //     var newElement = Object.assign({},im);
    //     newElement.randNum=randomNum();
    //     return newElement;
    // });
    imgCopy = addRandAttribute(images);

    var curIm = imgCopy[stage - 1];
    imgCopy.splice(stage - 1, 1); //remove the curIm

    numOfImg = (stage > endLevel2) ? 10 : (stage > endLevel1) ? 8 : 6;

    //creating the collection of images to the stage
    imgCopy.sort((a, b) => a.randNum - b.randNum);
    imgCopy = imgCopy.slice(0, numOfImg - 1);
    imgCopy.push(curIm);
    imgCopy = addRandAttribute(imgCopy);
    imgCopy.sort((a, b) => a.randNum - b.randNum);

    return imgCopy;
}





//A function to "create" the current game and start it
function startClick() {
    mone = 0;
    isClicked = false;
    nextLevelDiv.style.visibility = "hidden"
    startButton.style.visibility = "hidden";
    gameOverDiv.style.visibility = "hidden";
    successDiv.style.visibility = "hidden";
    stageLabel.textContent = "שלב " + stage;


    //Adding the images to the screen
    for (var im of createArr()) {
        var imgSon = document.createElement("img")
        imgSon.setAttribute('src', im.src)
        imgSon.setAttribute('alt', im.name)
        imgSon.addEventListener('click', imgClick);
        imgSon.classList.add("images")
        imagesDiv.appendChild(imgSon)
    }

    moveImages();  //start the images move

    //presenting the word
    wordDiv.innerText = images[stage - 1].name;
    wordDiv.style.visibility = "visible";
}


//A function to perform and control the movement of an image
function moveImg(imgSon) {
    imgSon.style.visibility = "visible";
    let b = setInterval(function () {
        imgSon.style.top = imgSon.offsetTop + 5 + 'px';
        console.log(gameScreen.offsetHeight + gameScreen.offsetTop, imgSon.offsetTop)
        //check if to stop the moving
        if (isClicked == true || imgSon.offsetTop >= gameScreen.offsetHeight) {
            clearInterval(b)
            imgSon.style.visibility = "hidden";
            if (isClicked == false) { mone++; }
            if (mone == numOfImg) { finishGame(false); } //is all the images diappeared
        }
    }, Math.random() * (100) + 25);

}

//Function for the movement of the images
function moveImages() {
    for (var im of imagesDiv.children)
        moveImg(im);
}


//The reaction function to a player's click on an image
function imgClick(event) {
    var curImg = event.target;
    if (curImg.alt == images[stage - 1].name) { finishGame(true); }  //is the player chose the correct image
    else { finishGame(false); }
}


//A function that handles the endgame display
function finishGame(isSuccess) {
    isClicked = true;   //pause the move
    wordDiv.style.visibility = "hidden";
    //remove all the pictures from
    while (imagesDiv.firstChild) {
        imagesDiv.removeChild(imagesDiv.firstChild);
    }

    if (isSuccess == true) { successDiv.style.visibility = "visible"; }
    else { gameOverDiv.style.visibility = "visible"; }

}

//going to the next stage
function nextStage() {

    stage = stage + 1;
    //Checking whether a level has been passed
    if (stage == endLevel1 + 1 || stage == endLevel2 + 1 || stage == endGame + 1) {
        if (stage == endLevel1 + 1) {
            nextLevText.textContent = "כל הכבוד! עברת לשלב 2"
            
        };
        if (stage == endLevel2 + 1) {
            nextLevText.textContent = "כל הכבוד! עברת לשלב 3"
        };
        if (stage == endGame + 1) {
            nextLevText.textContent = "כל הכבוד! סיימת את המשחק בהצלחה"
            butt = document.getElementById("nextLeButton");
            butt.style.visibility = "hidden";
        };
        nextLevelDiv.style.visibility = "visible";
    }
    else { startClick(); }


}
