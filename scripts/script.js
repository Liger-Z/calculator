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

function displayNumber() {
  let currentDisplay = document.querySelector("#current");
  if (currentNumber === "0" || currentDisplay.textContent === "\n          0\n        ") {
    currentNumber = this.textContent;
    currentDisplay.textContent = this.textContent;
  }else {
    currentNumber += this.textContent;
    currentDisplay.textContent += this.textContent;
  }
}

function displayOperator() {
  let currentDisplay = document.querySelector("#current");
  console.log(this)
  currentDisplay.textContent += this.textContent;
  numberArray.push(currentNumber);
  numberArray.push(this.value);
  currentNumber = '';
  console.log(numberArray)
}

function numberClick() {
  let currentDisplay = document.querySelector("#current");
  const buttons = document.querySelectorAll(".digit");
  buttons.forEach(button => {button.addEventListener("click", displayNumber)});
}

function operatorClick() {
  let currentDisplay = document.querySelector("#current");
  const buttons = document.querySelectorAll(".operator");
  buttons.forEach(button => {button.addEventListener("click", displayOperator)})
}

let currentNumber = '';
let numberArray = [];

numberClick();
operatorClick();
