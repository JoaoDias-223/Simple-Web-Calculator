import {getCalculator} from '../controller/calculator-control.js';


let calculator = getCalculator();

let display = document.getElementById('display-content');

let sendSymbolToCalculator = (symbol) => {
    calculator.parseInput(symbol);
    display.innerHTML = calculator.display;
}

let keyboardInputHandle = (event) => {
    let key = event.key;

    if (event.code === "NumpadDecimal"){
        key = '.';
    }
    else if (event.code === "NumpadMultiply"){
        key = 'x';
    }

    if (calculator.validInput.includes(key)){
        sendSymbolToCalculator(key);
    }
}

let buttonInputHandle = (element) => {
    let symbol = element.innerHTML;

    if (calculator.validInput.includes(symbol)){   
        sendSymbolToCalculator(symbol);
    }
}

document.addEventListener('keydown', keyboardInputHandle);

window.buttonInputHandle = buttonInputHandle;