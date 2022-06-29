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

function populateDisplay(value) {
    displayContent = document.querySelector("#display").textContent;

    if (value == "0" && displayContent == "0") {
        return;
    } else if (displayContent == "0" && value != "decimal") {
        document.querySelector("#display").textContent = value;
        return;
    } else if (value == "decimal" && displayContent.includes("decimal")) { /* TODO: change decimal to . */
        return;
    } else {
        document.querySelector("#display").textContent += value;
    }
}


function initialize() {
    let displayValue = 0;
    document.querySelector("#display").textContent = displayValue;

    buttons = document.querySelectorAll(".button");
    console.log(buttons);
    buttons.forEach(function (button) {
        button.addEventListener('mouseup', () => {
            populateDisplay(button.id);
        });
    });
}

initialize();