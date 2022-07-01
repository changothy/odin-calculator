let calculated = false;     // equation is calculated once equals is clicked
let firstValue = null;
let secondValue = null;
let operator = null;
let secondNumber = false;

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
            if (b == 0) {
                result = "Error: divide by 0";
            } else {
                result = divide(a, b);
            }
            break;
        default:
            console.log("Unrecognized operation");
            break;
    }
    
    if (!isNaN(result) && (result % 1 != 0)) {
        result = parseFloat(result.toFixed(10)); // round decimals to 10 places
    }
    document.querySelector("#display").textContent = result;
}

function isOperator(value) {
    if (value == "divide" || value == "multiply" || value == "subtract" || value == "add") {
        return true;
    } else {
        return false;
    }
}

function reset() {
    calculated = false;
    firstValue = null;
    secondValue = null;
    operator = null;
    secondNumber = false;
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
    } else if (displayContent == "0" && !(value == ".")) { // if display is 0 and the clicked button is not a decimal or operator, then replace the default 0 with the value
        document.querySelector("#display").textContent = value;
        return;
    } else if (value == "." && displayContent.includes(".")) { // if decimcal clicked and there's already a decimal in the display value, return
        return;
    } else if (!isNaN(value) && firstValue && !secondNumber) {  // if number clicked and we're entering the second number, then replace the display with second number
        document.querySelector("#display").textContent = value;
        secondNumber = true;
        return;
    } else if (calculated) {    // reset the display after equals is clicked and we've calculated a result
        document.querySelector("#display").textContent = value;
        calculated = false;
        return;
    } else {
        document.querySelector("#display").textContent += value;
    }
}

function deleteNumber() {
    displayContent = document.querySelector("#display").textContent;

    if (displayContent.length > 1) {
        document.querySelector("#display").textContent = displayContent.slice(0, -1);
    } else {
        document.querySelector("#display").textContent = 0;
    }

}

// Update the equation array
function recordElements(value) {
    // equation.push(document.querySelector("#display").textContent)
    // equation.push(operator);
    // console.log(equation);
    

    /*
        if first number, then save first number and operator
        if second number
            if operator, then operate and save result and operator
            if equals, then operate and show result only
    */

    displayValue = document.querySelector("#display").textContent;

    if (value == "equals" && firstValue == null) {
        return;
    }

    if (operator && isOperator(value)) {
        operator = value;
        console.log(operator);
        return;
    }

    if (!firstValue) {
        firstValue = Number(displayValue);
        operator = value;
    } else {    // if number then operator, save the number and the operator
        secondValue = Number(displayValue);
        operate(operator, firstValue, secondValue);
        secondNumber = false;
        if (isOperator(value)) {
            firstValue = displayValue;
            operator = value;
        } else {
            firstValue = null;
            secondValue = null;
            operator = null;
        }
    }
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
        calculated = true;
    });

    backspaceButton = document.querySelector("#backspace");
    backspaceButton.addEventListener('mouseup', () => {
        deleteNumber();
    });
}

initialize();