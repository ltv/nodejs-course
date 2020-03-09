console.log('Hello World');

const a = 1; // Never change later
let b = 2; // Change change

// Trick: Always use `const`
// When you need to change the value then you can modify `const` -> `let`
//

const c = a + b;
console.log('Result: ', c);
console.log('Result: ' + c);
console.log(`Result should be: ${c}`)
console.warn('Hi All')
console.error('My Error')
