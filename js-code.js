// Squares
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




// Operator Functions

const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(array) {
    return array.reduce((product, current) => product * current, 1);
};

const divide = function(array) {
    if (array.length === 0) {
        throw new Error("Array must contain at least one element")
    }

    return array.slice(1).reduce((quotient, current) => {
        if (current === 0) {
            throw new Error("Cannot divide by zero");
        }
        return quotient / current;
         
    }, array[0]);
        
}

function operate() {
    const a = parseInt(prompt("Please input the first number:"))
    const b = parseInt(prompt("Please input the second number:"))

    if (isNaN(a) || isNaN(b)) { 
        console.error("Invalid input. Please enter valid numbers."); 
        return; 
    }

    let result = multiply([a,b]);
    console.log(result);
}

createSquares();