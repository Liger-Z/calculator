function add(x, y) {
  return parseFloat(x) + parseFloat(y);
}

function subtract(x, y) {
  return parseFloat(x) - parseFloat(y);
}

function multiply(x, y) {
  return parseFloat(x) * parseFloat(y);
}

function divide(x, y) {
  if (y == 0) {
    zeroDivide = true;
  }
  return parseFloat(x) / parseFloat(y);
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
  let decimalButton = document.querySelector("#decimal");
  if (equalsPressed === true) { 
    allClear();
    currentNumber = this.textContent;
    currentDisplay.textContent = this.textContent;
    equalsPressed = false;
  }else if (currentNumber === "0" || currentDisplay.textContent === "\n          0\n        ") {
    currentNumber = this.textContent;
    currentDisplay.textContent = this.textContent;
  }else {
    currentNumber += this.textContent;
    currentDisplay.textContent += this.textContent;
  }

  if (this.textContent === ".") {
    decimalButton.removeEventListener("click", displayNumber);
  }
}

function displayOperator() {
  if (currentNumber === "") { // This stops the user from inputting two operators in a row
    return null;
  }else {
  let currentDisplay = document.querySelector("#current");
  let decimalButton = document.querySelector("#decimal");
  currentDisplay.textContent += this.textContent;
  numberArray.push(currentNumber);
  numberArray.push(this.value);
  currentNumber = '';
  equalsPressed = false;
  decimalButton.addEventListener("click", displayNumber);
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
    equalsPressed = true;

    if (zeroDivide === true) {
      divideByZero();
    }else {
      currentNumber = numberArray[0];
      numberArray = [];
    }
  }
}

function allClear() {
  let currentDisplay = document.querySelector("#current");
  let previousDisplay = document.querySelector("#previous");
  let decimalButton = document.querySelector("#decimal");

  currentNumber = "0";
  numberArray = [];
  currentDisplay.textContent = "0";
  previousDisplay.textContent = "0";
  zeroDivide = false;
  decimalButton.addEventListener("click", displayNumber)
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

  return Math.round((numberArray[0] * 1000000000)) / 1000000000;
}  

function divideByZero() {
  let currentDisplay = document.querySelector("#current");
  let previousDisplay = document.querySelector("#previous");
  previousDisplay.textContent = "0̶̤͕̩̫̫͈̣̄̈́̿̌̕0̵͎͈̅0̸̙̅̓̈́̄0̵̪̲̙̞̓̑̃̽0̴͖̲̱̳̰́͑̒̆͠͝0̷̥̈̍̒̈́͐͒0̴̦̹̹̃̉̃0̶̢͈̺͍̲́̓͑̓̇̈́̕0̸͚̆͆̈́̈̌̄̈ͅ0̸̢̦̰̠͓̥̞͋0̵͙͕̠͙̲̖̜̈́̋̈́̋̏ͅ0̴͓̣̇̏̅0̴̧͔̬͕̥͇̀̍͛͐̉̓́̌0̸̗͛̏̀̄͝0̴̝͓̲͓͔̻͙̣͆0̶̥̞̩̼̰̒͑́͋̉̃̓̓0̷̺̪̞͍͔̰̈́̄́0̸̦̲͔͒̆͂̏̓̕0̶̨̜͕͖̘̹͉̿́͌̉0̸͖̆0̴̮̬͇̈́̃͊";
  currentDisplay.textContent = "E̷̙͋ͅŕ̶̞͙͐r̸̫̎̍͜o̸͖͍̠͆r̸͉͈͙̝̯̫̠̍̈";
}

let currentNumber = "";
let numberArray = [];
let equalsPressed = false;
let zeroDivide = false;
buttonClick()