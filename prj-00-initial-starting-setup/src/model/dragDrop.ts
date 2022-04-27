namespace App {
  export interface Draggable {
    onDragStart(event: DragEvent): void;
    onDragEnd(event: DragEvent): void;
  }

  export interface DragTarget {
    onDragOver(event: DragEvent): void;
    onDrop(event: DragEvent): void;
    onLeave(event: DragEvent): void;
  }
}
