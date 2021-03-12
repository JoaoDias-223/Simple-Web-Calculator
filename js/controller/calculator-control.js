import {createNumber} from '../model/create-number.js'


let getCalculator = () => {
    return {
        validInput: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '=',  '.', 'CE'],

        firstNumber: createNumber(),
        display: '',
    
        parseInput (symbol) {
            this.firstNumber.addCharacter(symbol);
            this.updateDisplay(this.firstNumber.value);
        },

        updateDisplay(value) {
            this.display = value;
        }
    }
}

export {getCalculator};