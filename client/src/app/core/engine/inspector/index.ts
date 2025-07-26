import { ContainerChild } from "pixi.js";

export type InspectorObjectType = {
  type: string;
  name: string;
  gameObject: ContainerChild;
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

  public changeObject(
    objName: string,
    data: {
      parameter: string;
      value: string | number | boolean;
    }
  ) {
    const targetObj = this.findObjectByName(objName)?.gameObject;

    if (!targetObj) {
      throw Error("targetObject is undefined");
    }

    switch (data.parameter) {
      case "scale":
        targetObj.scale.set(Number(data.value), Number(data.value));
        break;
      case "x":
        targetObj.x = Number(data.value);
        break;
      case "y":
        targetObj.y = Number(data.value);
        break;
      case "width":
        targetObj.width = Number(data.value);
        break;
      case "height":
        targetObj.height = Number(data.value);
        break;
      case "opacity":
        targetObj.alpha = Number(data.value);
        break;
      case "visible":
        targetObj.visible = Boolean(data.value);
        break;
      default:
        console.error("Unknown Parameter : " + data.parameter);
    }
  }
}
