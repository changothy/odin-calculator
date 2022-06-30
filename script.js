let calculated = false;     // equation is calculated once equals is clicked
let equation = new Array(); // stores the complete math equation

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Operate on two digits based on operator passed in
function operate(operator, a, b) {
    switch(operator) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case divide:
            return divide(a, b);
        default:
            console.log("Unrecognized operation");
            break;
    }
}

function isOperator(value) {
    if (value == "divide" || value == "multiply" || value == "subtract" || value == "add") {
        return true;
    } else {
        return false;
    }
}

// Calculate an equation
function calculate(equation) {
    const initialValue = 1;

    let latestValue = equation[0];
    let operator = "";

    for (i = 1; i < equation.length; i++) {
        if (isOperator(equation[i])) {
            operator = equation[i];
        } else if (!isNaN(equation[i])) {
            latestValue = operate(operator, latestValue, equation[i]);
        }
    }

    document.querySelector("#display").textContent = latestValue;
    calculated = true;
}

// Updates the number display
function populateDisplay(value) {
    displayContent = document.querySelector("#display").textContent;
    let hasOperator = false;

    if (displayContent.includes("x") || displayContent.includes("\\") || displayContent.includes("+") || displayContent.includes("-")) {
        hasOperator = true;
    }

    if (value == "0" && displayContent == "0") { // if display is 0, and 0 is clicked, don't update and add more 0s
        return;
    } else if (displayContent == "0" && !(value == "decimal" || isOperator(value))) { // if display is 0 and it's not a decimal or operator, then replace the default 0 with the value
        document.querySelector("#display").textContent = value;
        return;
    } else if (value == "decimal" && displayContent.includes("decimal")) { // if there's already a decimal in the display value, return
        return;
    } else if (!isNaN(value) && hasOperator) { // if value is a number and there's an operator, then update display with the new number
        document.querySelector("#display").textContent = value;
        return;
    } else {
        document.querySelector("#display").textContent += value;
    }
}

// Update the equation array
function recordElements(operator, equation) {
    equation.push(document.querySelector("#display").textContent)
    equation.push(operator);
    console.log(equation);
}

function initialize() {
    document.querySelector("#display").textContent = 0;
    
    numberButtons = document.querySelectorAll(".button.number");
    numberButtons.forEach(function (button) {
        button.addEventListener('mouseup', () => {
            if (calculated) {
                equation = new Array();
                document.querySelector("#display").textContent = 0;
                calculated = false;
            }
            populateDisplay(button.textContent);
        });
    });

    operationButtons = document.querySelectorAll("#operators .button");
    operationButtons.forEach(function (button) {
        button.addEventListener('mouseup', () => {
            if (calculated) {
                equation = new Array();
                calculated = false;
            }
            recordElements(button.id, equation);
            populateDisplay(button.textContent);
        });
    });

    clearButton = document.querySelector("#clear");
    clearButton.addEventListener('mouseup', () => {
        equation = new Array();
        document.querySelector("#display").textContent = 0;
    });

    equalsButton = document.querySelector("#equals");
    equalsButton.addEventListener('mouseup', () => {
        recordElements(equalsButton.id, equation);
        calculate(equation);
    });
}

initialize();