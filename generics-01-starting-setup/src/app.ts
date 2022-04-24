const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("promise resolved");
  }, 2000);
});
promise.then((data) => {
  console.log(data);
});

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "casey" }, { age: 31 });
console.log(mergedObj.name);

//-----------------------------------------

interface Length {
  length: number;
}

function countAndDescribe<T extends Length>(element: T): [T, string] {
  const descriptionText =
    element.length < 1
      ? "Received no value"
      : `Received ${element.length} elements`;
  return [element, descriptionText];
}

console.log(countAndDescribe("Hello"));

//------------------------------------

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

extractAndConvert({ name: "Casey" }, "name");

//-----------------------------------------------------

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("new text");
const numberStorage = new DataStorage<number>();
numberStorage.addItem(14);
const booleanStorage = new DataStorage<boolean>();
booleanStorage.addItem(true);

console.log(
  textStorage.getItems(),
  numberStorage.getItems(),
  booleanStorage.getItems()
);

//Generic type------------------------------------------------

//Partial---------------

interface CourseGoal {
  title: string;
  description: string;
  completeDate: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeDate = date;
  return courseGoal as CourseGoal;
}

//Read only

const namesArr: Readonly<string[]> = ["casey", "owen"];

// wont work because we set it to read only, pop wont work either
// namesArr.push("whatever")
