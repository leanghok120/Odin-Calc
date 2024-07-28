const periodBtn = document.getElementById("period");
const clearBtn = document.getElementById("clear");
const addBtn = document.getElementById("add");
const equalsBtn = document.getElementById("equals");
const sevenBtn = document.getElementById("seven");
const eightBtn = document.getElementById("eight");
const nineBtn = document.getElementById("nine");
const divideBtn = document.getElementById("divide");
const fourBtn = document.getElementById("four");
const fiveBtn = document.getElementById("five");
const sixBtn = document.getElementById("six");
const multiplyBtn = document.getElementById("multiply");
const oneBtn = document.getElementById("one");
const twoBtn = document.getElementById("two");
const threeBtn = document.getElementById("three");
const subtractBtn = document.getElementById("subtract");
const zeroBtn = document.getElementById("zero");

const buttons = document.querySelectorAll("button");

const displayTop = document.querySelector(".screen .top");
const displayBottom = document.querySelector(".screen .bottom");

const keypressSound = new Audio("sounds/keystroke.wav");

let currentInput = "";
let firstOperand = null;
let operator = null;
let isNewInput = true;

function updateDisplay() {
  displayBottom.textContent = currentInput || "0";
}

function handleNumberClick(number) {
  if (isNewInput) {
    currentInput = number;
    isNewInput = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function handleOperatorClick(op) {
  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    const result = calculate(firstOperand, parseFloat(currentInput), operator);
    firstOperand = result;
    displayTop.textContent = result;
  }
  operator = op;
  isNewInput = true;
  currentInput = "";
  displayTop.textContent = `${firstOperand} ${operator}`;
}

function calculate(operand1, operand2, operator) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "×":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    default:
      return operand2;
  }
}

function handleEqualsClick() {
  if (operator && firstOperand !== null) {
    const result = calculate(firstOperand, parseFloat(currentInput), operator);
    displayTop.textContent = `${firstOperand} ${operator} ${currentInput} =`;
    currentInput = result.toString();
    firstOperand = null;
    operator = null;
    isNewInput = true;
    updateDisplay();
  }
}

function handleClearClick() {
  currentInput = "";
  firstOperand = null;
  operator = null;
  displayTop.textContent = "";
  isNewInput = true;
  updateDisplay();
}

function handlePeriodClick() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

function playSound() {
  keypressSound.currentTime = 0;
  keypressSound.play();
}

buttons.forEach((button) => {
  button.addEventListener("click", playSound);
});

periodBtn.addEventListener("click", handlePeriodClick);
clearBtn.addEventListener("click", handleClearClick);
addBtn.addEventListener("click", () => handleOperatorClick("+"));
equalsBtn.addEventListener("click", handleEqualsClick);
sevenBtn.addEventListener("click", () => handleNumberClick("7"));
eightBtn.addEventListener("click", () => handleNumberClick("8"));
nineBtn.addEventListener("click", () => handleNumberClick("9"));
divideBtn.addEventListener("click", () => handleOperatorClick("/"));
fourBtn.addEventListener("click", () => handleNumberClick("4"));
fiveBtn.addEventListener("click", () => handleNumberClick("5"));
sixBtn.addEventListener("click", () => handleNumberClick("6"));
multiplyBtn.addEventListener("click", () => handleOperatorClick("×"));
oneBtn.addEventListener("click", () => handleNumberClick("1"));
twoBtn.addEventListener("click", () => handleNumberClick("2"));
threeBtn.addEventListener("click", () => handleNumberClick("3"));
subtractBtn.addEventListener("click", () => handleOperatorClick("-"));
zeroBtn.addEventListener("click", () => handleNumberClick("0"));
