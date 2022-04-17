var startButton = document.querySelector("#startButton");
startButton.addEventListener("click", beginGame);
var timeArea = document.querySelector("#time");
var instructions = document.querySelector("#instructions");
var viewHighScoreButton = document.querySelector("#viewHighScoreButton");
var quizContent = document.querySelector("#quizContent");
var clearHighScoresButton = document.querySelector(".clearHighScoresButton");

var stopTimer = false;
let finalScore = 0;
var timer = 0;
var questionsQueue = [];
var currentQuestion = {};
const questionBank = [
  {
    questionNumber: 0,
    question: "What is my favorite movie?",
    answers: ["Napoleon Dynamite", "Big Fish", "In Bruges", "Resident Evil"],
    correctAns: "Napoleon Dynamite",
  },
  {
    questionNumber: 1,
    question: "Who is my favorite dog?",
    answers: ["Grandpa", "Husky", "Gibby & Mila", "All the above"],
    correctAns: "All the above",
  },
  {
    questionNumber: 2,
    question: "What is my favorite hobby?",
    answers: ["Knitting", "Baking", "Crocheting", "Sleeping"],
    correctAns: "Crocheting",
  },
  {
    questionNumber: 3,
    question: "What time do i wake up?",
    answers: ["7 AM", "8 AM", "9 AM", "Noon"],
    correctAns: "7 AM",
  },
  {
    questionNumber: 4,
    question: "What is my favorite cereal?",
    answers: [
      "Crunch Berries",
      "Oops, All Berries!",
      "Golden Grahams",
      "Cinnamon Toast Crunch",
    ],
    correctAns: "Oops, All Berries!",
  },
  {
    questionNumber: 5,
    question: "What time is it?",
    answers: [
      "Time to take a nap",
      "Time to wake up",
      "It's Modelo Time foo",
      "Time to crochet!",
    ],
    correctAns: "It's Modelo Time foo",
  },
];

function beginGame() {
  stopTimer = false;
  finalScore = 0;
  timer = 0;
  questionsQueue = [];
  currentQuestion = {};
  hideButtons();
  setGameTimer();
  for (let question of questionBank) {
    questionsQueue.push(question);
  }
  currentQuestion = questionsQueue[0];
  setGameBoard();
}

function setGameBoard() {
  let answersOfThisQuestion = currentQuestion.answers;
  answersOfThisQuestion = shuffleAnswers(answersOfThisQuestion);
  console.log(answersOfThisQuestion);

  let htmlTemplate = `
    <h2>${currentQuestion.question}</h2>
        <button data-content="${answersOfThisQuestion[0]}" class="answerButton">A. ${answersOfThisQuestion[0]}</button>
        <button data-content="${answersOfThisQuestion[1]}" class="answerButton">B. ${answersOfThisQuestion[1]}</button>
        <button data-content="${answersOfThisQuestion[2]}" class="answerButton">C. ${answersOfThisQuestion[2]}</button>
        <button data-content="${answersOfThisQuestion[3]}" class="answerButton">D. ${answersOfThisQuestion[3]}</button>

    `;
  quizContent.innerHTML = htmlTemplate;
}

quizContent.addEventListener("click", function (event) {
  let element = event.target;
  // Controls/Listens to answerButton when the current question displays
  if (element.matches(".answerButton")) {
    console.log(element.dataset.content);
    // check if user clicks on wrong or right answer
    // if user answers right:
    if (checkAnswer(element.dataset.content)) {
      console.log("You are correct");
    } else {
      console.log("Wrong answer");

      timer = timer - 15;
    }
    showNextQuestion();
  }
  // When the game is over already - The view will display the form that prompts user to input their name
  // This deals with the user form
  if (element.matches(".submitName")) {
    var userName = document.querySelector("#userName").value;
    console.log(userName);
    // Let user userRecord be an array of two values: userName & finalScore
    let userRecord = [userName, finalScore];
    // Checks if there is a "key"/data of "Records" then it will return that data
    // If NOT, it will return an empty array
    // "Records" is a key value, the array is the value
    let localRecords = JSON.parse(localStorage.getItem("Records")) || [];
    // Push the new player into the local Records array
    localRecords.push(userRecord);
    // Store it back into local storage
    localStorage.setItem("Records", JSON.stringify(localRecords));

    displayAllUserHighScores();
  }

  if (element.matches(".goBackButton")) {
    // quizContent.innerHTML = "";
    unhideButtons();
    // Clear the view & unhide buttons
    // Reset all global variables, queue, and questions
    restartEverything();
  }

  if ((element.matches(".clearHighScoresButton"))) {
    localStorage.setItem("Records", JSON.stringify([]));
    quizContent.innerHTML = "";
    startButton.style.display = "block";
    viewHighScoreButton.style.display = "block";

  }
});

// Looks inside the Records key, retrieves player name and scores
function displayAllUserHighScores() {
  let getHighScoresBack = JSON.parse(localStorage.getItem("Records")) || [];
  // compare the score - score is the 2nd value of user array
  // The structure returned is an array within an array
  getHighScoresBack.sort(function (a, b) {
    return b[1] - a[1];
  });
  // Gets array back
  console.log(getHighScoresBack);

  let htmlTemplate = "<h1>High Scores</h1>";
  for (let player of getHighScoresBack) {
    htmlTemplate += `<p>${player[0]} Score ${player[1]}</p>`;
  }
  htmlTemplate += `<button class="goBackButton">Go Back</button>
                  <button class="clearHighScoresButton">Clear High Scores</button>`;
  quizContent.innerHTML = htmlTemplate;
}

function showNextQuestion() {
  if (questionsQueue.length > 1) {
    // Removes the first question from questionsQueue
    questionsQueue.shift();
    console.log(questionsQueue);
    // Pass first element in line to first question
    currentQuestion = questionsQueue[0];
    setGameBoard();
  } else {
    stopTimer = true;
    console.log("Game Over");
    finalScore = timer;
    quizContent.innerHTML = `<h1>Your Score is ${finalScore}</h1> Enter Your Name 
            <label for="userName">Your Name</label><br>
            <input type="text" id="userName" name="userName"><br>
            <button class="submitName" type="submit">Submit</button>
            `;
  }
}

function checkAnswer(userInput) {
  if (userInput == currentQuestion.correctAns) {
    return true;
  } else {
    return false;
  }
}

function shuffleAnswers(anArray) {
  for (let i = anArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    //Swap array i and array j
    [anArray[i], anArray[j]] = [anArray[j], anArray[i]];
  }
  return anArray;
}

function setGameTimer() {
  timer = 75;
  let everySecond = setInterval(function () {
    timer--;
    timeArea.textContent = timer + " seconds left!";
    if (timer === 0 || stopTimer == true) {
      clearInterval(everySecond);
      timeArea.textContent = "Time's Up";
      timer = 0;
      console.log(0);
    }
  }, 1000);
}

function hideButtons() {
  instructions.style.display = "none";
  viewHighScoreButton.style.display = "none";
  startButton.style.display = "none";
}

viewHighScoreButton.addEventListener("click", function () {
  displayAllUserHighScores();
});

function unhideButtons() {
  startButton.style.display = "block";
  viewHighScoreButton.style.display = "block";
}

function restartEverything() {
  stopTimer = false;
  finalScore = 0;
  timer = 0;
  questionsQueue = [];
  currentQuestion = {};
}
