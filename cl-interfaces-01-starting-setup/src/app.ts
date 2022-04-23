class Surfing {
  private surfers: string[] = [];

  constructor(private readonly id: number, public name: string) {}

  describe(this: Surfing) {
    console.log(`The has the id of ${this.id} with the name of ${this.name}`);
  }

  addSurfer(surfer: string) {
    this.surfers.push(surfer);
  }
  printSurferInfo() {
    console.log(this.surfers.length);
    console.log(this.surfers);
  }
}

// this sub class will inheirit the methods from the class it extends
class Shortboard extends Surfing {
  admins: string[];
  constructor(id: number, admins: string[]) {
    super(id, "Shortboard");
    this.admins = admins;
  }
}
// will be the class
// console.log("Surf", Surfing);
const surf = new Surfing(1, "Surf");

surf.describe();
//will be an object
// console.log("Surfing", surf);

surf.addSurfer("Casey");
surf.addSurfer("Owen");
surf.printSurferInfo();

const short = new Shortboard(2, ["Casey"]);
short.addSurfer("Casey");
short.addSurfer("Owen");
short.describe();
console.log(short);
