import { GameObjectType } from "@/types/engineTypes";
import { Sprite } from "pixi.js";

export class Builder {
  private mapObjectToJSON(obj: GameObjectType): any {
    return {
      type: obj.type,
      src: `/game-assets/${obj.blobURL}`,
      childs: obj.childs.map((child) => this.mapObjectToJSON(child)), // ✅ recursion
      data: {
        x: obj.gameObject.x,
        y: obj.gameObject.y,
        scale: obj.gameObject.scale._x,
        width: obj.gameObject.width,
        height: obj.gameObject.height,
        alpha: obj.gameObject.alpha,
        isActive: obj.gameObject.visible,
        anchor: [
          (obj.gameObject as Sprite).anchor.x,
          (obj.gameObject as Sprite).anchor.y,
        ],
        rotation: obj.gameObject.rotation,
      },
      scene: obj.scene,
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
