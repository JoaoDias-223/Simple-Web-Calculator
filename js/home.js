function getInput(button, calculator){
    calculator?.parseInput(button.innerHTML);
}

let calculator = {
    firstNumber: {
        value: '',
        hasDot: false,
    },
    secondNumber: {
        value: '',
        hasDot: false,
    },
    currentOperation: '',
    operationChanged: false,
    availableOperations: ["x", "/", "+", "-"],
    currentNumber: {
        reference: this.firstNumber,
        location: 0,
    },

    printCurrentStats(result=0){
        console.log(`
firstNumber = {${this.firstNumber.value}, ${this.firstNumber.hasDot}};
secondNumber = {${this.secondNumber.value}, ${this.secondNumber.hasDot}};
currentOperation = ${this.currentOperation};
currentNumber = {${this.currentNumber.reference.value}, ${this.currentNumber.location}};
result = ${result}
        `);
    },

    parseInput(value){
        if (this.currentNumber.reference == undefined){
            this.currentNumber.reference = this.firstNumber;
        }

        if (this.currentNumber.reference.value == "NaN"){
            this.currentNumber.reference.value = '';
        }

        if (this.availableOperations.includes(value)){
            this.currentOperation = value;
            this.operationChanged = true;
            this.secondNumber.value = '';
            this.secondNumber.hasDot = false;
            this.switchCurrentNumber();
            this.updateDisplay(value);
            return;
        }
        else if (value == "="){
            this.equalOperation();
            if (this.operationChanged) {
                this.switchCurrentNumber()
            };
            this.operationChanged = false;
        }
        else{
            this.updateCurrentNumber(value);
        }

        this.updateDisplay(this.currentNumber.reference.value);
    },

    switchCurrentNumber(){
        console.log("Called switchNumber!");
        if (this.currentNumber.location == 0) {
            this.currentNumber.location = 1;
            this.currentNumber.reference = this.secondNumber;
        }
        else{
            this.currentNumber.location = 0;
            this.currentNumber.reference = this.firstNumber;
        }
    },

    updateCurrentNumber(value) {
        if (value === '.'){
            if (!this.currentNumber.reference.hasDot){
                this.currentNumber.reference.value += value;
                this.currentNumber.reference.hasDot = true;
            }
        }
        else {
            this.currentNumber.reference.value += value;
        }
    },

    clearNumber(number) {
        number.value = '';
        number.hasDot = false;
    },

    clearDisplay(){
        this.display.content.innerHTML = '';
        this.clearNumber(this.firstNumber);
        this.clearNumber(this.secondNumber);
        this.currentOperation = '';
        this.currentNumber.reference = this.firstNumber;
    },

    updateDisplay(value){
        this.display.content.innerHTML = value;
    },

    IsNumberFloat(number){
        return number.includes('.')
    },

    equalOperation() {
        let numbers = this.parseFloat(this.firstNumber.value, this.secondNumber.value);
        console.log(numbers);
        let result = null;

        switch (this.currentOperation){
            case '+':
                result = this.add(numbers[0], numbers[1]);
                result /= numbers[2];
                break;
            case '-':
                result = this.subtract(numbers[0], numbers[1]);
                result /= numbers[2];
                break;
            case 'x':
                result = this.multiply(numbers[0], numbers[1]);
                result /= numbers[2];
                break;
            case '/':
                result = this.divide(numbers[0], numbers[1]);
                break;
            default:
                result = NaN;
        }

        result = result.toString();

        this.printCurrentStats(result);

        this.firstNumber.value = result;
        this.firstNumber.hasDot = this.IsNumberFloat(result);

        this.printCurrentStats(result);
    },

    getDecimalPart(number){
        let decimal = '';
        if (this.IsNumberFloat(number)){
            decimal = number.split(".")[1];
        }

        return decimal;
    },

    parseFloat(number1, number2){
        let factor = 1;

        if (this.IsNumberFloat(number1) || this.IsNumberFloat(number2)){
            console.log("There is a float!");
            let lengths = [this.getDecimalPart(number1).length, this.getDecimalPart(number2).length];
            factor = Math.max(...lengths);
        }
0
        console.log(factor);

        return [Number(number1)*factor, Number(number2)*factor, factor];
    },

    //Basic Operations
    add(number1, number2, factor){
        return number1 + number2; 
    },

    subtract(number1, number2){
        return number1 - number2;
    },

    multiply(number1, number2){
        return number1 * number2;
    },

    divide(number1, number2){
        if (number2 === 0){
            return NaN;
        }

        return number1/number2;
    },

    display: {
        content: document.getElementById("display-content"),
    },

    buttons:  {
        b0:         document.getElementById("button-0"),
        b1:         document.getElementById("button-1"),
        b2:         document.getElementById("button-2"),
        b3:         document.getElementById("button-3"),
        b4:         document.getElementById("button-4"),
        b5:         document.getElementById("button-5"),
        b6:         document.getElementById("button-6"),
        b7:         document.getElementById("button-7"),
        b8:         document.getElementById("button-8"),
        b9:         document.getElementById("button-9"),
        bDot:       document.getElementById("button-."),
        bEqual:     document.getElementById("button-="),
        bPlus:      document.getElementById("button-+"),
        bMinus:     document.getElementById("button--"),
        bProduct:   document.getElementById("button-x"),
        bDivision:  document.getElementById("button-/"),
        bClear:     document.getElementById("clear-button"),
    },
}

for (let button in calculator.buttons) {
    calculator.buttons[button].onclick = () => {getInput( calculator.buttons[button], calculator)};
}

calculator.buttons.bClear.onclick= () => {calculator.clearDisplay()};