
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
            currentInput = '';
            previousInput = '';
            operator = '';
            resultDisplayed = false;
            display.textContent = '0';
            break;
        case 'C':
            currentInput = '';
            resultDisplayed = false;
            display.textContent = '0';
            break;
        case '=':
            calculateAndDisplayResult();
            resultDisplayed = true;
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
        case '%':
            handleOperator(buttonText);
            resultDisplayed = false
            break;
        default:
            if (resultDisplayed) {
                currentInput = ''; 
                resultDisplayed = false;
            }
            handleNumberOrDecimal(buttonText);
            break;
    }
    updateDisplay();
}

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
        updateDisplay();
        // Reset calculator
        previousInput = '';
        operator = '';
    }

}

function handleOperator(op) {
    if (currentInput !== '') {
        if (previousInput === '') {
            previousInput = currentInput;
        } else {
            previousInput = calculateResult(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
            
        }
        currentInput = '';
    }
    operator = op;
    updateDisplay();
}

function handleNumberOrDecimal(input) {
    if (input === '.' && currentInput.includes('.')) {
        return; // Prevent multiple decimals
    }
    currentInput += input;
    updateDisplay();
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