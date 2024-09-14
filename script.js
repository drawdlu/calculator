const MAX_DISPLAY_LENGTH = 14;
const FUNCTION_KEY = 'F';

const displayArea = document.querySelector('.display');
const calcButtons = document.querySelectorAll('.button');

displayArea.textContent = '';

let previousNum = '';
let currentNum = '';
let operand = '';
let previousNumActive = true;

function listenToClicks () {
    calcButtons.forEach( (button) => {
        button.addEventListener('click', interpretClicks)
    })
}

function interpretClicks(event) {
    let char;

    // check if keyboard or click event
    if (event.target) {
        char = event.target.textContent;
    } else {
        char = event;
    }

    if (char === 'C') {
        clearData();
    } else if (char === 'Del' || char === 'Backspace' || char === 'Delete') {
        deleteChar();
    } else if (+char || char === '0') {
        displayData(char);
        saveDigit(char);
    } else if (char === '.') {
        addDecimal();
    } else if (char.match(/[\+\-\*\/]/)) {
        previousNumActive = false;
        handleOperateClick();
        saveOperand(char);
    } else if (char === `=` || char === 'Enter') {
        handleOperateClick(char);
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

function saveDigit(digit) {
    if (previousNumActive) {
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

function handleOperateClick(char) {
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

            if (char === '=') {
                previousNumActive = true;
            }

        } else {
            if (char === '=') {
                return;
            }
            previousNum = operate(previousNum, previousNum, operand);
        }

        currentNum = '';
        clearDisplay();
        displayData(previousNum);
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

function clearDisplay() {
    displayArea.textContent = '';
}

function clearData() {
    clearDisplay();
    previousNum = '';
    currentNum = '';
    operand = '';
    previousNumActive = true;
}

function deleteChar() {
    displayArea.textContent = displayArea.textContent.slice(0, -1);

    if (currentNum) {
        currentNum = currentNum.slice(0, -1);
        if (currentNum.length === 0) {
            currentNum += '0';
        }
    } else {
        previousNum = previousNum.slice(0, -1);
        if (previousNum.length === 0) {
            previousNum += '0';
        }
    }
}

mouseDown();
mouseUp();
listenToClicks();

// Keyboard support
function listenToKeys() {
    document.addEventListener('keydown', pressedKey);
}

function pressedKey(event) {
    interpretClicks(event.key.toString())
}

listenToKeys();

// Styling
function mouseDown() {
    calcButtons.forEach( (button) => {
        button.addEventListener('mousedown', changeBackgroundColor)
    })
}

let buttonClicked;

function changeBackgroundColor(event) {
    event.target.style.backgroundColor = '#3A435E';
    buttonClicked = event;
}

function mouseUp() {
    document.addEventListener('mouseup',backToDefault);
}

function backToDefault(event) {
    if (buttonClicked) {
        buttonClicked.target.removeAttribute('style');
    }
}