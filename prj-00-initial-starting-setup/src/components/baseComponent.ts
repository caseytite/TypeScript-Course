export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
