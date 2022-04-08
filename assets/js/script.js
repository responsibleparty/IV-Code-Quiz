// The array listOfQuestions is comprised of question objects
const listOfQuestions = [
  {
    questionNumber: 0,
    question: "Commonly used data types DO NOT include:",
    answers: {
      a: "Strings",
      b: "Booleans",
      c: "Alerts",
      d: "Numbers",
    },
    correctAns: "c",
  },
  {
    questionNumber: 1,
    question: "The condition in an if/else statement is enclosed within_____.",
    answers: {
      a: "Quotes",
      b: "Curly Brackets",
      c: "Parentheses",
      d: "Square Brackets",
    },
    correctAns: "c",
  },
  {
    questionNumber: 2,
    question: "Arrays in JavaScript can be used to store:",
    answers: {
      a: "Numbers & Strings",
      b: "Other Arrays",
      c: "Booleans",
      d: "All of the above",
    },
    correctAns: "d",
  },
  {
    questionNumber: 3,
    question:
      "String values must be enclosed within _____ when being assigned into variables.",
    answers: {
      a: "Commas",
      b: "Curly Brackets",
      c: "Quotes",
      d: "Parentheses",
    },
    correctAns: "c",
  },
  {
    questionNumber: 4,
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
      a: "JavaScript",
      b: "Terminal/Bash",
      c: "For Loops",
      d: "console.log",
    },
    correctAns: "d",
  },
];

// Will this return any values?
const startButton = document.querySelector("#start");
startButton.addEventListener("click", beginGame, setGameTimer);
const displayQuestion = document.querySelector("#quizQuestion");
const timeElement = document.querySelector("#time");

function beginGame(listOfQuestions) {
  startButton.classList.add("hide");
  setGameTimer();
  populateGameQuestions();
  displayQuestion.textContent = 
  console.log(displayQuestion);
} 

function generateRandomIndex(randomNumber){
    return Math.floor(Math.random() * randomNumber);
}

function populateGameQuestions() {}

// This function sets the initial time for the game
var secondsLeft = 75;
function setGameTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeElement.textContent = secondsLeft + " seconds left.";

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    }
  }, 1000);
}

/*  WHEN USER CLICKS ON AN ANSWER
        1. Add or subtract score
        2. Add or subtract time
        3. Show the next card */
// Populate the question and answers
// Subtract time if answer is wrong
// Calculate score
