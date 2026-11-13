
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const guessedNumbers = document.getElementById("guessed-numbers");
const guessCount = document.getElementById("guess-count");
const resultMessage = document.getElementById("result-message");

// Generate a random number between 1 and 15
let randomNumber = Math.floor(Math.random() * 15) + 1;

let guesses = [];
let gameOver = false;

// Check the user's guess
function checkGuess() {
    if (gameOver) {
        return;
    }

    const guess = Number(guessInput.value);

    // Validate the input
    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 15
    ) {
        resultMessage.textContent =
            "Please enter a whole number between 1 and 15!";
        resultMessage.classList.remove("win");
        return;
    }

    // Prevent duplicate guesses
    if (guesses.includes(guess)) {
        resultMessage.textContent = "You already guessed this number!";
        return;
    }

    // Save the guess
    guesses.push(guess);

    guessedNumbers.textContent = guesses.join(", ");
    guessCount.textContent = guesses.length;

    // Check the result
    if (guess === randomNumber) {
        resultMessage.textContent =
            "🎉 Congratulations! Your guess is correct!";
        resultMessage.classList.add("win");

        gameOver = true;
        guessBtn.textContent = "PLAY AGAIN";
    } else if (guess > randomNumber) {
        resultMessage.textContent = "Your guess is too high. 😯";
        resultMessage.classList.remove("win");
    } else {
        resultMessage.textContent = "Your guess is too low. 😯";
        resultMessage.classList.remove("win");
    }

    // Clear the input for the next guess
    if (!gameOver) {
        guessInput.value = "";
        guessInput.focus();
    }
}

// Start a new game
function resetGame() {
    randomNumber = Math.floor(Math.random() * 15) + 1;

    guesses = [];
    gameOver = false;

    guessInput.value = "";
    guessedNumbers.textContent = "";
    guessCount.textContent = "0";

    resultMessage.textContent = "Enter a number to start!";
    resultMessage.classList.remove("win");

    guessBtn.textContent = "GUESS";
    guessInput.focus();
}

// Button click event
guessBtn.addEventListener("click", function () {
    if (gameOver) {
        resetGame();
    } else {
        checkGuess();
    }
});

// Allow Enter key to submit a guess
guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        guessBtn.click();
    }
});
