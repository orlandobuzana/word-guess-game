//creating and storing words
var words =[
    "javascript",
    "monkey",
    "pancake"
];
var word = words[Math.floor(Math.random()*words.length)];

//creating the storage for the random word
var answerArray = [];
for(var i = 0;i<word.length; i++){
    answerArray[i]="_";

}
var remainingLetters = word.length; //storing the remaining letters

//game loop
while(remainingLetters >0){
    // Game code goes here
     alert(answerArray.join(" "))// Show the player their progress
     // Take input from the player
     var guess = prompt("Guess a letter, or click Cancel to stop playing.");
     if(guess === null){
         break;
     }else if (guess.length !== 1){
         alert("Please enter a single letter. ");

     }else {

         //update game state with the guess
         for (var j = 0; j < word.length; j++){
             if (word[j] === guess){
                 answerArray[j] = guess;
                 remainingLetters--;
             }

         }
     }
     // The end of the game loop
     
}
// Show the answer and congratulate the player
alert(answerArray.join(" "));
alert("Good job! The answer was " + word);