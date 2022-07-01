let calculated = false;     // equation is calculated once equals is clicked
let firstValue = null;
let secondValue = null;
let operator = null;
let lastValueEntered = null;
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

    a = parseFloat(a);
    b = parseFloat(b);

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
    lastValueEntered = null;
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

    if (displayContent.length > 1 && !calculated) {
        document.querySelector("#display").textContent = displayContent.slice(0, -1);
    } else {
        document.querySelector("#display").textContent = 0;
    }

}

function setLastValueEntered(value) {
    lastValueEntered = value;
}

// Update the equation array
function recordElements(value) {
    /*
        if first number, then save first number and operator
        if second number
            if operator, then operate and save result and operator
            if equals, then operate and show result only
    */

    console.log("recordElements value: " + value);

    if (value == "equals" && firstValue == null) {
        return;
    }

    // if (isOperator(lastValueEntered) && isOperator(value)) {
    //     operator = value;
    //     lastValueEntered = value;
    //     return;
    // }

    if (firstValue == null) {  // if firstValue is empty, that means the first value has been entered and an operator has been clicked
        if (document.querySelector("#display").textContent == 0) {
            firstValue = 0;
        } else {
            firstValue = Number(document.querySelector("#display").textContent);
        }
        operator = value;
    } else {
        secondValue = Number(document.querySelector("#display").textContent);
        operate(operator, firstValue, secondValue);
        secondNumber = false;
        if (isOperator(value)) {    // if number then operator, save the number and the operator
            firstValue = document.querySelector("#display").textContent;
            operator = value;
        } else {                    // if equals, then start a new equation and reset everything
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
            populateDisplay(button.textContent);
            setLastValueEntered(button.textContent);
        });
    });

    operationButtons = document.querySelectorAll("#operators .button");
    operationButtons.forEach(function (button) {
        button.addEventListener('mouseup', () => {
            if (isOperator(lastValueEntered)) {
                operator = button.id;
            } else {
                recordElements(button.id);
            }
            setLastValueEntered(button.id);
        });
    });

    clearButton = document.querySelector("#clear");
    clearButton.addEventListener('mouseup', () => {
        // document.querySelector("#display").textContent = 0;
        reset();
    });

    equalsButton = document.querySelector("#equals");
    equalsButton.addEventListener('mouseup', () => {
        recordElements(equalsButton.id);
        setLastValueEntered(equalsButton.id);
        calculated = true;
    });

    backspaceButton = document.querySelector("#backspace");
    backspaceButton.addEventListener('mouseup', () => {
        deleteNumber();
    });
}

initialize();