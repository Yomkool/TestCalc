//import spawn function from child_process module in node
const { spawn } = require('child_process');
const path = require('path');
const { stdin } = require('process');

test('Calculator correctly calculates multi-line RPN expression', (done) => {
    //run the calculator
    const calculator = spawn('node', [path.join(__dirname, 'calculator.js')]);

    //declare a variable to accumulate the output from the calculator process
    let output = '';

    //event listener so anything the calculator writes is stored
    calculator.stdout.on('data', (data) => {
        output += data;
    });

    //test inputs
    calculator.stdin.write('5\n');
    calculator.stdin.write('8\n');
    calculator.stdin.write('+\n');
    calculator.stdin.end();

    calculator.stdout.on('end', () => {
        //splits the output into lines
        const lines = output.trim().split('\n');
        //get the last line of output
        const lastLine = lines[lines.length - 1]; 
        //check the last line
        expect(lastLine).toBe('The only operand is 13');
        done();
    })
})

test('Calculator correctly calculates single-line RPN expression', (done) => {
    //run the calculator
    const calculator = spawn('node', [path.join(__dirname, 'calculator.js')]);

    //declare a variable to accumulate the output from the calculator process
    let output = '';

    //event listener so anything the calculator writes is stored
    calculator.stdout.on('data', (data) => {
        output += data;
    });

    //test inputs
    calculator.stdin.write('5 5 5 8 + + -\n');

    //listener for ending
    calculator.stdout.on('end', () => {
        //splits the output into lines
        const lines = output.trim().split('\n');
        //get the last line of output
        const lastLine = lines[lines.length - 1]; 
        //check the last line
        expect(lastLine).toBe('The only operand is -13');
        done();
    });

    calculator.stdin.end();
});

test('Calculator correctly calculates complex multi-line RPN expression', (done) => {
    //run the calculator
    const calculator = spawn('node', [path.join(__dirname, 'calculator.js')]);

    //declare a variable to accumulate the output from the calculator process
    let output = '';

    //event listener so anything the calculator writes is stored
    calculator.stdout.on('data', (data) => {
        output += data;
    });

    //test inputs
    calculator.stdin.write('-3\n');
    calculator.stdin.write('-2\n');
    calculator.stdin.write('*\n');
    calculator.stdin.write('5\n');
    calculator.stdin.write('+\n');
    calculator.stdin.end();

    calculator.stdout.on('end', () => {
        //splits the output into lines
        const lines = output.trim().split('\n');
        //get the last line of output
        const lastLine = lines[lines.length - 1]; 
        //check the last line
        expect(lastLine).toBe('The only operand is 11');
        done();
    })
})

test('Calculator correctly calculates RPN expression with decimal output', (done) => {
    //run the calculator
    const calculator = spawn('node', [path.join(__dirname, 'calculator.js')]);

    //declare a variable to accumulate the output from the calculator process
    let output = '';

    //event listener so anything the calculator writes is stored
    calculator.stdout.on('data', (data) => {
        output += data;
    });

    //test inputs
    calculator.stdin.write('5\n');
    calculator.stdin.write('9\n');
    calculator.stdin.write('1\n');
    calculator.stdin.write('-\n');
    calculator.stdin.write('/\n');
    calculator.stdin.end();

    calculator.stdout.on('end', () => {
        //splits the output into lines
        const lines = output.trim().split('\n');
        //get the last line of output
        const lastLine = lines[lines.length - 1]; 
        //check the last line
        expect(lastLine).toBe('The only operand is 0.625');
        done();
    })
})

test('Calculator correctly provides the user with the current stack', (done) => {
    //run the calculator
    const calculator = spawn('node', [path.join(__dirname, 'calculator.js')]);

    //declare a variable to accumulate the output from the calculator process
    let output = '';

    //event listener so anything the calculator writes is stored
    calculator.stdout.on('data', (data) => {
        output += data;
    });

    //test inputs
    calculator.stdin.write('2\n');
    calculator.stdin.write('3\n');
    calculator.stdin.write('4\n');
    calculator.stdin.write('5\n');
    calculator.stdin.write('s\n');
    calculator.stdin.end();

    calculator.stdout.on('end', () => {
        //splits the output into lines
        const lines = output.trim().split('\n');
        //get the last line of output
        const lastLine = lines[lines.length - 1]; 
        //check the last line
        expect(lastLine).toBe('The current inputs are 2,3,4,5');
        done();
    })
})

test('Calculator correctly displays the current operands to the user', (done) => {
    //run the calculator
    const calculator = spawn('node', [path.join(__dirname, 'calculator.js')]);

    //declare a variable to accumulate the output from the calculator process
    let output = '';

    //event listener so anything the calculator writes is stored
    calculator.stdout.on('data', (data) => {
        output += data;
    });

    //test inputs
    calculator.stdin.write('5\n');
    calculator.stdin.write('9\n');
    calculator.stdin.write('1\n');
    calculator.stdin.end();

    calculator.stdout.on('end', () => {
        //splits the output into lines
        const lines = output.trim().split('\n');
        //get the last line of output
        const lastLine = lines[lines.length - 1]; 
        //check the last line
        expect(lastLine).toBe('The two current operands are 9 and 1');
        done();
    })
})

test('Calculator correctly removes invalid inputs without breaking functionality', (done) => {
    //run the calculator
    const calculator = spawn('node', [path.join(__dirname, 'calculator.js')]);

    //declare a variable to accumulate the output from the calculator process
    let output = '';

    //event listener so anything the calculator writes is stored
    calculator.stdout.on('data', (data) => {
        output += data;
    });

    //test inputs
    calculator.stdin.write('5 t 4 6 +\n');
    calculator.stdin.end();

    calculator.stdout.on('end', () => {
        //splits the output into lines
        const lines = output.trim().split('\n');
        //get the last line of output
        const lastLine = lines[lines.length - 1]; 
        //get 2nd to last line
        const secondLastLine = lines[lines.length - 2]
        expect(secondLastLine).toBe('There was an additional space or an invalid input which has been removed');
        expect(lastLine).toBe('The two current operands are 5 and 10');
        done();
    })
})

test('Calculator closes correctly', (done) => {
    //run the calculator
    const calculator = spawn('node', [path.join(__dirname, 'calculator.js')]);

    //declare a variable to accumulate the output from the calculator process
    let output = '';

    //event listener so anything the calculator writes is stored
    calculator.stdout.on('data', (data) => {
        output += data;
    });

    //test inputs
    calculator.stdin.write('q\n');
    calculator.stdin.end();

    calculator.stdout.on('close', (data) => {
        //splits the output into lines
        const lines = output.trim().split('\n');
        //get the last line of output
        const lastLine = lines[lines.length - 1]; 
        //check the last line
        expect(lastLine).toBe('calculator closing');
        done();
    })
})