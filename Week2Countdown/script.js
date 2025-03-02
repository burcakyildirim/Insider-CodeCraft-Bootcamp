const secondsInput = document.getElementById("seconds-input");
const secondsDisplay = document.getElementById("seconds-display");

let interval;

const start = () => {
  let count = parseInt(secondsInput.value);

  if (isNaN(count) || count <= 0) {
    alert("Lütfen geçerli bir süre girin!");
    return;
  }

  clearInterval(interval);
  secondsDisplay.textContent = count;

  interval = setInterval(() => {
    count--;
    if (count >= 0) {
      secondsDisplay.textContent = count;
    }
    if (count === 0) {
      clearInterval(interval);
      setTimeout(() => alert("Süre Doldu!"), 500);
    }
  }, 1000);
};

const reset = () => {
  clearInterval(interval);
  secondsDisplay.textContent = "Geri Sayım Başlıyor";
  secondsInput.value = "";
};