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
    
}


let displayValue = 0;
document.querySelector("#display").textContent = displayValue;