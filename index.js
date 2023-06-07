const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
return new Promise((resolve, reject) => {
  rl.question(questionText, resolve);
});
}
//  Global variables 

function guessNumber(min, max) {
return Math.floor((min + max) / 2)
}
// console.log (guessNumber (1, 100))

start();

async function start() {

let minGuess = 1;
let maxGuess = 100;

let startGame = await ask("Are you ready to play the game?")
console.log(startGame)
if ("Y" === startGame) {
  console.log("User Said Yes!")
  
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  let currentGuess = guessNumber(minGuess, maxGuess)
  while (true) {

  console.log('You entered: ' + secretNumber);
  console.log(`Is your number ${currentGuess}?`)
  let yn = await ask(">")
  console.log(yn)
  if (yn === "N") {
    let hl = await ask(`Is it Higher(H) or Lower(L)?`) 
    if (currentGuess <= minGuess) {
      console.log(`You cheated! You said it was lower than ${currentGuess}, so it can't also be higher than ${currentGuess - 1}!`);
    }
    
    // Check if user guess is higher or lower then the current guess range 
    // If the user says higher than max guess they are cheating and other way 
    
    if (hl === "H") {
      console.log("Hit H")
      minGuess = currentGuess
      console.log (`The guess range is now ${minGuess}, ${maxGuess}!`)
      currentGuess = guessNumber (minGuess, maxGuess)
      if (currentGuess >= maxGuess) {
        console.log(`You cheated! You said it was higher than ${currentGuess}, so it can't also be lower than ${currentGuess + 1}!`);
      }

    } else if (hl === "L") {
      console.log("Hit L")
      maxGuess = currentGuess

      console.log (`The guess range is now ${minGuess}, ${maxGuess}!`)
      currentGuess = guessNumber (minGuess, maxGuess)

    } else {
      console.log("Please type H or L")
    }

  } else if (yn === "Y") {
    console.log(`Congratulations your number is ${currentGuess}!`)
    process.exit();
  } else {
    console.log("Please enter Y or N")
  }
}



} else if ("N" === startGame) {
  console.log("No")
} else {
  console.log("Type Y or N ")
}
}

// Now try and complete the program.