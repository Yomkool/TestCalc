const readLine = require('readline');

const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  //declare an array of possible operations to compare against input
  const operations = {
        '+': ((x, y) => x + y),
        '-': ((x, y) => x - y),
        '/': ((x, y) => {
            //impossible input check
            if(y === 0){
                console.log("Cannot divide by zero, calculator reset");
            } else {
                //cut off return length
                let result = x / y;
                return Number(result.toFixed(3));
            }
        }),
        '*': ((x, y) => {
            //cut off return length
            let result = x * y;
            return Number(result.toFixed(3));
        }),
    };

  //initialize stack for user inputs to keep track of current
  const inputStack = []

    //instrucitons for the user
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("Welcome to the calculator!")
    console.log("Enter numbers and operators ('+', '-', '*', '/') separated by spaces")
    console.log("Enter 'q' to exit or 's' to view the current order of inputs")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

  readline.on(`line`, (input) => {
    switch (input) {
        case 'q':
            console.log('calculator closing')
            readline.close();
            //break to prevent other actions in switch
            break;
        case 's':
            console.log(`The current inputs are ${inputStack}`)
            break;
        default:
            //create an array of inputs to iterate through
            let singleLineInputs = input.split(' ')
            for(let item of singleLineInputs){
                //if the input is an operator
                if(item in operations){
                    //check if the operation is able to be performed based on amount of numerical inputs
                    if(inputStack.length < 2){
                        console.log('Unable to perform operation. Please input more numbers.');
                        return;
                    }
                    //deconstruct with y first so the operators work in the intended order of the given examples.
                    const [y, x]= [inputStack.pop(), inputStack.pop()];
                    //push result onto the stack for next operations
                    inputStack.push(operations[item](x,y));
                } else {
                    //force int / erroneous item check
                    let numInput = parseInt(item);
                    if(isNaN(numInput)){
                        console.log(`There was an additional space or an invalid input which has been removed`)
                    } else {
                        inputStack.push(numInput);
                    }
                }
            }
            //log most recent calculation
            if(inputStack.length > 1){
                console.log(`The two current operands are ${inputStack[inputStack.length-2]} and ${inputStack[inputStack.length-1]}`)
            } else {
                console.log(`The only operand is ${inputStack[inputStack.length-1]}`)
            }
            
    }
  });
  