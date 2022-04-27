namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    get persons() {
      return this.project.people === 1 ? "person" : "people";
    }

    constructor(hostID: string, project: Project) {
      super("single-project", hostID, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }

    @autobind
    onDragStart(event: DragEvent): void {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    onDragEnd(_: DragEvent): void {}
    configure() {
      this.element.addEventListener("dragstart", this.onDragStart);
      this.element.addEventListener("dragend", this.onDragEnd);
    }

    renderContent(): void {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.project.people.toString() + " " + this.persons;
      this.element.querySelector("p")!.textContent =
        this.project.description.toString();
    }
  }
}
