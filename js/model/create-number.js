let createNumber = (value = '') => {
    return {
        value: String(value),

        addCharacter(character) {
            this.value += character;
            return this;
        },

        clearValue() {
            this.value = '';
            return this;
        },

        setValue(value) {
            if (Number(value)){
                return [this.value, true];
            }

            return [this.value, false];
        },
    };
}

export {createNumber};