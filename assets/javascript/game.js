// props to @natewiley for advice on how and when to use const and !resetgame flags
//google fonts, amazon sounds 
var selectableWords =           // Word list
    [
        "csharp",
        "cplusplus",
        "rubyonrails",
        "python",
        "javascript",
        "ansic",
        "cobol",
        "fortran",
        "visualbasic",
        "compiler",
        "algorithm",
    ];

const maxTries = 10;            // Maximum number of tries player has plus asigning a const value
// maxtries needs to remain 10
var winSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3") //Audio from amazon 
var loseSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3");
var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up

// Reset our game-level variables
function resetGame() {
  remainingGuesses = maxTries;
  gameStarted = false;

  // Use Math.floor to round the random number down to the nearest whole.
  currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

  // Clear out arrays
  guessedLetters = [];
  guessingWord = [];

  // Make sure the hangman image is cleared
  // to be done
  //document.getElementById("hangmanImage").src = "";

  // Build the guessing word and clear it out
  for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
      guessingWord.push("_");
  }
  // Hide game over and win images/text
  document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
  document.getElementById("pressKeyTryAgain").style.opacity ="opacity 1.0s linear 0s";
  document.getElementById("pressKeyTryAgain").style.opacity = 0;
  document.getElementById("gameover-image").style.cssText = "display: none";
  document.getElementById("youwin-image").style.cssText = "display: none";

  // Show display
  updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = "";
  for (var i = 0; i < guessingWord.length; i++) {
      document.getElementById("currentWord").innerText += guessingWord[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = guessedLetters;
  document.getElementById("guessedLetters").style.cssText = "background: yellow";
  
  if(remainingGuesses <= 0) {
      document.getElementById("gameover-image").style.cssText = "display: block";
      document.getElementById("gameover-image").innerHTML = "You Lost! the word was "+ selectableWords[currentWordIndex];
      document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
      document.getElementById("pressKeyTryAgain").style.opacity ="opacity 3.0s linear 0s";
      document.getElementById("pressKeyTryAgain").style.opacity = 1;
      loseSound.play();
      hasFinished = true;
  }
};
// Updates the image depending on how many guesses
/*
function updateHangmanImage() {
  document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
};
*/
document.onkeydown = function(event) {
  // If we finished a game, dump one keystroke and reset.
  if(hasFinished) {
      resetGame();
      hasFinished = false;
  } else {
      // Check to make sure a-z was pressed.
      //best way vs creating a array of possible keys alphbet
      if(event.keyCode >= 65 && event.keyCode <= 90) {
          makeGuess(event.key.toLowerCase());
      }
  }
};
function makeGuess(letter) {
  if (remainingGuesses > 0) {
      if (!gameStarted) {
          gameStarted = true;
      }

      // Make sure we didn't use this letter yet
      if (guessedLetters.indexOf(letter) === -1) {
          guessedLetters.push(letter);
          evaluateGuess(letter);
      }
  }
  
  updateDisplay();
  checkWin();
};
// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
  // Array to store positions of letters in string
  var positions = [];

  // Loop through word finding all instances of guessed letter, store the indicies in an array.
  for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
      if(selectableWords[currentWordIndex][i] === letter) {
          positions.push(i);
      }
  }

  // if there are no indicies, remove a guess and update the hangman image
  if (positions.length <= 0) {
      remainingGuesses--;
      //updateHangmanImage();
  } else {
      // Loop through all the indicies and replace the '_' with a letter.
      for(var i = 0; i < positions.length; i++) {
          guessingWord[positions[i]] = letter;
      }
  }
};
function checkWin() {
  if(guessingWord.indexOf("_") === -1) {
      document.getElementById("youwin-image").style.cssText = "display: block";
      
      document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
      winSound.play();
      wins++;
      hasFinished = true;
  }
};