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
