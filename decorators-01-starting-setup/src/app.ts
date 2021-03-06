function Logger(logString: string) {
  return function (constructor: Function) {
    console.log("logging" + logString);
    console.log(constructor);
  };
}

function withTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger(" Person Class")
@withTemplate("<h1>My Person</h1>", "app")
class Person {
  name = "Casey";

  constructor() {
    console.log("Creating person");
  }
}

const person1 = new Person();

console.log(person1);

//------------------property decoratorss

function Log(target: any, propertyName: string | symbol) {
  console.log("property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, description: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(description);
}

function Log3(
  target: any,
  name: string | symbol,
  description: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(description);
}

function Log4(target: any, name: string | symbol, index: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(index);
}

class Product {
  @Log
  title: string;
  private _price: number;
  @Log2
  set price(val: number) {
    this._price = val;
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function AutoBind(_: any, __: string, description: PropertyDescriptor) {
  const originalMethod = description.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "clicked!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const firstPrinter = new Printer();

const button = document.querySelector("button")!;
// button.addEventListener("click", firstPrinter.showMessage.bind(firstPrinter));
button.addEventListener("click", firstPrinter.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}
function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positve",
    ],
  };
}
function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValidated = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValidated = isValidated && !!obj[prop];
          break;
        case "positve":
          isValidated = isValidated && obj[prop] > 0;
          break;
      }
    }
  }
  return isValidated;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;
  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("invalid input");
    return;
  }

  console.log(createdCourse);
});
