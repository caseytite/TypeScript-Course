import { Component } from "./baseComponent.js";
import { autobind } from "../decorators/autobind.js";
import { Validatable, validate } from "../util/validation.js";
import { projectState } from "../state/projectState.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

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
  }

  configure() {
    this.element.addEventListener("submit", this.handleSubmit);
  }

  renderContent(): void {}

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
      projectState.addProject(title, desc, ppl);
    }
    this.clearInputs();
  }
}
