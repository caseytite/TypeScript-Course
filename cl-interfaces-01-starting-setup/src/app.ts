class Department {
  name: string;
  private surfers: string[] = [];
  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log(`The Department of ${this.name}`);
  }

  addSurfer(surfer: string) {
    this.surfers.push(surfer);
  }
  printSurferInfo() {
    console.log(this.surfers.length);
    console.log(this.surfers);
  }
}
// will be the class
console.log("Department", Department);
const surf = new Department("Surfing");

surf.describe();
//will be an object
console.log("Surfing", surf);

// const surfCopy = { name: "Surfers", describe: surf.describe };

// surfCopy.describe();
//will also be an object;
// console.log("Surfers", surfCopy);

surf.addSurfer("Casey");
surf.addSurfer("Owen");
surf.printSurferInfo();
