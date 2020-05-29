/*
Process of this script:
Inputs will be stored in numberArray. Number inputs will concatenate the currentNumber
string, and will only be stored in numberArray when an operator button has been pressed.
Pressing equals will store the currentNumber into the array, and then the calculation
will begin.
*/

function operate(operator, x, y) {
  switch (operator) {
    case "add":
      return parseFloat(x) + parseFloat(y);
      break;
    case "subtract":
      return parseFloat(x) - parseFloat(y);
      break;
    case "multiply":
      return parseFloat(x) * parseFloat(y);
      break;
    case "divide":
      if (y == 0) {
        zeroDivide = true;
      }
      return parseFloat(x) / parseFloat(y);
      break;
  }
}
function buttonClick() {
  const numberButtons = document.querySelectorAll(".digit");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalsButton = document.querySelector(".equals");
  const allClearButton = document.querySelector("#allclear");
  const deleteButton = document.querySelector("#delete");

  numberButtons.forEach(button => {button.addEventListener("click", displayNumber)});
  operatorButtons.forEach(button => {button.addEventListener("click", displayOperator)});
  equalsButton.addEventListener("click", displayResult);
  allClearButton.addEventListener("click", allClear);
  deleteButton.addEventListener("click", deleteEntry);
  document.addEventListener("keydown", keyPress);
}
/*
  Pressing a number button directly after pressing the equals button should 
  start a brand new calculation. Thus an all clear should be peformed before 
  starting a new number.

  num: Used to determine if input comes from a key press or pushing the onscreen button.
*/
function displayNumber(num) {
  let currentDisplay = document.querySelector("#current");
  let decimalButton = document.querySelector("#decimal");
  
  if (equalsPressed === true) { 
    allClear();
    if (num.type == "click") {
      currentNumber = this.textContent;
      currentDisplay.textContent = this.textContent;
    }else {
      currentNumber = num;
      currentDisplay.textContent = num;
    }
    equalsPressed = false;
  }else if (currentDisplay.textContent === "0" || currentDisplay.textContent === "\n          0\n        ") {
    if (num.type == "click") {
      currentNumber = this.textContent;
      currentDisplay.textContent = this.textContent;
    }else {
      currentNumber = num;
      currentDisplay.textContent = num;
    }
  }else {
    if (num.type == "click") {
      currentNumber += this.textContent;
      currentDisplay.textContent += this.textContent;
    }else {
      currentNumber += num;
      currentDisplay.textContent += num;
    }
  }

  if (this.textContent === ".") {
    decimalButton.removeEventListener("click", displayNumber);
  }
}

function displayOperator(operator, operation) {
  console.log(operator)
  if (currentNumber === "") { // This stops the user from inputting two operators in a row
    return null;
  }else {
    let currentDisplay = document.querySelector("#current");
    let decimalButton = document.querySelector("#decimal");

    if (operator.type == "click") {
      currentDisplay.textContent += this.textContent;
      numberArray.push(currentNumber);
      numberArray.push(this.value);
    }else {
      currentDisplay.textContent += operator;
      numberArray.push(currentNumber);
      numberArray.push(operation);
    }

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

function allClear() { //reset everything to default state
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

function deleteEntry() {
  let currentDisplay = document.querySelector("#current");
  numberText = currentDisplay.textContent;
  currentDisplay.textContent = numberText.slice(0, numberText.length - 1);

  if (numberText[numberText.length - 1] in operatorObj) { // array entries need to be removed if an operator is deleted
    currentNumber = numberArray[numberArray.length - 2]; // reobtain number from before operator was pressed
    numberArray.splice(numberArray.length - 2, 2);
  }else {
    currentNumber = currentNumber.slice(0, currentNumber.length - 1);
  }
}

/*
Iterates over array checking for multiply and divide operators. When one is found
the two adjacent numbers are operated on and then removed from the array (as well
as the operator itself). The number returned from operate() is inserted in place
of the removed numbers. The process is repeated with the add and subtract operators
resulting in one number remaining in the array, which is then returned (with rounding).
*/
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

function keyPress(e) {
  switch (e.which) {
    case 48:
      displayNumber("0")
      break;
    case 49:
      displayNumber("1");
      break;
    case 50:
      displayNumber("2");
      break;
    case 51:
      displayNumber("3");
      break;
    case 52:
      displayNumber("4");
      break;
    case 53:
      displayNumber("5");
      break;
    case 54:
      displayNumber("6");
      break;
    case 55:
      displayNumber("7");
      break;
    case 56:
      if (e.shiftKey === true) {
        displayOperator("×", "multiply")
      }else{
        displayNumber("8");
      }
      break;
    case 57:
      displayNumber("9");
      break;
    case 61:
      if (e.shiftKey === true) {
        displayOperator("+", "add");
      }
      break;
    case 173:
      displayOperator("-", "subtract");
      break;
    case 191:
      displayOperator("÷", "divide");
      break;
    case 13:
      displayResult();
      break;
    case 8:
      if (e.shiftKey === true) {
        allClear();
      }else{
        deleteEntry();
      }
      break;
  }
}

let currentNumber = "";
let numberArray = [];
let equalsPressed = false;
let zeroDivide = false;
let operatorObj = {
  "-": null,
  "+": null,
  "&times": null,
  "&divide": null
}
buttonClick()