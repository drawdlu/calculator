const displayArea = document.querySelector('.display');

let previousNum = '';
let currentNum = '';
let initialNumber = true;
let operand = '';

function listenToClicks () {
    const calcButtons = document.querySelectorAll('.button');
    calcButtons.forEach( (button) => {
        button.addEventListener('click', interpretClicks)
    })
}

function interpretClicks(event) {
    const char = event.target.textContent

    if (char === 'C') {
        clearData();
    } else if (char === 'Del') {
        // call backspace function
    } else if (char.match(/\d/)) {
        displayNum(char);
        saveDigit(char);
    } else if (char === '.') {
        // add a decimal to current digit or ignore if there is already one
    } else if (char.match(/[\+\-\*\/]/)) {
        initialNumber = false;
        handleOperateClick();
        saveOperand(char);
    } else if (char === `=`) {
        handleOperateClick();
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
    if (operand && !currentNum) {
        clearDisplay();
        displayArea.textContent += num;
    } else {
        displayArea.textContent += num;
    }
}

function saveDigit(digit) {
    if (initialNumber) {
        previousNum += digit;
    } else {
        currentNum += digit;
    }
}

function saveOperand(char) {
    if (!previousNum) {
        return;
    }

    operand = char;
}

function handleOperateClick() {
    if ( !previousNum || (!operand && !currentNum) ) {
        return;
    } else if (operand) {
        if (currentNum) {
            previousNum = operate(previousNum, currentNum, operand);
            operand = '';
        } else {
            previousNum = operate(previousNum, previousNum, operand);
        }

        currentNum = '';
        clearDisplay();
        displayNum(previousNum);
    }
}

function clearDisplay() {
    displayArea.textContent = '';
}

function clearData() {
    clearDisplay();
    previousNum = '';
    currentNum = '';
    operand = '';
    initialNumber = true;
}

listenToClicks();