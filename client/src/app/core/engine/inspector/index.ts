import { ContainerChild, Sprite } from "pixi.js";
import EventManager from "../../eventManager";
import { ChangeOpbjectDataType, GameObjectType } from "@/types/engineTypes";
import {
  AssetType,
  GameSceneEventEnums,
  InspectorEventEnums,
} from "@/enums/userEventEnums";
import { uid } from "@/helper";

export class Inspector {
  public gameObjects: Array<GameObjectType> = [];
  private _canvas!: HTMLCanvasElement;

  constructor(public events: EventManager) {
    events.on(GameSceneEventEnums.dropedAsset, (data) => {
      this.addGameObject(data);
    });

    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        this.onGameSceneResize()
      } else {
        this.onGameSceneResize()
      }
    });
  }

  private findObjectByID(id: string): GameObjectType | null {
    return this.findObjectByIDRecursive(this.gameObjects, id);
  }

  private removeObjectRecursive(
    list: GameObjectType[],
    targetID: string
  ): GameObjectType[] {
    return list
      .filter((obj) => obj.id !== targetID)
      .map((obj) => ({
        ...obj,
        childs: this.removeObjectRecursive(obj.childs, targetID),
      }));
  }

  private findObjectByIDRecursive(
    list: GameObjectType[],
    id: string
  ): GameObjectType | null {
    for (const obj of list) {
      if (obj.id === id) return obj;

      const foundInChild = this.findObjectByIDRecursive(obj.childs, id);
      if (foundInChild) return foundInChild;
    }

    return null;
  }

  private getAllObjectsFlatRecursive(
    list: GameObjectType[],
    result: GameObjectType[]
  ) {
    for (const obj of list) {
      result.push(obj);
      this.getAllObjectsFlatRecursive(obj.childs, result);
    }
  }

  private getAllObjectsFlat(): GameObjectType[] {
    const result: GameObjectType[] = [];
    this.getAllObjectsFlatRecursive(this.gameObjects, result);
    return result;
  }

  private getObjectName(baseName: string) {
    let count = 1;
    let fileName = baseName;

    while (this.getAllObjectsFlat().find((asset) => asset.name === fileName)) {
      fileName = `${baseName} (${count})`;
      count++;
    }

    return fileName;
  }

  public addGameObject(data: { asset: AssetType; pixiObject: ContainerChild }) {
    this.gameObjects.push({
      type: data.asset.type,
      name: this.getObjectName(data.asset.name),
      id: uid(),
      gameObject: data.pixiObject,
      scene: "testScene",
      blobURL: data.asset.blobURL,
      childs: [],
      sceneData: {
        x: String(data.pixiObject.x),
        y: String(data.pixiObject.y),
        width: String(data.pixiObject.width),
        height: String(data.pixiObject.height),
        scale: data.pixiObject.scale.x,
        opacity: data.pixiObject.alpha,
        isActive: data.pixiObject.visible,
        rotation: data.pixiObject.rotation,
        ancor: [data.pixiObject.pivot.x, data.pixiObject.pivot.y],
      },
    });
  }

  public deleteGameObject(id: string) {
    const target = this.findObjectByID(id);
    if (!target) {
      throw new Error("target object is undefined (for delete)");
    }

    target.gameObject.destroy(true);
    this.gameObjects = this.removeObjectRecursive(this.gameObjects, id);

    this.events.emit(InspectorEventEnums.deleteGameObject, id);
  }

  public changeObjectParameter(id: string, data: ChangeOpbjectDataType) {
    const targetObj = this.findObjectByID(id);

    if (!targetObj) {
      throw new Error("targetObject is undefined");
    }

    // Helper function to support % values
    const getNumericValue = (
      value: string | number,
      fullSize: number
    ): number => {
      if (typeof value === "string" && value.trimEnd().endsWith("%")) {
        const cleaned = value.trimEnd().replace(/\s+%$/, "%").slice(0, -1);
        const percent = parseFloat(cleaned);
        if (!isNaN(percent)) {
          return (fullSize * percent) / 100;
        }
      }
      return Number(value);
    };

    switch (data.parameter) {
      case "scale":
        targetObj.sceneData.scale = Number(data.value);
        targetObj.gameObject.scale.set(Number(data.value), Number(data.value));
        break;

      case "x":
        targetObj.sceneData.x = String(data.value);
        targetObj.gameObject.x = getNumericValue(
          String(data.value),
          this._canvas.width
        );
        break;

      case "y":
        targetObj.sceneData.y = String(data.value);
        targetObj.gameObject.y = getNumericValue(
          String(data.value),
          this._canvas.height
        );
        break;

      case "width":
        targetObj.sceneData.width = String(data.value);
        targetObj.gameObject.width = getNumericValue(
          String(data.value),
          this._canvas.width
        );
        break;

      case "height":
        targetObj.sceneData.height = String(data.value);
        targetObj.gameObject.height = getNumericValue(
          String(data.value),
          this._canvas.height
        );
        break;

      case "opacity":
        targetObj.sceneData.opacity = Number(data.value);
        targetObj.gameObject.alpha = Number(data.value);
        break;

      case "visible":
        targetObj.sceneData.isActive = Boolean(data.value);
        targetObj.gameObject.visible = Boolean(data.value);
        break;

      case "rotation":
        targetObj.sceneData.rotation = Number(data.value);
        targetObj.gameObject.rotation = Number(data.value);
        break;

      case "ancor":
        targetObj.sceneData.ancor = data.value as [number, number];
        (targetObj.gameObject as Sprite).anchor.set(
          ...(data.value as [number, number])
        );
        break;

      default:
        console.error("Unknown Parameter:", data.parameter);
    }
  }

  set canvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  // public combineObject(
  //   child: InspectorObjectType,
  //   parent: InspectorObjectType
  // ) {
  //   // Remove child from tree (this creates new object tree)
  //   this.objects = this.removeObjectRecursive(this.objects, child.name);

  //   // Refetch updated parent from fresh tree
  //   const updatedParent = this.findObjectByName(parent.name);
  //   if (!updatedParent) {
  //     throw new Error("Parent object not found after tree update");
  //   }

  //   // Attach child to updated parent
  //   updatedParent.childs.push(child);
  //   updatedParent.gameObject.addChild(child.gameObject);
  // }

  // private findParentRecursive(
  //   list: InspectorObjectType[],
  //   childName: string
  // ): InspectorObjectType | null {
  //   for (const obj of list) {
  //     if (obj.childs.some((child) => child.name === childName)) {
  //       return obj;
  //     }

  //     const foundInChild = this.findParentRecursive(obj.childs, childName);
  //     if (foundInChild) return foundInChild;
  //   }

  //   return null;
  // }

  // public removeFromParent(
  //   childObject: InspectorObjectType,
  //   mainStage: ContainerChild
  // ): void {
  //   const parent = this.findParentRecursive(this.objects, childObject.name);

  //   if (!parent) {
  //     // If not found, it's already a top-level object — do nothing
  //     console.warn("Child has no parent. It's already top-level.");
  //     return;
  //   }

  //   // Remove from parent's childs array
  //   parent.childs = parent.childs.filter(
  //     (child) => child.name !== childObject.name
  //   );

  //   // Remove from parent's PIXI container
  //   parent.gameObject.removeChild(childObject.gameObject);
  //   mainStage.addChild(childObject.gameObject);

  //   // Optionally: push child to top-level (to make it independent again)
  //   this.objects.push(childObject);
  // }

  // get AllObject() {
  //   return this.objects;
  // }

  private onGameSceneResize() {
    const objects = this.getAllObjectsFlat();
    for (const obj of objects) {
      this.updategGameObjects(obj.id, obj.sceneData);
    }
  }

  // When screen resize or whatever...
  public updategGameObjects(
    id: string,
    sceneData: GameObjectType["sceneData"]
  ) {
    const targetObj = this.findObjectByID(id);
    if (!targetObj) {
      throw new Error("targetObject is undefined");
    }

    const getNumericValue = (
      value: string | number,
      fullSize: number
    ): number => {
      if (typeof value === "string" && value.trimEnd().endsWith("%")) {
        const cleaned = value.trimEnd().replace(/\s+%$/, "%").slice(0, -1);
        const percent = parseFloat(cleaned);
        if (!isNaN(percent)) {
          return (fullSize * percent) / 100;
        }
      }
      return Number(value);
    };

    const sceneWidth = this._canvas.width;
    const sceneHeight = this._canvas.height;

    console.log(sceneWidth, sceneHeight, "!!!!!!!!!!!!!!!!!!!!!!!")

    // Apply all values from sceneData
    targetObj.sceneData = { ...sceneData };
    targetObj.gameObject.x = getNumericValue(sceneData.x, sceneWidth);
    targetObj.gameObject.y = getNumericValue(sceneData.y, sceneHeight);
    targetObj.gameObject.width = getNumericValue(sceneData.width, sceneWidth);
    targetObj.gameObject.height = getNumericValue(
      sceneData.height,
      sceneHeight
    );

    targetObj.gameObject.scale.set(sceneData.scale, sceneData.scale);
    targetObj.gameObject.alpha = sceneData.opacity;
    targetObj.gameObject.visible = sceneData.isActive;
  }
}
