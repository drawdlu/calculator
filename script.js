function listenToClicks () {
    const calcButtons = document.querySelectorAll('.button');
    calcButtons.forEach( (button) => {
        button.addEventListener('click', addValue)
    })
}

function addValue(event) {
    alert(event.target.textContent);
}

listenToClicks();