const secondsInput = document.getElementById("seconds-input");
const startButton = document.querySelector(".start-btn");
const resetButton = document.querySelector(".reset-btn");
const secondsDisplay = document.getElementById("seconds-display");

let interval;

const start = () => {
    let count = parseInt(secondsInput.value);

    secondsDisplay.textContent = count;
    clearInterval(interval);

    interval = setInterval(() => {
        if (count <= 1) { 
            clearInterval(interval);
            alert("Süre Doldu!");
        } else {
            count--;
            secondsDisplay.textContent = count;
        }
    }, 1000);
}

const reset = () => {
    clearInterval(interval);
    secondsDisplay.textContent = 0;
    secondsInput.value = 0;
}