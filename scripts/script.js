function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  switch (operator) {
    case "add":
      return add(x, y);
      break;
    case "subtract":
      return subtract(x, y);
      break;
    case "multiply":
      return multiply(x, y);
      break;
    case "divide":
      return divide(x, y);
      break;
  }
}

function displayNumber(button) {
  let currentDisplay = document.querySelector("current");
  if (currentDisplay.textContent === "0") {
    currentDisplay.textContent = button.value;
  }
}

function numberClick() {
  const buttons = document.querySelectorAll(".digit");
  console.log(buttons);
  buttons.forEach(button => {button.addEventListener("click", displayNumber)});
}

numberClick();