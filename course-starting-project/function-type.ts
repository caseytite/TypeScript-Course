const add = (n1: number, n2: number) => {
  return n1 + n2;
};

// A function that in JS returns undefined because of no return statement, in TS returns a type of void, unless there is a return statement where it then does return undefined
const printResult = (num: number) => {
  console.log("Result: " + num);
};

printResult(add(5, 6));

// Function is also a type

//Whats is going on here is we are assigning functionVariable to a function type where that function takes 2 arguments and they need to be numbers and return a number

let functionVariable: (a: number, b: number) => number;

functionVariable = add;

console.log(functionVariable(8, 8));

// how to pass callbacks

const hasCallback = (n1: number, n2: number, cb: (a: number) => number) => {
  const result = n1 + n2;

  return cb(result);
};
const printCallback = (n: number) => {
  return n;
};

// we dont have to specify the value of the callback here because it is declared in the definition of hasCallback
const callbackExample = hasCallback(14, 14, printCallback);
const anonCallback = hasCallback(5, 6, (output) => {
  return output;
});

console.log(callbackExample);
console.log(anonCallback);
