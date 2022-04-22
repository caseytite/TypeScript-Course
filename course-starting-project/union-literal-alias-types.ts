//Union types and literal types

enum Types {
  STRING = "string",
  NUMBER = "number",
}
//type aliases
type MadeUpTypes = number | string;

const combineArgs = (
  input1: number | string, //union
  input2: MadeUpTypes, //same thing but uses the type alias syntax
  resultType: "number" | "string" //literal
) => {
  const result = {
    string: input1.toString() + " " + input2.toString(),
    number: +input1 + +input2,
  }[resultType];

  return result;
};

const addNums = combineArgs(1, 2, Types.NUMBER);
const addStrings = combineArgs("hello", "world", Types.STRING);

console.log(addNums);
console.log(addStrings);
