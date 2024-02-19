//js code for the learning hebrew game

//an array contains the images and the word that in use in the game
var images = [

    { name: "תפוח", src: "/img/apple.png" },
    { name: "כלב", src: "/img/dog.jpg" },
    { name: "בית", src: "/img/house.jpg" },
    { name: "כדור", src: "/img/ball.jpg" },
    { name: "כובע", src: "/img/hat.jpg" },

    { name: "חיפושית", src: "/img/hipushit.jpg" },
    { name: "קונכיה", src: "/img/kunchia.jpg" },
    { name: "תרוד", src: "/img/tarvad.jpeg" },
    { name: "להבה", src: "/img/lehava.jpg" },
    { name: "מכחול", src: "/img/mikchol.jpg" },

    { name: "אגרטל", src: "/img/agartal.jpg" },
    { name: "מנוף", src: "/img/manof.png" },
    { name: "יעה", src: "/img/yae.jpg" },
    { name: "סייח", src: "/img/syach.jpg" },
    { name: "קלחת", src: "/img/kalahat.jpg" }
]



//elements from the window
const gameScreen = document.getElementById("gameScreen");
const imagesDiv = document.getElementById("images-div");
const startButton = document.getElementById("start-button");
const wordDiv = document.getElementById("word-div");
const successDiv = document.getElementById("success-div");
const gameOverDiv = document.getElementById("gameOver-div");
const nextLevText = document.getElementById("nextLevText-span");
const nextLevelDiv = document.getElementById("nextLevel-div");
const stageLabel = document.getElementById("stage-label");
const levelLabel = document.getElementById("player-level");
const pointsLabel = document.getElementById("player-points");
const userNamePlace=document.getElementById("player-name");
const rate=document.getElementById("player-rate");

var currentUser=JSON.parse(localStorage.getItem('currentUser'));  //the current user object

//variables for the game
const endLevel1 = 5;
const endLevel2 = 10;
const endGame = 15;
var numOfImg = 6;   //the number of images that take part in every stage
var mone = 0;   //count how much images passed the screen
var isClicked = false;   //ia the player clicked on a image
var userScore=currentUser.hebrewScore;
var stage=currentUser.hebrewLevel;
var level=(stage > endLevel2) ? 3 : (stage > endLevel1) ? 2 : 1;   //the current stage of the player
const userName=currentUser.firstName+" "+currentUser.lastName;

//intialize labels
userNamePlace.textContent=userName;
levelLabel.textContent="רמה "+level;
stageLabel.textContent="שלב "+stage;
pointsLabel.textContent=userScore;
// rate.textContent=calcRate();

//if the user end the game in the past
if (stage == endGame + 1) {
    nextLevText.textContent = "כל הכבוד! סיימת את המשחק בהצלחה"
    nextLevelDiv.style.visibility = "visible";
    butt = document.getElementById("nextLeButton");
    butt.style.visibility = "hidden";
    startButton.style.visibility="hidden";
};

//creating an array of images for the current stage
function createArr() {

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

//functions for random numbers to mix the pictures
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



//A function to "create" the current game and start it
function startClick() {


    mone = 0;
    isClicked = false;
    nextLevelDiv.style.visibility = "hidden"
    startButton.style.visibility = "hidden";
    gameOverDiv.style.visibility = "hidden";
    successDiv.style.visibility = "hidden";
    stageLabel.textContent = "שלב " + stage;
    level=(stage > endLevel2) ? 3 : (stage > endLevel1) ? 2 : 1;   //the current stage of the player
    levelLabel.textContent="רמה "+level;
    pointsLabel.textContent=currentUser.hebrewScore+" נקודות"
    wordDiv.visibility="visible";
    level=(stage > endLevel2) ? 3 : (stage > endLevel1) ? 2 : 1;   //the current stage of the player


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

    if (isSuccess == true) {
        // update the users' points
        pointsToAdd=(stage > endLevel2) ? 7 : (stage > endLevel1) ? 4 : 2;
        currentUser.hebrewScore+=pointsToAdd;
        stage = stage + 1;
        currentUser.hebrewLevel=stage;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        var users = JSON.parse(localStorage.getItem('users'));
        users[currentUser.index]=currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        
        successDiv.style.visibility = "visible"; }
    else { gameOverDiv.style.visibility = "visible"; }

}

//going to the next stage
function nextStage() {

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
        playSound("../sound/trumpet.mpeg", 4); 
    }
    else { startClick(); }
}

//function to play the sound in a new level
function playSound(soundF, time) {
    const audio = new Audio(soundF);
    audio.play();
  
    // Stop audio after the time
    setTimeout(() => {
      audio.pause();
    }, duration * 1000);
  }