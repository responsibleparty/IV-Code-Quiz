// Links HTML startButton to the variable
var startButton = document.querySelector("#startButton"); // Links HTML startButton to the variable
    startButton.addEventListener("click", startGame); // Adds event listener, onclick will call startGame function
var timeElement = document.querySelector("#time");
var instructions = document.querySelector("#instructions");
// Linking quizSection
var quizQuestion = document.querySelector("#quizQuestion");
var quizSection = document.querySelector("#quizSection");
var option1 = document.querySelector(".option1");
var option2 = document.querySelector(".option2");
var option3 = document.querySelector(".option3");
var option4 = document.querySelector(".option4");

// Array of question OBJECTS
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
      correctAns: "Alerts",
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
      correctAns: "Parentheses",
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
      correctAns: "All of the above",
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
      correctAns: "Quotes",
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
      correctAns: "console.log",
    },
  ];

  // Initialize global variables
  let totalScore = 0;
  let arrayIndex=0;
  let secondsLeft = 75;

  function startGame(){
    quizSection.style.display = "block";
    instructions.style.display = "none";
    startButton.style.display = "none";
    setGameTimer();
    populateGameBoard();
  }

  function populateGameBoard(){
      quizQuestion.innerHTML = listOfQuestions[arrayIndex].question;
      option1.innerHTML = listOfQuestions[arrayIndex].answers.a;
      option2.innerHTML = listOfQuestions[arrayIndex].answers.b;
      option3.innerHTML = listOfQuestions[arrayIndex].answers.c;
      option4.innerHTML = listOfQuestions[arrayIndex].answers.d;

      return questionNumber;
  }

  option1.addEventListener("click", showNextQuestion);
  option2.addEventListener("click", showNextQuestion);
  option3.addEventListener("click", showNextQuestion);
  option4.addEventListener("click", showNextQuestion);

  // Updates the arrayIndex
  function showNextQuestion(){
      let usersPick = this.textContent // Retrieves the letter picked by the user
      if (usersPick === listOfQuestions[arrayIndex].correctAns){
          currentScore = secondsLeft;
      } else{
          secondsLeft = secondsLeft - 15;
          currentScore = secondsLeft;
      }
      arrayIndex++;
      populateGameBoard()
  }

  function setGameTimer(){
      let timeInterval = setInterval(function(){
          secondsLeft--;
          timeElement.textContent = secondsLeft + " seconds left!";
          if (secondsLeft === 0){
              // Stops execution of action at set interval
              clearInterval(timeInterval);
          }
      }, 1000);
  }