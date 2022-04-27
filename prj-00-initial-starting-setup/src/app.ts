/// <reference path="model/dragDrop.ts" />
/// <reference path="model/projectModel.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="state/projectState.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/baseComponent.ts" />
/// <reference path="components/projectItem.ts" />
/// <reference path="components/projectList.ts" />
/// <reference path="components/projectInput.ts" />

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
