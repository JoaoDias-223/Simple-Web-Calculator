let createOperation = () => {
    let operation = {
        _arithmetic: {
            '+': add,
            '-': subtract,
            'x': multiply,
            '/': divide,
        },
        _current: '',
        _previous: '',

        getCurrent(){
            return this._current;
        },

        getPrevious(){
            return this._previous;
        },

        setCurrent(symbol) {
            this._previous = this._current;
            this._current = symbol;
        },

        getArithmeticOperations() {
            return this._arithmetic;
        },

        isPreviousOperationArithmetic(){
            return Object.keys(this.getArithmeticOperations()).includes(this.getPrevious());
        },

        isCurrentOperationArithmetic() {
            return Object.keys(this.getArithmeticOperations()).includes(this.getCurrent());
        },

        isSymbolArithmetic(symbol){
            return Object.keys(this.getArithmeticOperations()).includes(symbol);
        },

        clear() {
            this._current= '';
            this._previous = '';
        },

    }

    return operation;
}

let add = (a, b) => {
    return a + b;
}

let subtract = (a, b) => {
    return a - b;
}

let multiply = (a, b) => {
    return a * b;
}

let divide = (a, b) => {
    return a / b;
}

export {createOperation};