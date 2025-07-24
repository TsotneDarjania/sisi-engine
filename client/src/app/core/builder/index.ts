import { InspectorObjectType } from "../engine/inspector";

export class Builder {
  public generateJSON(
    objects: InspectorObjectType[],
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
    const sceneObjects = objects.map((obj) => ({
      type: obj.type,
      src: `/game-assets/${obj.assetSRC}`,
      data: {
        x: obj.gameObject.x,
        y: obj.gameObject.y,
        scale: obj.gameObject.scale._x,
        width: obj.gameObject.width,
        height: obj.gameObject.height,
        alpha: obj.gameObject.alpha,
        isActive: obj.gameObject.visible,
      },
      scene: obj.scene,
    }));

    const json = {
      objects: sceneObjects,
      canvas,
      appElement,
    };

    return JSON.stringify(json, null, 2);
  }
}
