const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// Function to asynchronously ask a question and receive user input
function ask(questionText) {
return new Promise((resolve, reject) => {
rl.question(questionText, resolve);
});
}

// Function to calculate the guess number based on the current range
function guessNumber(min, max) {
return Math.floor((min + max) / 2);
}

// Start the game
start();

async function start() {
let playAgain = true;

// Loop to play the game multiple times
while (playAgain) {
let minGuess = 1;
let maxGuess = 100;

let startGame = await ask("Are you ready to play the game? ");
console.log(startGame);

if ("Y" === startGame) {
  console.log("User Said Yes!");
// Here is a greeting command 
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  let currentGuess = guessNumber(minGuess, maxGuess);

  // Loop for the guessing process
  while (true) {
    console.log('You entered: ' + secretNumber);
    console.log(`Is your number ${currentGuess}? type Y/N`);
    let yn = await ask("> ");
    console.log(yn);

    if (yn === "N") {
      let hl = await ask(`Is it Higher(H) or Lower(L)? `);

      // I tried to create cheat detector but it didn't work
      //if (currentGuess <= minGuess) {
        //console.log(`You cheated! You said it was lower than ${currentGuess}, so it can't also be higher than ${currentGuess - 1}!`);
      //}

      // Adjust the guess range based on the human player's response
      if (hl === "H") {
        console.log("Hit H");
        minGuess = currentGuess;
        console.log(`The guess range is now ${minGuess}, ${maxGuess}!`);
        currentGuess = guessNumber(minGuess, maxGuess);

        // I tried to create cheat detector here as well but it didn't work
        // if (currentGuess >= maxGuess) {
        //   console.log(`You cheated! You said it was higher than ${currentGuess}, so it can't also be lower than ${currentGuess + 1}!`);
        // }
      } else if (hl === "L") {
        console.log("Hit L");
        maxGuess = currentGuess;
        console.log(`The guess range is now ${minGuess}, ${maxGuess}!`);
        currentGuess = guessNumber(minGuess, maxGuess);
      } else {
        console.log("Please type H or L");
      }
    } else if (yn === "Y") {
      console.log(`Congratulations, your number is ${currentGuess}!`);
      break; // Exit the inner guessing loop and continue with the playAgain loop
    } else {
      console.log("Please enter Y or N");
    }
  }
} else if ("N" === startGame) {
  console.log("No");
} else {
  console.log("Type Y or N");
}
// Here Computer asks if you want to play again or not
let playAgainResponse = await ask("Do you want to play again? (Y/N) ");
playAgain = playAgainResponse.toUpperCase() === "Y";
}

console.log("Goodbye!");
rl.close();
}
