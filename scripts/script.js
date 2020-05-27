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
  const allClearButton = document.querySelector("#allclear");

  numberButtons.forEach(button => {button.addEventListener("click", displayNumber)});
  operatorButtons.forEach(button => {button.addEventListener("click", displayOperator)});
  equalsButton.addEventListener("click", displayResult);
  allClearButton.addEventListener("click", allClear);
}
/*
  Pressing a number button directly after pressing the equals button should 
  start a brand new calculation. Thus an all clear should be peformed before 
  starting a new number.
*/
function displayNumber() {
  let currentDisplay = document.querySelector("#current");
  if (currentNumber === "0" || currentDisplay.textContent === "\n          0\n        ") {
    currentNumber = this.textContent;
    currentDisplay.textContent = this.textContent;
  }else if (equalsPressed === true) { 
    allClear();
    currentNumber = this.textContent;
    currentDisplay.textContent = this.textContent;
    equalsPressed = false;
  }else {
    currentNumber += this.textContent;
    currentDisplay.textContent += this.textContent;
  }
}

function displayOperator() {
  if (currentNumber === "") { // This stops the user from inputting two operators in a row
    return null;
  }else {
  let currentDisplay = document.querySelector("#current");
  currentDisplay.textContent += this.textContent;
  numberArray.push(currentNumber);
  numberArray.push(this.value);
  currentNumber = '';
  }
}

function displayResult() {
  if (currentNumber === "") { // If the last button pressed was not a number, this function will not run
    return null;
  }else{
    let currentDisplay = document.querySelector("#current");
    let previousDisplay = document.querySelector("#previous");
    previousDisplay.textContent = currentDisplay.textContent;
    currentDisplay.textContent = calculation();
    currentNumber = numberArray[0];
    numberArray = [];
    equalsPressed = true;
  }
}

function allClear() {
  let currentDisplay = document.querySelector("#current");
  let previousDisplay = document.querySelector("#previous");

  currentNumber = "0";
  numberArray = [];
  currentDisplay.textContent = "0";
  previousDisplay.textContent = "0";
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


let currentNumber = "";
let numberArray = [];
let equalsPressed = false;
buttonClick()