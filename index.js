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
            //must break to prevent other actions in switch
            break;
        default:
            let singleLineInputs = input.split(' ')
            
    }
  });
  