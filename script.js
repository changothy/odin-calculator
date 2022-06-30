let calculated = false;     // equation is calculated once equals is clicked
let firstValue = null;
let secondValue = null;
let operator = null;

// let equation = new Array(); // stores the complete math equation

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
    let result = 0;

    console.log(a);
    console.log(b);
    console.log(operator);

    switch(operator) {
        case "add":
            result = add(a, b);
            break;
        case "subtract":
            result = subtract(a, b);
            break;
        case "multiply":
            result = multiply(a, b);
            break;
        case "divide":
            result = divide(a, b);
            break;
        default:
            console.log("Unrecognized operation");
            break;
    }
    
    document.querySelector("#display").textContent = result;
    firstValue = result;
}

function isOperator(value) {
    if (value == "divide" || value == "multiply" || value == "subtract" || value == "add") {
        return true;
    } else {
        return false;
    }
}

function reset() {
    calculated = false;     // equation is calculated once equals is clicked
    firstValue = null;
    secondValue = null;
    operator = null;
    document.querySelector("#display").textContent = 0;
}

// // Calculate an equation
// function calculate(equation) {
//     const initialValue = 1;

//     let latestValue = equation[0];
//     let operator = "";

//     for (i = 1; i < equation.length; i++) {
//         if (isOperator(equation[i])) {
//             operator = equation[i];
//         } else if (!isNaN(equation[i])) {
//             latestValue = operate(operator, latestValue, equation[i]);
//         }
//     }

//     document.querySelector("#display").textContent = latestValue;
//     calculated = true;
// }

// Updates the number display
function populateDisplay(value) {
    displayContent = document.querySelector("#display").textContent;

    if (value == "0" && displayContent == "0") { // if display is 0, and 0 is clicked, don't update and add more 0s
        return;
    } else if (displayContent == "0" && !(value == "decimal" || isOperator(value))) { // if display is 0 and it's not a decimal or operator, then replace the default 0 with the value
        document.querySelector("#display").textContent = value;
        return;
    } else if (value == "decimal" && displayContent.includes(".")) { // if there's already a decimal in the display value, return
        return;
    } else if (!isNaN(value) && operator) { // if value is a number and there's an operator, then update display with the new number
        document.querySelector("#display").textContent = value;
        return;
    } else {
        document.querySelector("#display").textContent += value;
    }
}

// Update the equation array
function recordElements(value) {
    // equation.push(document.querySelector("#display").textContent)
    // equation.push(operator);
    // console.log(equation);
    
    if (firstValue && secondValue) {
        // if (operator) {
        //     operate(firstValue, secondValue, operator);
        // }
        operate(value, firstValue, secondValue);
    } else if (firstValue) {
        secondValue = Number(document.querySelector("#display").textContent);
        console.log()
        operate(operator, firstValue, secondValue);
    } else {    // if number then operator, save the number and the operator
        firstValue = Number(document.querySelector("#display").textContent);
        operator = value;
    }

    // console.log(firstValue);
    // console.log(secondValue);
    // console.log(operator);
}

function initialize() {
    document.querySelector("#display").textContent = 0;
    
    numberButtons = document.querySelectorAll(".button.number");
    numberButtons.forEach(function (button) {
        button.addEventListener('mouseup', () => {
            // if (calculated) {
            //     equation = new Array();
            //     document.querySelector("#display").textContent = 0;
            //     calculated = false;
            // }
            populateDisplay(button.textContent);
        });
    });

    operationButtons = document.querySelectorAll("#operators .button");
    operationButtons.forEach(function (button) {
        button.addEventListener('mouseup', () => {
            // if (calculated) {
            //     equation = new Array();
            //     calculated = false;
            // }
            recordElements(button.id);
            // populateDisplay(button.textContent);
        });
    });

    clearButton = document.querySelector("#clear");
    clearButton.addEventListener('mouseup', () => {
        // equation = new Array();
        document.querySelector("#display").textContent = 0;
        reset();
    });

    equalsButton = document.querySelector("#equals");
    equalsButton.addEventListener('mouseup', () => {
        recordElements(equalsButton.id);
        // calculate(equation);
    });
}

initialize();