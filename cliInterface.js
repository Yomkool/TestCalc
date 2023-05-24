const readLine = require("readline");
const Calculator = require("./calculator");

const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Initialize new calculator instance for use in the cli
const calculator = new Calculator();

// Instructions for the user
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("Welcome to the RPN Calculator!");
console.log("Enter integers and operators ('+', '-', '*', '/') separated by spaces");
console.log("Enter 'tutorial' for an explanation on how to use this calculator.")
console.log("Enter 'q' to exit");
console.log("Enter 'cmd' to see all available commands");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

// Use readline.on for continuous user input
readline.on(`line`, (input) => {
    // Force lower case for switch-case matching
    input = input.toLowerCase();
    switch (input) {
        // Show user available commands
        case "cmd":
            console.log("\nEnter 'q' to exit");
            console.log("Enter 'tutorial' for an explanation on how to use this calculator.")
            console.log("Enter 'stack' to view the current order of inputs");
            console.log("Enter 'back' to remove the most recent numerical input");
            console.log("Enter 'clear' to remove all current inputs");
            console.log("Enter 'history' to see all operations this session");
            console.log("Enter integers and operators ('+', '-', '*', '/') separated by spaces or lines to begin calculating\n");
            break;
        //Close calculator
        case "q":
            console.log("\nCalculator closing\n");
            readline.close();
            // Break to prevent other actions in switch
            break;
        // Display the current stack to the user
        case "stack":
            // Break stack-case into logical outputs for the end user based on stack size
            if(calculator.inputStack.length === 1){
                console.log(`The current operand is ${calculator.inputStack}`);
            } else if(calculator.inputStack.length === 0){
                console.log(`There are no operands`);
            }else {
                console.log(`The current operands are ${calculator.inputStack}`);
            }
            break;
        //Remove the most recent operand on the stack, if able
        case "back":
            // Check if back-case is legal
            if(calculator.inputStack.length > 1){
                // Store removed value for user clarity
                let removedInput = calculator.inputStack.pop();
                // Tell the user the current state of the calculator
                if(calculator.inputStack.length > 1){
                    console.log(`${removedInput} has been removed. The two current operands are ${calculator.inputStack[calculator.inputStack.length-2]} and ${calculator.inputStack[calculator.inputStack.length-1]}`);
                }
                else if(calculator.inputStack.length === 1){
                    // Check if any operations have been performed for console log clarity
                    if(calculator.performedOperation === false){
                        console.log(`${removedInput} has been removed. The only operand is ${calculator.inputStack[0]}`)
                    } else {
                        console.log(`${removedInput} has been removed. The most recent result remaining is ${calculator.inputStack[0]}`);
                    }
                }
            } else if (calculator.inputStack.length === 1) {
                let removedInput = calculator.inputStack.pop();
                console.log(`${removedInput} has been removed. There are currently no operands on the stack.`)
            } else {
                console.log("There is nothing to remove from the stack. Please enter integers followed by operations to continue. Enter 'cmd' to see a list of all available commands.")
            }
            break;
        // Reinitialize stack to be empty
        case "clear":
            console.log("All inputs removed.")
            calculator.inputStack = [];
            break;
        // Display operation history to user
        case "history":
            if (calculator.performedOperation){
                calculator.operationHistory.forEach((item)=>{
                    console.log(item);
                })
            } else {
                console.log("No operations performed this session.")
            }
            break;
        // Give a step-by-step breakdown on how the calculator works to the user
        case "tutorial":
            console.log("\nWelcome to the tutorial!");
            console.log("This calculator uses Reverse Polish Notation (RPN). Here are some basics:");
            console.log("1. In RPN, all integers (operands) are entered first, followed by the operations.");
            console.log("   For example, to add 3 and 4, you would enter '3 4 +' instead of '3 + 4'.");
            console.log("2. Enter your integers and operations separated by spaces. For example: '5 3 4 + *'.");
            console.log("   This would calculate 5 * (3 + 4).");
            console.log("3. The operators supported are '+', '-', '*', and '/'.");
            console.log("4. Enter 'q' to quit the calculator.");
            console.log("5. Enter 'stack' to view the current stack of numbers.");
            console.log("6. Enter 'back' to remove the most recent number from the stack.");
            console.log("7. Enter 'clear' to clear the stack of all numbers.");
            console.log("8. Enter 'history' to see all operations performed in this session.");
            console.log("9. Enter 'cmd' to see all available commands again.");
            console.log("Happy Calculating!\n")
            break;
        // Any other input
        default:{
            // Create an array of inputs to iterate through
            let singleLineInputs = input.split(" ");
            for(let item of singleLineInputs){
                // If the input is an operator
                if(item in calculator.operations){
                    const errorMsg = calculator.performOperation(item);
                    // Set performedOperation to true for clarity in outputs
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
                console.log("The stack is currently empty, please enter more integers");
            }
        }
    }
});
