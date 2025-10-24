import { InspectorObjectType } from "../../inspector";

export class SceneControllers {
  private _gameObjects: Array<InspectorObjectType> = [];

  constructor() {}

  set gameObjects(objects: Array<InspectorObjectType>) {
    this._gameObjects = objects;

    this.updateEventListeners();
  }

  private updateEventListeners() {
    this.removeOldListenres();
    this.addListeners();
  }

  private removeOldListenres() {}

  private addListeners() {
    this._gameObjects.forEach((object) => {

        const sceneObj = object.gameObject;

        sceneObj.interactive = true;
        sceneObj.on("pointerover", () => {
            console.log("over")
        })
    })
  }
}
