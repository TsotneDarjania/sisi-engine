import { ContainerChild, Sprite } from "pixi.js";
import { ChangeOpbjectDataType } from "../..";

export type InspectorObjectType = {
  type: string;
  name: string;
  gameObject: ContainerChild;
  sceneData: {
    x: string;
    y: string;
    width: string;
    height: string;
    opacity: number;
    scale: number;
    isActive: boolean;
    rotation: number;
    ancor: [number, number];
  };
  scene: string;
  assetFile: File;
  assetSRC: string;
  childs: InspectorObjectType[];
};

export class Inspector {
  objects: Array<InspectorObjectType> = [];

  private removeObjectRecursive(
    list: InspectorObjectType[],
    targetName: string
  ): InspectorObjectType[] {
    return list
      .filter((obj) => obj.name !== targetName)
      .map((obj) => ({
        ...obj,
        childs: this.removeObjectRecursive(obj.childs, targetName),
      }));
  }

  public combineObject(
    child: InspectorObjectType,
    parent: InspectorObjectType
  ) {
    // Remove child from tree (this creates new object tree)
    this.objects = this.removeObjectRecursive(this.objects, child.name);

    // Refetch updated parent from fresh tree
    const updatedParent = this.findObjectByName(parent.name);
    if (!updatedParent) {
      throw new Error("Parent object not found after tree update");
    }

    // Attach child to updated parent
    updatedParent.childs.push(child);
    updatedParent.gameObject.addChild(child.gameObject);
  }

  private findParentRecursive(
    list: InspectorObjectType[],
    childName: string
  ): InspectorObjectType | null {
    for (const obj of list) {
      if (obj.childs.some((child) => child.name === childName)) {
        return obj;
      }

      const foundInChild = this.findParentRecursive(obj.childs, childName);
      if (foundInChild) return foundInChild;
    }

    return null;
  }

  public removeFromParent(
    childObject: InspectorObjectType,
    mainStage: ContainerChild
  ): void {
    const parent = this.findParentRecursive(this.objects, childObject.name);

    if (!parent) {
      // If not found, it's already a top-level object — do nothing
      console.warn("Child has no parent. It's already top-level.");
      return;
    }

    // Remove from parent's childs array
    parent.childs = parent.childs.filter(
      (child) => child.name !== childObject.name
    );

    // Remove from parent's PIXI container
    parent.gameObject.removeChild(childObject.gameObject);
    mainStage.addChild(childObject.gameObject);

    // Optionally: push child to top-level (to make it independent again)
    this.objects.push(childObject);
  }

  public deleteObject(name: string) {
    const target = this.findObjectByName(name);
    if (!target) {
      throw new Error("target object is undefined (for delete)");
    }

    target.gameObject.destroy(true);
    this.objects = this.removeObjectRecursive(this.objects, name);
  }

  private getAllObjectsFlatRecursive(
    list: InspectorObjectType[],
    result: InspectorObjectType[]
  ) {
    for (const obj of list) {
      result.push(obj);
      this.getAllObjectsFlatRecursive(obj.childs, result);
    }
  }

  private getAllObjectsFlat(): InspectorObjectType[] {
    const result: InspectorObjectType[] = [];
    this.getAllObjectsFlatRecursive(this.objects, result);
    return result;
  }

  public addObject(
    type: string,
    name: string,
    gameObject: ContainerChild,
    sceneName: string,
    file: File
  ) {
    let count = 1;
    let fileName = name;

    while (this.getAllObjectsFlat().find((asset) => asset.name === fileName)) {
      fileName = `${name} ${count}`;
      count++;
    }

    this.objects.push({
      type,
      name: fileName,
      gameObject,
      scene: sceneName,
      assetFile: file,
      assetSRC: name,
      childs: [],
      sceneData: {
        x: String(gameObject.x),
        y: String(gameObject.y),
        width: String(gameObject.width),
        height: String(gameObject.height),
        scale: gameObject.scale.x,
        opacity: gameObject.alpha,
        isActive: gameObject.visible,
        rotation: gameObject.rotation,
        ancor: [gameObject.pivot.x, gameObject.pivot.y],
      },
    });
  }

  get AllObject() {
    return this.objects;
  }

  private findObjectByNameRecursive(
    list: InspectorObjectType[],
    name: string
  ): InspectorObjectType | null {
    for (const obj of list) {
      if (obj.name === name) return obj;

      const foundInChild = this.findObjectByNameRecursive(obj.childs, name);
      if (foundInChild) return foundInChild;
    }

    return null;
  }

  public findObjectByName(name: string): InspectorObjectType | null {
    return this.findObjectByNameRecursive(this.objects, name);
  }

  public onGameSceneResize(sceneWidth: number, sceneHeight: number) {
    const objects = this.getAllObjectsFlat();
    for (const obj of objects) {
      this.changeObjectBulk(obj.name, obj.sceneData, sceneWidth, sceneHeight);
    }
  }

  public changeObjectBulk(
    objName: string,
    sceneData: InspectorObjectType["sceneData"],
    sceneWidth: number,
    sceneHeight: number
  ) {
    const targetObj = this.findObjectByName(objName);
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

  public changeObjectParameter(
    objName: string,
    data: ChangeOpbjectDataType,
    sceneWidth: number,
    sceneHeight: number
  ) {
    const targetObj = this.findObjectByName(objName);

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
          sceneWidth
        );
        break;

      case "y":
        targetObj.sceneData.y = String(data.value);
        targetObj.gameObject.y = getNumericValue(
          String(data.value),
          sceneHeight
        );
        break;

      case "width":
        targetObj.sceneData.width = String(data.value);
        targetObj.gameObject.width = getNumericValue(
          String(data.value),
          sceneWidth
        );
        break;

      case "height":
        targetObj.sceneData.height = String(data.value);
        targetObj.gameObject.height = getNumericValue(
          String(data.value),
          sceneHeight
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
}
