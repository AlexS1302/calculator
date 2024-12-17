
// Create squares
function createSquares() {
    const container = document.getElementById("button-container");

    // Define button labels
    const buttonLabels = [
        'AC', 'C', '%', '/',
        '7', '8', '9', 'x',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '='
    ]

    for (let i = 0; i < buttonLabels.length; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        // Add classes for numbers and operators
        if (isNaN(buttonLabels[i]) && buttonLabels[i] !== '.') {
            square.classList.add("operator");
        } else {
            square.classList.add("number");
        }

        square.textContent = buttonLabels[i];

        // Add id to the last button
        if (i == buttonLabels.length - 1) {
            square.id = "last-button";
        }

        container.appendChild(square);
    }
}

// Setup event listeners for buttons
function setupEventListeners() {
    const buttons = document.querySelectorAll(".square");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;
            handleButtonPress(buttonText);
        });
    });
}


// Operator functions

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'Error, cannot divide by 0!' : a / b;
const modulo = (a, b) => b === 0 ? 'Error, cannot perform modulo by 0' : a % b;


// Handle button presses

let currentInput = '';
let previousInput = '';
let operator = '';
let resultDisplayed = false;

function handleButtonPress(buttonText)  {
    const display = document.getElementById("display");

    switch (buttonText) {
        case 'AC':
            resetCalculator();
            break;
        case 'C':
            clearCurrentInput();
            break;
        case '=':
            calculateAndDisplayResult();
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
        case '%':
            handleOperator(buttonText);
            break;
        default:
            handleNumberOrDecimal(buttonText);
            break;
    }
    updateDisplay();
}

// Helper functions
function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    resultDisplayed = false;
}

function clearCurrentInput() {
    currentInput = '';
    resultDisplayed = false;
}

function calculateAndDisplayResult() {
    if (operator && previousInput !== '' && currentInput !== '') {
        currentInput = calculateResult(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
        resultDisplayed = true;
        // Reset previousInput and operator for new calculation
        previousInput = '';
        operator = '';
    }

}

function handleOperator(op) {
    if (resultDisplayed) {
        previousInput = currentInput;
        currentInput = '';
    }
    if (currentInput !== '') {
        if (previousInput === '') {
            previousInput = currentInput;
        } else {
            previousInput = calculateResult(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
        }
        currentInput = '';
    }
    operator = op;
    resultDisplayed = false;
}

function handleNumberOrDecimal(input) {
    if (resultDisplayed) {
        resetCalculator();
    }
    if (input === '.' && currentInput.includes('.')) {
        return; // Prevent multiple decimals
    }
    currentInput += input;
}

function updateDisplay() {
    const display = document.getElementById("display"); 
    display.textContent = [previousInput, operator, currentInput].filter(Boolean).join(' ') || '0';
}


// Calculate function
function calculateResult(first, second, operator) {
    let result;
    switch (operator) {
        case '+':
            result = add(first, second);
            break;
        case '-':
            result = subtract(first, second);
            break;
        case 'x':
            result = multiply(first, second);
            break;
        case '/':
            result = divide(first, second);
            break;
        case '%':
            result = modulo(first, second);
            break;
        default:
            result = second;
    }
    return result.toString();
}

createSquares();
setupEventListeners();