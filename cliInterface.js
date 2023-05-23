const readLine = require("readline");
const Calculator = require("./calculator");

const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const calculator = new Calculator();

// Instructions for the user
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("Welcome to the calculator!");
console.log("Enter numbers and operators ('+', '-', '*', '/') separated by spaces");
console.log("Enter 'q' to exit");
console.log("Enter 'stack' to view the current order of inputs");
console.log("Enter 'back' to remove the most recent numerical input");
console.log("Enter 'clear' to remove all current inputs");
console.log("Enter 'history' to see all operations this session");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

readline.on(`line`, (input) => {
    input = input.toLowerCase();
    switch (input) {
        case "q":
            console.log("Calculator closing");
            readline.close();
            // Break to prevent other actions in switch
            break;
        case "stack":
            if(calculator.inputStack.length === 1){
                console.log(`The current input is ${calculator.inputStack}`);
            } else if(calculator.inputStack.length === 0){
                console.log(`There are no inputs`);
            }else {
                console.log(`The current inputs are ${calculator.inputStack}`);
            }
            break;
        case "back":
            if(calculator.inputStack.length > 1){
                calculator.inputStack.pop();
                if(calculator.inputStack.length === 1){
                    console.log(`The current input is now ${calculator.inputStack}`)
                } else {
                    console.log(`The current inputs are now ${calculator.inputStack}`)
                }
               
            }
            break;
        case "clear":
            console.log("All inputs removed.")
            calculator.inputStack = [];
            break;
        case "history":
            calculator.operationHistory.forEach((item)=>{
                console.log(item);
            })
            break;
        default:{
            // Create an array of inputs to iterate through
            let singleLineInputs = input.split(" ");
            for(let item of singleLineInputs){
                // If the input is an operator
                if(item in calculator.operations){
                    const errorMsg = calculator.performOperation(item);
                    calculator.performedOperation = true;
                    if (errorMsg) console.log(errorMsg);
                } else {
                    const errorMsg = calculator.addNumber(item);
                    if (errorMsg) console.log(errorMsg);
                }
            }
            // Log most recent calculation
            if(calculator.inputStack.length > 1){
                console.log(`The two current operands are ${calculator.inputStack[calculator.inputStack.length-2]} and ${calculator.inputStack[calculator.inputStack.length-1]}`);
            }
            // Log the most recent result
            else if(calculator.inputStack.length === 1){
                // Check if any operations have been performed for console log clarity
                if(calculator.performedOperation === false){
                    console.log(`The only operand is ${calculator.inputStack[0]}`)
                } else {
                    console.log(`The most recent result is ${calculator.inputStack[0]}`);
                }
            }
            // Log an empty stack
            else {
                console.log("The stack is currently empty, please enter more numbers");
            }
        }
    }
});
