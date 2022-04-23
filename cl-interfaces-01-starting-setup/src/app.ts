class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

const surf = new Department("Surfing");

console.log(surf);
