function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function mutiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "add":
            add(a, b);
            break;
        case "subtract":
            subtract(a, b);
            break;
        case "multiply":
            multiply(a, b);
            break;
        case divide:
            divide(a, b);
            break;
        default:
            console.log("Unrecognized operation");
            break;
    }
}

function populateDisplay(value, equation) {
    displayContent = document.querySelector("#display").textContent;
    let operator = false;
    let hasOperator = false;

    if (value == "divide" || value == "multiply" || value == "subtract" || value == "add") {
        operator = true;
    }

    if (displayContent.includes("x") || displayContent.includes("\\") || displayContent.includes("+") || displayContent.includes("-")) {
        hasOperator = true;
    }

    if (value == "0" && displayContent == "0") { // if 0 and we press 0, don't update
        return;
    } else if (displayContent == "0" && !(value == "decimal" || operator)) { // if 0 and it's not a decimal or operator, then replace the default 0 with the value
        document.querySelector("#display").textContent = value;
        return;
    } else if (value == "decimal" && displayContent.includes("decimal")) { // if there's already a decimal in the display value, return
        return;
    } else if (!isNaN(value) && hasOperator) { // if there's already a decimal in the display value, return
        document.querySelector("#display").textContent = value;
        return;
    } else {
        document.querySelector("#display").textContent += value;
    }
}

function recordElements(operator, equation) {
    equation.push(document.querySelector("#display").textContent)
    equation.push(operator);
    console.log(equation);
}

function initialize() {
    // let displayValue = 0;
    let equation = new Array();
    document.querySelector("#display").textContent = 0;
    
    numberButtons = document.querySelectorAll(".button.number");
    numberButtons.forEach(function (button) {
        button.addEventListener('mouseup', () => {
            populateDisplay(button.textContent, equation);
        });
    });

    operationButtons = document.querySelectorAll("#operators .button");
    operationButtons.forEach(function (button) {
        button.addEventListener('mouseup', () => {
            recordElements(button.id, equation);
            populateDisplay(button.textContent);
        });
    });

    clearButton = document.querySelector("#clear");
    clearButton.addEventListener('mouseup', () => {
        // displayValue = 0;
        equation = new Array();
        document.querySelector("#display").textContent = 0;
    });
}

initialize();