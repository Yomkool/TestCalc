const readLine = require('readline');

const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  //declare an array of possible operations to compare against input
  const operations = {
        '+': ((x, y) => x + y),
        '-': ((x, y) => x - y),
        '/': ((x, y) => x / y),
        '*': ((x, y) => x * y)
    };

  //initialize stack for user inputs to keep track of current
  const inputStack = []

  readline.on(`line`, (input) => {
    console.log(`registered ${input}`);
    switch (input) {
        case 'q':
            console.log('calculator closing')
            readline.close();
            //break to prevent other actions in switch
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
                        console.log(`${input} is not a number and has not been included in this calculation`)
                    } else {
                        inputStack.push(numInput);
                    }
                }
            }
            //log most recent calculation
            console.log(inputStack[inputStack.length-1])
    }
  });
  