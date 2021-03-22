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
        _names: {
            '+': 'addition',
            '-': 'subtraction',
            'x': 'multiplication',
            '/': 'division',
        },

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

        getNames() {
            return this._names;
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
    if (b == 0)
        return NaN;

    return a / b;
}

export {createOperation};