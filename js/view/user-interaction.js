let validInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '=',  '.', 'CE']

let sendSymbolToCalculator = (symbol) => {
    console.log(symbol);
}

let keyboardInputHandle = (event) => {
    let key = event.key;

    if (event.code === "NumpadDecimal"){
        key = '.';
    }
    else if (event.code === "NumpadMultiply"){
        key = 'x';
    }

    if (validInput.includes(key)){
        sendSymbolToCalculator(key);
    }
}

let buttonInputHandle = (element) => {
    let symbol = element.innerHTML;

    if (validInput.includes(symbol)){   
        sendSymbolToCalculator(symbol);
    }
}

document.addEventListener('keydown', keyboardInputHandle);