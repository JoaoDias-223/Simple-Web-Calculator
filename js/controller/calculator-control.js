import {createNumber, createNumberPointer} from '../model/number_functions.js'
import {createOperation} from '../model/operations.js'


let getCalculator = () => {
    let calculator = {
        validInput: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '=',  '.', 'CE'],
        firstNumber: createNumber(),
        secondNumber: createNumber(),
        currentNumber: createNumberPointer(),
        operation: createOperation(),

        wasEqualOperationCalled: false,

        errorMessage: 'ERROR',

        display: '',
    
        initializeCurrentNumber () {
            this.currentNumber.setReference(this.firstNumber, 0);
        },

        printInfo(tag){
            console.log(`
${tag}//
    firstNumber: ${this.firstNumber._value}
    secondNumber: ${this.secondNumber._value}
    currentNumber: ${this.currentNumber.location}
    operation:
        {
            current: ${this.currentOperation}
            previous: ${this.previousOperation}
        }`
);
        },

        parseInput (symbol) {
            let returnValue = true;

            if (this.operation.isSymbolArithmetic(symbol)){
                returnValue = this.parseArithmeticSymbol(symbol);
            }
            else if (symbol == '=') {
                returnValue = this.parseEqualSymbol(symbol);
            }
            else if (symbol == "CE") {
                returnValue = this.clearDisplay();
            }
            else {
                returnValue = this.parseNumber(symbol);
            }

            return returnValue;
        },

        parseArithmeticSymbol (symbol) {
            let isOperationContinuous = this.calculateResultFromContinuousOperations();

            if (isOperationContinuous[1] == 1) {
                console.log("EROOOOOOO");
                this.clearDisplay();
                this.updateDisplay(this.errorMessage);
                return false;
            }

            this.operation.setCurrent(symbol);

            this.switchCurrentNumber();

            this.clearSecondNumberIfEqualWasCalled();

            if (isOperationContinuous[0]){
                this.updateDisplay(this.firstNumber.getValue());
            }
            else {
                this.updateDisplay(this.secondNumber.getValue());
            }
            
            return true;
        },

        parseEqualSymbol(symbol) {
            if (this.operation.getCurrent() != symbol){
                this.operation.setCurrent(symbol);
            }
            
            let wasOperationSucessful = this.calculateResultAndSwitch();
            this.updateDisplay(this.currentNumber.getReference().getValue());

            console.log(wasOperationSucessful);

            if (!wasOperationSucessful) {
                this.currentNumber.getReference().setValue('');
            }
            
            return true;
        },

        parseNumber (symbol) {
            this.clearSecondNumberIfEqualWasCalled();
            this.appendSymbolToCurrentNumber(symbol);
            this.updateDisplay(this.currentNumber.getReference().getValue());

            return true;
        },

        clearSecondNumberIfEqualWasCalled () {
            if (this.wasEqualOperationCalled){
                this.wasEqualOperationCalled = false;
                this.secondNumber.clearValue();

                return true;
            }

            return false;
        },

        appendSymbolToCurrentNumber(symbol){
            this.currentNumber.getReference().appendValue(symbol);
            return true;
        },

        convertNumbersToIntegers(number1, number2) {
            let factor = 1;

            let lengths = [number1.getDecimalPart().length, number2.getDecimalPart().length];
            factor = Math.max(...lengths, 1);
            console.log(factor);
            return [Number(number1.getValue())*(10**factor), Number(number2.getValue())*(10**factor), factor];
        },

        calculateResultAndSwitch() {
            this.printInfo();
            let equalOperationReturn = this.equalOperation();
            if (this.isCurrentNumberPointingToSecondNumber()){ //We switch to the first number to show the result;
                this.switchCurrentNumber();
            }

            this.printInfo();

            return equalOperationReturn;
        },

        calculateResultFromContinuousOperations(){
            if (this.operation.isCurrentOperationArithmetic()){
                this.operation.setCurrent('=');
                let wasOperationSucessful = this.calculateResultAndSwitch();

                if (!wasOperationSucessful) {
                    return [false, 1];
                }

                this.secondNumber.clearValue();

                this.updateDisplay(this.currentNumber.getReference().getValue());

                

                return [true, 0];
            }

            return [false, 0];
        },

        equalOperation() {
            let returnValue = true;

            this.wasEqualOperationCalled = true;

            let numbersInIntegerFormat = this.convertNumbersToIntegers(this.firstNumber, this.secondNumber);
            console.log("FLOAT");
            console.log(numbersInIntegerFormat);
            let result = null;

            console.log(numbersInIntegerFormat);

            if (this.operation.isPreviousOperationArithmetic()){
                result = this.operation.getArithmeticOperations()[this.operation.getPrevious()]( numbersInIntegerFormat[0], numbersInIntegerFormat[1] );

                if (this.operation.getPrevious() != '/'){
                    result /= 10**numbersInIntegerFormat[2];
                }
            }
            else {
                result = NaN;
            }

            console.log(result);
            if (isNaN(result)){

                result = this.errorMessage;
                returnValue = false;
            }
            else{
                result = result.toString();
            }
            console.log(`RESULT: ${result}`)
            this.firstNumber._value = result;

            return returnValue;
        },

        isCurrentNumberPointingToFirstNumber() {
            return this.currentNumber.getLocation() == 0;
        },

        isCurrentNumberPointingToSecondNumber() {
            return this.currentNumber.getLocation() == 1;
        },

        switchCurrentNumber() {
            if (this.isCurrentNumberPointingToFirstNumber()){
                this.currentNumber.setReference(this.secondNumber, 1);
            }
            else {
                this.currentNumber.setReference(this.firstNumber, 0);
            }
        },

        updateDisplay(value) {
            this.display = value;
        },

        clearDisplay() {
            this.firstNumber.clearValue();
            this.secondNumber.clearValue();
            this.currentNumber.setReference(this.firstNumber, 0);
            this.operation.clear();
            this.updateDisplay('');

            return true;
        }
    }

    calculator.initializeCurrentNumber()

    return calculator
}

export {getCalculator};