import {createNumber} from '../model/create-number.js'
import {add, subtract, multiply, divide} from '../model/operations.js'


let getCalculator = () => {
    let calculator = {
        validInput: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '=',  '.', 'CE'],
        firstNumber: createNumber(),
        secondNumber: createNumber(),
        currentNumber: {
            ref: null,
            location: 0,
        },
        arithmeticOperations: {
            '+': add,
            '-': subtract,
            'x': multiply,
            '/': divide,
        },

        calledEqual: false,
        currentOperation: '',
        previousOperation: '',

        errorMessage: 'ERROR',

        display: '',
    
        initializeCurrentNumber () {
            if (this.currentNumber.ref == null || this.currentNumber.ref == null){
                this.currentNumber.ref = this.firstNumber;
                this.location = 0;
            }
        },

        printInfo(tag){
            console.log(`
${tag}//
    firstNumber: ${this.firstNumber.value}
    secondNumber: ${this.secondNumber.value}
    currentNumber: ${this.currentNumber.location}
    operation:
        {
            current: ${this.currentOperation}
            previous: ${this.previousOperation}
        }`
);
        },

        parseInput (symbol) {

            
            if (Object.keys(this.arithmeticOperations).includes(symbol)){
                this.calledEqual = false;
                //this.printInfo('Start of OP');

                // 0. if the symbol adn the current operation are arithmetic operations, then it means the user has not pressed the equal button. So the calculator must calculate de result of the current operation, then store the result on the first number and clear the second one.
                if (Object.keys(this.arithmeticOperations).includes(this.currentOperation)){
                    console.log("SYMBOL IS THE SAME AS CURRENT OP");
                    this.changeCurrentOperation('=');
                    this.printInfo('PRE-EQUAL');
                    this.equalOperation();
                    this.switchCurrentNumber();
                    this.printInfo('POST-EQUAL');
                    this.secondNumber.clearValue();
                    this.updateDisplay(this.currentNumber.ref.value);
                }

                // 1. change the current operation to the symbol
                this.changeCurrentOperation(symbol);
                
                // 2. Switch to second number
                this.switchCurrentNumber();

                // 3. Show symbol on display
                //this.updateDisplay(this.currentNumber.ref.value);

            }
            else if (symbol == '=') {
                if (this.currentOperation != symbol){
                    this.changeCurrentOperation(symbol);
                }
                this.printInfo('PRE-EQUAL');
                this.equalOperation();
                if (this.currentNumber.location == 1)
                    this.switchCurrentNumber();
                this.printInfo('POST-EQUAL');
                this.updateDisplay(this.currentNumber.ref.value);
            }
            else if (symbol == "CE") {
                this.clearDisplay();
            }
            else {
                if (this.calledEqual){
                    this.calledEqual = false;
                    this.currentNumber.ref.clearValue();
                }
                this.appendSymbolToCurrentNumber(symbol);
                this.updateDisplay(this.currentNumber.ref.value);
            }
        },

        getDecimalPart(number){
            let decimal = '';
            if (number.isFloat()){
                decimal = number.split(".")[1];
            }
    
            return decimal;
        },

        convertNumbersToIntegers(number1, number2) {
            let factor = 1;

            if (number1.isFloat() || number2.isFloat()){
                let lengths = [this.getDecimalPart(number1.value).length, this.getDecimalPart(number2.value).length];
                factor = Math.max(...lengths);
            }

            return [Number(number1.value)*factor, Number(number2.value)*factor, factor];
        },

        equalOperation() {
            this.calledEqual = true;
            let numbersInIntegerFormat = this.convertNumbersToIntegers(this.firstNumber, this.secondNumber);
            let result = null;

            if (Object.keys(this.arithmeticOperations).includes(this.previousOperation)){
                result = this.arithmeticOperations[this.previousOperation]( numbersInIntegerFormat[0], numbersInIntegerFormat[1] );

                if (this.previousOperation != '/'){
                    result /= numbersInIntegerFormat[2];
                }
            }
            else {
                result = NaN;
            }

            result = result.toString();
            console.log(`RESULT: ${result}`)
            this.firstNumber.value = result;
        },

        switchCurrentNumber() {
            //console.trace();
            if (this.currentNumber.location == 0){
                this.currentNumber.ref = this.secondNumber;
                this.currentNumber.location = 1;
            }
            else {
                this.currentNumber.ref = this.firstNumber;
                this.currentNumber.location = 0;
            }
        },

        changeCurrentOperation(symbol){
            this.previousOperation = this.currentOperation;
            this.currentOperation = symbol;
        },

        clearCurrentAndPreviousOperations () {
            this.currentOperation = '';
            this.previousOperation = '';
        },

        appendSymbolToCurrentNumber(symbol){
            // if (this.currentNumber.location == 0) {
            //     console.log(`Appending ${symbol} to the first number`);
            // }
            // else {
            //     console.log(`Appending ${symbol} to the second number`);
            // }
            this.currentNumber.ref.addCharacter(symbol);
        },

        updateDisplay(value) {
            this.display = value;
        },

        clearDisplay() {
            this.firstNumber.clearValue();
            this.secondNumber.clearValue();
            this.currentNumber.ref = this.firstNumber;
            this.clearCurrentAndPreviousOperations();
            this.updateDisplay('');
        }
    }

    calculator.initializeCurrentNumber()

    return calculator
}

export {getCalculator};