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
    availableOperations: ['x', '/', '+', '-'],
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
        let setOP = false;

        if (this.currentNumber.reference == undefined){
            this.currentNumber.reference = this.firstNumber;
        }

        if (this.currentNumber.reference.value == "NaN"){
            this.currentNumber.reference.value = '';
        }

        this.availableOperations.forEach((operation)=>{
            if (value === operation){
                this.currentOperation = value;
                this.switchCurrentNumber();
                this.updateDisplay(value);
                setOP = true;
            } 
        });

        if (setOP){
            return;
        }

        if (value == '='){
            this.equalOperation();
        }
        else {
            this.updateCurrentNumber(value)
        }

        this.updateDisplay(this.currentNumber.reference.value);
    },

    switchCurrentNumber(){
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
        let result;

        switch (this.currentOperation){
            case '+':
                result = this.add(Number(this.firstNumber.value), Number(this.secondNumber.value));
                break;
            case '-':
                result = this.subtract(Number(this.firstNumber.value), Number(this.secondNumber.value));
                break;
            case 'x':
                result = this.multiply(Number(this.firstNumber.value), Number(this.secondNumber.value));
                break;
            case '/':
                result = this.divide(Number(this.firstNumber.value), Number(this.secondNumber.value));
                break;
            default:
                result = NaN;
                this.switchCurrentNumber();     //THIS IS A REALLY BAD SOLUTION, I'M ONLY DOING THIS BECAUSE WHEN THE RESULT IS NOT A NUMBER THE CURRENT NUMBER REFERENCE BUGS OUT AND POINTS TO THE SECOND NUMBER INSTEAD OF THE FIRST ONE;
        }

        result = result.toString();

        this.printCurrentStats(result);

        this.firstNumber.value = result;
        this.firstNumber.hasDot = this.IsNumberFloat(result);

        this.secondNumber.value = '';
        this.secondNumber.hasDot = false;
        
        this.switchCurrentNumber();
        this.currentOperation = '';

        this.printCurrentStats(result);
    },

    add(number1, number2){
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
        b0: document.getElementById("button-0"),
        b1: document.getElementById("button-1"),
        b2: document.getElementById("button-2"),
        b3: document.getElementById("button-3"),
        b4: document.getElementById("button-4"),
        b5: document.getElementById("button-5"),
        b6: document.getElementById("button-6"),
        b7: document.getElementById("button-7"),
        b8: document.getElementById("button-8"),
        b9: document.getElementById("button-9"),
        bDot: document.getElementById("button-."),
        bEqual: document.getElementById("button-="),
        bPlus: document.getElementById("button-+"),
        bMinus: document.getElementById("button--"),
        bProduct: document.getElementById("button-x"),
        bDivision: document.getElementById("button-/"),
        bClear: document.getElementById("clear-button"),
    },
}

for (let button in calculator.buttons) {
    calculator.buttons[button].onclick = () => {getInput( calculator.buttons[button], calculator)};
}

calculator.buttons.bClear.onclick= () => {calculator.clearDisplay()};