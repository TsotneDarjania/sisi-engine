import { Application, Assets, Sprite, Texture } from "pixi.js";
import { GenerateBuildJSONType } from "../main";
import { GameObjectType } from "../../../types/engineTypes";
import { getNumericValue } from "../../../helper";

export class RuntimeGame {
  app!: Application;

  gameObjects: GameObjectType[] = [];

  constructor(
    public sceneJSON: GenerateBuildJSONType,
    public parentDIV: HTMLDivElement
  ) {
    this.init();
  }

  async init() {
    console.log(this.sceneJSON, "SCENE JSON");

    //  Create APP
    this.app = new Application();
    await this.app.init({
      background: this.sceneJSON.canvas.backgroundColor,
      resizeTo: this.parentDIV,
    });

    this.parentDIV.appendChild(this.app.canvas);

    await this.loadAssets();
    this.initGameObjects();
  }

  private async loadAssets() {
    await Assets.init();

    await Promise.all(
      this.sceneJSON.objects.map((obj) => {
        return Assets.load({
          alias: obj.id,
          src: obj.blobURL,
          loadParser: "loadTextures",
        });
      })
    );

    console.log("✅ All assets loaded");
  }

  private initGameObjects() {
    this.sceneJSON.objects.forEach((obj) => {
      switch (obj.type) {
        case "image":
          this.addImage(obj);
      }
    });
  }

  private addImage(obj: GameObjectType) {
    const texture = Texture.from(obj.id);
    const sprite = new Sprite(texture);

    sprite.x = getNumericValue(obj.sceneData.x, this.app.canvas.width);
    sprite.y = getNumericValue(obj.sceneData.y, this.app.canvas.height);
    sprite.width = getNumericValue(obj.sceneData.width, this.app.canvas.width);
    sprite.height = getNumericValue(
      obj.sceneData.height,
      this.app.canvas.height
    );
    sprite.alpha = obj.sceneData.opacity;
    sprite.visible = obj.sceneData.isActive;
    sprite.anchor.set(obj.sceneData.ancor[0], obj.sceneData.ancor[1]);
    sprite.rotation = obj.sceneData.rotation;

    this.app.stage.addChild(sprite);

    console.log("Image Added Width ID ", obj.id);
  }
}
