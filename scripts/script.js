function add(x, y) {
  return parseInt(x) + parseInt(y);
}

function subtract(x, y) {
  return parseInt(x) - parseInt(y);
}

function multiply(x, y) {
  return parseInt(x) * parseInt(y);
}

function divide(x, y) {
  return parseInt(x) / parseInt(y);
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
function buttonClick() {
  const numberButtons = document.querySelectorAll(".digit");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalsButton = document.querySelector(".equals");

  numberButtons.forEach(button => {button.addEventListener("click", displayNumber)});
  operatorButtons.forEach(button => {button.addEventListener("click", displayOperator)});
  equalsButton.addEventListener("click", displayResult);
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

function displayResult() {
  let currentDisplay = document.querySelector("#current");
  let resultDisplay = document.querySelector("#result");
  resultDisplay.textContent = currentDisplay.textContent;
  currentDisplay.textContent = calculation();
}

function calculation() {
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

  for (let i = 0; i < numberArray.length; i++) {
    if (numberArray[i] === "add") {
      numberArray.splice(i - 1, 3, operate("add", numberArray[i-1], numberArray[i+1]));
      i -= 2;
    }else if (numberArray[i] === "subtract") {
      numberArray.splice(i - 1, 3, operate("subtract", numberArray[i-1], numberArray[i+1]));
      i -= 2;
    }
  }

  return numberArray[0];
}  


let currentNumber = '';
let numberArray = [];

buttonClick()