function listenToClicks () {
    const calcButtons = document.querySelectorAll('.button');
    calcButtons.forEach( (button) => {
        button.addEventListener('click', interpretClicks)
    })
}

let firstNum;
let secondNum;
let operand;

function interpretClicks(event) {
    const char = event.target.textContent

    if (char === 'C') {
        // call clear function
    } else if (char === 'Del') {
        // call backspace function
    } else if (char.match(/\d/)) {
        // save or add digit to current one
    } else if (char === '.') {
        // add a decimal to current digit or ignore if there is already one
    } else if (char.match(/[\+\-\*\/]/)) {
        // add operand and get ready for second number
    } else if (char === `=`) {
        // call operate when operands and operator is complete
    }
}

function operate(num1, num2, operand) {
    switch (operand) {
        case '+':
            return +num1 + +num2;
        case '-': 
            return +num1 - +num2;
        case '/':
            return +num1 / +num2;
        case '*': 
            return +num1 * +num2;
    }
}

listenToClicks();