import {getCalculator} from '../controller/calculator-control.js';


let calculator = getCalculator();

let display = document.getElementById('display-content');

let sendSymbolToCalculator = (symbol) => {
    let wasParsingSuccessful = calculator.parseInput(symbol);
    display.innerHTML = calculator.display;

    if (!wasParsingSuccessful) {
        setButtonInactive(activeButtonID);
    }
    else{
        checkSymbolToControlButton(symbol);
    }
}

let activeButtonID = null;

let checkSymbolToControlButton = (symbol) => {
    if (calculator.operation.isSymbolArithmetic(symbol)) {
        setButtonInactive(activeButtonID);
        setButtonActive(calculator.operation.getNames()[symbol]);
    }
    else if (symbol == '=' || symbol == 'CE'){
        setButtonInactive(activeButtonID);
    }

    return true;
}

let setButtonActive = (key) => {
    if (!operationButtons[key]?.className.includes(" active")) {
        operationButtons[key].className = operationButtons[key].className + " active";
        activeButtonID = key;
    }
}

let setButtonInactive = (key) => {
    if (operationButtons[key]?.className.includes(" active")){
        operationButtons[key].className = operationButtons[key].className.replace(' active', '');
        activeButtonID = null;
    }
}

let keyboardInputHandle = (event) => {
    let key = event.key;

    console.log(key);

    switch (event.code) {
        case ("NumpadDecimal"):
            key = '.';
            break;
        case ("NumpadMultiply"):
            key = 'x';
            break;
        case ("Enter"):
            key = '=';
            break;
        case ("Delete"):
            key = 'CE';
            break;
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

let operationButtons = {};

for (let operationName of Object.values(calculator.operation.getNames())){
    operationButtons[operationName] = document.getElementById(operationName + '-operation');
}

window.buttonInputHandle = buttonInputHandle;