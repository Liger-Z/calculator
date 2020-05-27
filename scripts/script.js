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
  calcArray = [];
  numberArray.push(currentNumber);
  
   for (let i = 0; i < numberArray.length; i++) {
     if (numberArray[i] === "multiply") {
       calcArray.splice(i - 1, 1);
      calcArray.push(operate("multiply", numberArray[i-1], numberArray[i+1]));
       i += 1;
     }else {
      calcArray.push(numberArray[i]);
     }
   }

  numberArray = calcArray.slice();
  calcArray = [];
   for (let i = 0; i < numberArray.length; i++) {
    if (numberArray[i] === "divide") {
      calcArray.splice(i - 1, 1);
      calcArray.push(operate("divide", numberArray[i-1], numberArray[i+1]));
      i += 1;
    }else {
      calcArray.push(numberArray[i]);
    }
  }

  console.log(calcArray);
}  


let currentNumber = '';
let numberArray = [];
let calcArray = [null, null, null, null];

buttonClick()