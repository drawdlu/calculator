function listenToClicks () {
    const calcButtons = document.querySelectorAll('.button');
    calcButtons.forEach( (button) => {
        button.addEventListener('click', addValue)
    })
}

function addValue(event) {
    alert(event.target.textContent);
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