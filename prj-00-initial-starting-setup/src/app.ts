// input validations
interface Validatable {
  value?: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (validatableInput: Validatable) => {
  let isValid = true;
  if (validatableInput.required) {
    console.log(isValid);
    isValid = isValid && validatableInput.value?.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    console.log(isValid);
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
    console.log(isValid);
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    console.log(isValid);
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    console.log(isValid);

    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  console.log(isValid);
  return isValid;
};

//auto bind decorator

function autobind(_1: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return newDescriptor;
}

class ProjectList {
  templateEl: HTMLTemplateElement;
  containerEl: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.templateEl = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.containerEl = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.containerEl.insertAdjacentElement("beforeend", this.element);
  }
}

class ProjectInput {
  templateEl: HTMLTemplateElement;
  element: HTMLFormElement;
  containerEl: HTMLDivElement;
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    this.templateEl = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.containerEl = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputEl = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputEl = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputEl = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private handleUserInput(): [string, string, number] | void {
    const userEnteredTitle = this.titleInputEl.value;
    const userEnteredDescription = this.descriptionInputEl.value;
    const userEnteredPeople = this.peopleInputEl.value;

    const validTitle: Validatable = {
      value: userEnteredTitle,
      required: true,
      minLength: 5,
      maxLength: 20,
    };
    const validDesc: Validatable = {
      value: userEnteredDescription,
      required: true,
      minLength: 5,
      maxLength: 100,
    };
    const validPpl: Validatable = {
      value: +userEnteredPeople,
      required: true,
      min: 1,
      max: 10,
    };
    if (validate(validTitle) || validate(validDesc) || validate(validPpl)) {
      return [userEnteredTitle, userEnteredDescription, +userEnteredPeople];
    } else {
      alert("invalud input");
      return;
    }
  }

  private clearInputs() {
    this.titleInputEl.value = "";
    this.descriptionInputEl.value = "";
    this.peopleInputEl.value = "";
  }

  @autobind
  private handleSubmit(event: Event) {
    event.preventDefault();
    const userInput = this.handleUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, ppl] = userInput;
      console.log(title, desc, ppl);
    }
    this.clearInputs();
  }

  private attach() {
    this.containerEl.insertAdjacentElement("afterbegin", this.element);
  }
  private configure() {
    this.element.addEventListener("submit", this.handleSubmit);
  }
}

const projectInput1 = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
