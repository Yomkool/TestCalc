class Calculator {
    constructor() {
        // Declare possible operations
        this.operations = {
            "+": ((x, y) => x + y),
            "-": ((x, y) => x - y),
            "/": ((x, y) => {
                // Cut off return length
                let result = x / y;
                return Number(result.toFixed(3));
            }),
            "*": ((x, y) => {
                // Cut off return length
                let result = x * y;
                return Number(result.toFixed(3));
            }),
        };

        // Initialize stack for user inputs to keep track of current nums
        this.inputStack = [];
        // Store operation history
        this.operationHistory = [];
        // Store if any operations have been performed for user log clarity
        this.performedOperation = false;
    }

    performOperation(item) {
        // Check if the operation is able to be performed based on amount of numerical inputs
        if(this.inputStack.length < 2){
            return "Unable to perform operation. Please input more integers.";
        }
        // Deconstruct with y first so the operators work in the intended order of the given examples.
        const [y, x] = [this.inputStack.pop(), this.inputStack.pop()];
        // Need to check for divide by zero here so inputStack doesn't completely reset
        if(item === "/" && y === 0){
            this.inputStack.push(x);
            this.inputStack.push(y);
            return "Cannot divide by zero, try another operation or add additional integers first. Enter 'stack' to view remaining operands";
        }
        // Push result onto the stack for next operations
        let tempResult = this.operations[item](x, y);
        this.inputStack.push(tempResult);
        this.operationHistory.push(`${x} ${item} ${y} = ${tempResult}`);
        //return null so no error is thrown
        return null;
    }
    

    addNumber(item) {
        // Force int / erroneous item check
        let numInput = parseInt(item);
        if(isNaN(numInput)){
            return `There was an additional space or an invalid input which has been removed`;
        } else {
            this.inputStack.push(numInput);
            //return null so no error is thrown
            return null;
        }
    }
}

module.exports = Calculator;
