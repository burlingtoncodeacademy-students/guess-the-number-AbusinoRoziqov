const readline = require('readline');

// Function to generate a random number within a range
function randomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check if the user's guess is valid
function isValidGuess(guess) {
return Boolean(guess) && guess >= 1 && guess <= 100;
}

// Function to start the game
function startGame() {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
// Here is a greeting command 
console.log('The Number Guessing Game is here; welcome! where I (the computer) would generate a number and you (the human) would attempt to guess it ');
askGuess();

const secretNumber = randomNumber(1, 100);
let attempts = 0;

// Function where the game actually starts starting with asking questions
function askGuess() {
rl.question('Guess a number between 1 and 100: ', (guess) => {
guess = parseInt(guess);

if (!isValidGuess(guess)) {
    console.log('Invalid guess. Please enter a number between 1 and 100.');
    askGuess();
    return;
}

attempts++;
// Here is the end of the game where computer asks if you want to play again
if (guess === secretNumber) {
    console.log(`Congratulations! You guessed the secret number ${secretNumber} in ${attempts} attempts.`);
    rl.question('Play it again? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            startGame(); // Restart the game
        } else {
            console.log("Goodbye!");
            rl.close(); // Exit the program
        }
    });
} else if (guess < secretNumber) {
    console.log('Too low! Try guessing higher.');
    askGuess();
} else {
    console.log('Too high! Try guessing lower.');
    askGuess();
}
});
}
}

// Start the game
startGame();
