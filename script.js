function listenToClicks () {
    const calcButtons = document.querySelectorAll('.button');
    calcButtons.forEach( (button) => {
        button.addEventListener('click', interpretClicks)
    })
}

let previousNum;
let currentNum;
let operand;

function interpretClicks(event) {
    const char = event.target.textContent

    if (char === 'C') {
        // call clear function
    } else if (char === 'Del') {
        // call backspace function
    } else if (char.match(/\d/)) {
        // save or add digit to current one
        // display digit
        displayNum(char);
    } else if (char === '.') {
        // add a decimal to current digit or ignore if there is already one
    } else if (char.match(/[\+\-\*\/]/)) {
        // add/change/operate operand and get ready for second number
    } else if (char === `=`) {
        // call operate when operands and operator is complete
    }
}

function operate(num1, num2, operand) {
    switch (operand) {
        case '+':
            return add(num1, num2);
        case '-': 
            return subtract(num1, num2);
        case '/':
            return divide(num1, num2);
        case '*': 
            return multiply(num1, num2)
    }
}

function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1, num2) {
    return +num1 - +num2;
}

function multiply(num1, num2) {
    return +num1 * +num2;
}

function divide(num1, num2) {
    return +num1 / +num2;
}

function displayNum(num) {
    const displayArea = document.querySelector('.display');
    displayArea.textContent += num;
}

listenToClicks();