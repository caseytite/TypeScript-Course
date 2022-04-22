const add = (num1: number, num2: number, showResult: boolean) => {
  return showResult ? num1 + num2 : false;
};

const number1 = "5";
const number2 = 3.4;
const isTrue = false;

const result = add(+number1, +number2, isTrue);
console.log(result);
