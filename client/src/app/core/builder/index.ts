import { GameObjectType } from "@/types/engineTypes";
import { Sprite } from "pixi.js";

export class Builder {
  private mapObjectToJSON(obj: GameObjectType): any {
    return {
      type: obj.type,
      name: obj.name,
      id: obj.id,
      events: obj.events,
      sceneData: {
        x: obj.sceneData.x,
        y: obj.sceneData.y,
        width: obj.sceneData.width,
        height: obj.sceneData.height,
        opacity: obj.sceneData.opacity,
        isActive: obj.sceneData.isActive,
        rotation: obj.sceneData.rotation,
        ancor: obj.sceneData.ancor,
      },
      scene: obj.scene,
      blobURL: obj.blobURL,
      childs: obj.childs.map((child) => this.mapObjectToJSON(child)), // ✅ recursion
    };
  }

  public generateJSON(
    objects: GameObjectType[],
    canvas: {
      backgroundColor: string;
    },
    appElement: {
      width: number;
      height: number;
      isFullScreenWidth: boolean;
      isFullScreenHeight: boolean;
    }
  ) {
    const sceneObjects = objects.map((obj) => this.mapObjectToJSON(obj));

    const json = {
      objects: sceneObjects,
      canvas,
      appElement,
    };

    return JSON.stringify(json, null, 2);
  }
}
