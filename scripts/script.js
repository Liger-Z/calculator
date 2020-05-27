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
  if (currentNumber === '') {
    return null;
  }else {
  let currentDisplay = document.querySelector("#current");
  currentDisplay.textContent += this.textContent;
  numberArray.push(currentNumber);
  numberArray.push(this.value);
  currentNumber = '';
  console.log(numberArray)
  }
}

function buttonClick() {
  const numberButtons = document.querySelectorAll(".digit");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalsButton = document.querySelector(".equals");

  numberButtons.forEach(button => {button.addEventListener("click", displayNumber)});
  operatorButtons.forEach(button => {button.addEventListener("click", displayOperator)});
  equalsButton.addEventListener("click", calculation);
}

function calculation() {
  let calcArray = [];
  numberArray.push(currentNumber);

  for (let i = 0; i < numberArray.length; i++) {
    if (numberArray[i] === "multiply") {
      numberArray.splice(i - 1, 3, operate("multiply", numberArray[i-1], numberArray[i+1]));
      i -= 2;
    }else if (numberArray[i] === "divide") {
      numberArray.splice(i - 1, 3, operate("divide", numberArray[i-1], numberArray[i+1]));
      i -= 2;
    }
  }
  console.log(numberArray)
}  


let currentNumber = '';
let numberArray = [];

buttonClick()