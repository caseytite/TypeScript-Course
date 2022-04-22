//role here is a tuple and will only be allowed in that format, pushing to role is an exception but if we attempted to reassign it to [1,1] or [1,2,3] it would not be allowed

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // tuple
} = {
  name: "Casey",
  age: 31,
  hobbies: ["Surfing", "Motorbikes", "Guitar", "Baking"],
  role: [1, "programmer"],
};

let arr: any[];
arr = [1, "string", true, { a: "b" }, [1, 2]];

arr.forEach((item) => console.log(item));

// enums
// if we assign a number to the first constant below the count will start at that number
// other types can be assigned as well

enum Role {
  WILL_BE_ZER0,
  WILL_BE_ONE,
  WILL_BE_TWO,
}
enum Nums {
  WILL_BE_FIVE = 5,
  WILL_BE_SIX,
  WILL_BE_SEVEN,
}

const motorbikes = {
  yamaha: "R1",
  honda: "CB-RRR",
  ducati: "Monster",
  someNumber: Role.WILL_BE_ONE,
  someOtherNumber: Nums.WILL_BE_SIX,
};

console.log(motorbikes.someNumber); //1
console.log(motorbikes.someOtherNumber); //6
