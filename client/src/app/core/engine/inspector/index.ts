import { Dispatch, SetStateAction } from "react";
import EngineScene from "../..";
import { ContainerChild } from "pixi.js";

export type InspectorObjectType = {
  type: string;
  name: string;
  gameObject: ContainerChild;
  scene: string;
  assetFile: File;
  assetSRC: string;
};

export class Inspector {
  objects: Array<InspectorObjectType> = [];

  public deleteObject(name: string) {
    this.objects = this.objects.filter((obj) => {
      if (obj.name === name) {
        obj.gameObject.destroy(true);
      }

      return obj.name !== name;
    });
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

    while (this.objects.find((asset) => asset.name === fileName)) {
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
    });
  }

  get AllObject() {
    return this.objects;
  }

  public changeObject(
    objName: string,
    data: {
      parameter: string;
      value: string | number | boolean;
    }
  ) {
    const targetObj = this.objects.find(
      (obj) => obj.name === objName
    )?.gameObject;

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
