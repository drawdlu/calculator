const MAX_DISPLAY_LENGTH = 14;

const displayArea = document.querySelector('.display');
const calcButtons = document.querySelectorAll('.button');

displayArea.textContent = '';
let previousNum = '';
let currentNum = '';
let initialNumber = true;
let previousNumActive = true;
let operand = '';

function listenToClicks () {
    calcButtons.forEach( (button) => {
        button.addEventListener('click', interpretClicks)
    })
}

function interpretClicks(event) {
    const char = event.target.textContent

    if (char === 'C') {
        clearData();
    } else if (char === 'Del') {
        deleteChar();
    } else if (char.match(/\d/)) {
        displayData(char);
        saveDigit(char);
    } else if (char === '.') {
        addDecimal();
    } else if (char.match(/[\+\-\*\/]/)) {
        initialNumber = false;
        previousNumActive = false;
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
    const ans = (+num1 + +num2);
    return ans.toString();
}

function subtract(num1, num2) {
    const ans = (+num1 - +num2);
    return ans.toString();
}

function multiply(num1, num2) {
    const ans = (+num1 * +num2);
    return ans.toString();
}

function divide(num1, num2) {
    const ans = (+num1 / +num2);
    return ans.toString();
}

function displayData(num) {
    if (operand && !currentNum) {
        clearDisplay();
        displayArea.textContent += num;
    } else {
        displayArea.textContent += num;
    }

    if (displayArea.textContent.length > MAX_DISPLAY_LENGTH) {
        displayArea.textContent = displayArea.textContent.slice(0, MAX_DISPLAY_LENGTH);
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
            if (currentNum === '0' && operand === '/') {
                clearDisplay();
                displayData('NaN can do that');
                currentNum = '';
                previousNum = 'NaN';
                return;
            } else {
                previousNum = operate(previousNum, currentNum, operand);
            }

            operand = '';

        } else {
            previousNum = operate(previousNum, previousNum, operand);
        }

        currentNum = '';
        clearDisplay();
        displayData(previousNum);
        previousNumActive = true;
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

function deleteChar() {
    displayArea.textContent = displayArea.textContent.slice(0, -1);

    if (currentNum) {
        currentNum = currentNum.slice(0, -1);
    } else if (previousNum) {
        previousNum = previousNum.slice(0, -1);
        if (previousNum.length === 0) {
            previousNum += '0'
        }
    }
}

function addDecimal() {
    if (displayArea.textContent.includes('.')) {
        return;
    } 

    displayArea.textContent += '.';

    if (previousNumActive) {
        previousNum += '.'
    } else {
        currentNum += '.'
    }
}

function mouseDown() {
    calcButtons.forEach( (button) => {
        button.addEventListener('mousedown', changeBackgroundColor)
    })
}

let buttonClicked;

function changeBackgroundColor(event) {
    event.target.style.backgroundColor = '#D8A25E';
    buttonClicked = event;
}

function mouseUp() {
    document.addEventListener('mouseup',backToDefault)
}

function backToDefault(event) {
    buttonClicked.target.removeAttribute('style')
}



mouseDown();
mouseUp();
listenToClicks();