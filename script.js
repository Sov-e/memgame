const buttonsContainer = document.getElementById("buttons-container");
const startButton = document.getElementById("start-button");
const message = document.getElementById("message");

const sequence = [];
let userSequence = [];
let round = 1;

// Generate a random sequence of 9 button numbers
function generateSequence() {
    sequence.length = 0;
    for (let i = 0; i < 9; i++) {
        sequence.push(Math.floor(Math.random() * 12) + 1);
    }
}

// Show the sequence to the user
async function displaySequence() {
    message.textContent = " ";
    startButton.disabled = true;

    for (const buttonNumber of sequence) {
        const button = document.querySelector(`button[data-number="${buttonNumber}"]`);
        
        // Change the background color for .1 second (100 milliseconds)
        button.style.backgroundColor = "yellow";
        await new Promise(resolve => setTimeout(() => {
            button.style.backgroundColor = ""; // Revert to the original background color
            resolve();
        }, 100));

        await new Promise(resolve => setTimeout(resolve, 200)); // Delay between button changes
    }

    message.textContent = " ";
    startButton.disabled = false;
}


// Check if the user's input matches the sequence
function checkUserInput() {
    if (userSequence.join() === sequence.join()) {
        message.textContent = "Round " + round + " complete!";
        round++;
        setTimeout(() => {
            userSequence.length = 0;
            generateSequence();
            displaySequence();
        }, 1000);
    } else {
        message.textContent = "Game Over! Try Again.";
        startButton.disabled = false;
    }
}

// Initialize the game
startButton.addEventListener("click", () => {
    generateSequence();
    displaySequence();
});

// Create buttons and add data-number attribute
for (let i = 1; i <= 12; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.setAttribute("data-number", i);
    buttonsContainer.appendChild(button);
}

// Handle button clicks
buttonsContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const buttonNumber = parseInt(event.target.getAttribute("data-number"));
        userSequence.push(buttonNumber);

        if (userSequence.length === 9) {
            checkUserInput();
        }
    }
});
