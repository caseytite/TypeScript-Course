//project type
enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

//Project State Manegement
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

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
    isValid = isValid && validatableInput.value?.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
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

//comonent base class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  containerEl: T;
  element: U;

  constructor(
    templateID: string,
    containerElID: string,
    insertAtStart: boolean,
    newElementID?: string
  ) {
    this.templateEl = document.getElementById(
      templateID
    )! as HTMLTemplateElement;
    this.containerEl = document.getElementById(containerElID)! as T;
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementID) {
      this.element.id = newElementID;
    }
    this.attach(insertAtStart);
  }
  private attach(insertAtBeginning: boolean) {
    this.containerEl.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const projectInput1 = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
