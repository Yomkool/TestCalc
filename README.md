# The RPN CLI Calculator

[![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Replit](https://img.shields.io/badge/Replit-DD1200?style=for-the-badge&logo=Replit&logoColor=white)
</div>

<br/>

# What is RPN? (Reverse Polish Notation)
In reverse Polish notation, the operators follow their operands. For example, to add 3 and 4 together, the expression is 3 4 + rather than 3 + 4. The expression 3 − 4 + 5 in conventional notation is 3 4 − 5 + in reverse Polish notation: 4 is first subtracted from 3, then 5 is added to it.

The concept of a stack, a last-in/first-out construct, is integral to the left-to-right evaluation of RPN. In the example 3 4 -, first the 3 is put onto the stack, then the 4; the 4 is now on top and the 3 below it. The subtraction operator removes the top two items from the stack, performs 3 - 4, and puts the result of -1 onto the stack.

The common terminology is that added items are pushed on the stack and removed items are popped.

The advantage of reverse Polish notation is that it removes the need for order of operations and parentheses that are required by infix notation and can be evaluated linearly, left-to-right. For example, the infix expression (3 × 4) + (5 × 6) becomes 3 4 × 5 6 × + in reverse Polish notation.

# High Level Description
This application is a command-line interface calculator that utilizes the concept of Reverse Polish Notation (RPN) to calculate mathematical expressions. The application is built with Node.js, tested with Jest, and follows ESLint rules for code quality.

<br/>

# Technical Choices
The application is designed to be a CLI tool, as RPN inputs are naturally linear and work well with a command-line interface. Node.js was used due to its excellent support for command-line applications and I/O operations. Jest was used for testing due to its comprehensive feature set and simplicity. ESLint was used to ensure a consistent code style and catch potential errors early.

<br/>

# Getting Started
1. Run 'npm install' to install necessary dependencies.
2. Run 'npm start' or 'node calculator.js' in terminal to begin.
3. Enter numbers and/or valid operations (+, -, *, /) on a single line with spaces between each input, or on separate lines without spaces.

<br/>

## Features
1. Comprehensive testing suite using Jest. Run 'npm test' to execute.
2. Stack tracking. Enter 's' during operation to see your current number stack.
3. Error handling. Erroneous inputs are handled as to not interrupt user flow.

<br/>

| Developed By       | Github          | LinkedIn        |
| :------------------: | :-------------: | :-------------: |
| PJ Bannon | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Yomkool) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/paulbannon/) |