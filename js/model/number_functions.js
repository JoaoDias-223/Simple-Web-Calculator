let createNumber = (value = '') => {
    return {
        _value: String(value),

        getValue() {
            return this._value;
        },

        setValue(value) {
            this._value = value;
            return this;
        },

        appendValue(character) {
            if (character == '.' && this.isFloat()){
                return this;
            }

            return this.setValue(this._value + character);
        },

        clearValue() {
            return this.setValue('');
        },

        isFloat(){
            return this.getValue().includes('.');
        },

        getWholePart() {
            let whole = this.getValue();
            if (this.isFloat()){
                whole = this.getValue().split(".")[0];
            }
    
            return whole;
        },

        getDecimalPart(){
            let decimal = '';
            if (this.isFloat()){
                decimal = this.getValue().split(".")[1];
            }
    
            return decimal;
        }
    };
}

let createNumberPointer = (number=null, location=0) => {
    let numberPointer = {
        _reference: number,
        _location: location,

        getReference() {
            return this._reference;
        },

        getLocation() {
            return this._location;
        },

        setReference(newReference, newLocation) {
            this._reference = newReference;
            this._location = newLocation;

            return this;
        },
    }

    return numberPointer;
}

export {createNumber, createNumberPointer};