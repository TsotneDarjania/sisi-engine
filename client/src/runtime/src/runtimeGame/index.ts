import { Application, Assets, Sprite, Texture } from "pixi.js";
import { GenerateBuildJSONType } from "../main";
import { GameObjectType } from "../../../types/engineTypes";

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
    console.log(this.sceneJSON);

    //  Create APP
    const app = new Application();
    await app.init({
      background: this.sceneJSON.canvas.backgroundColor,
      resizeTo: this.parentDIV,
    });

    this.parentDIV.appendChild(app.canvas);

    await this.loadAssets();
    this.initGameObjects();
  }

  private async loadAssets() {
    await Assets.init();

    await Promise.all(
      this.sceneJSON.objects.map((obj) => {
         console.log(obj)
        return Assets.load({
          alias: obj.id,
          src: obj.blobURL,
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

    sprite.x = Number(obj.sceneData.x);
    sprite.y = Number(obj.sceneData.y);
    sprite.width = Number(obj.sceneData.width);
    sprite.height = Number(obj.sceneData.height);
    sprite.alpha = Number(obj.sceneData.opacity);
    sprite.visible = obj.sceneData.isActive;
    sprite.anchor.set(obj.sceneData.ancor[0], obj.sceneData.ancor[1]);
    sprite.rotation = obj.sceneData.rotation;

    this.app.stage.addChild(sprite);

    console.log("Image Added Width ID ", obj.id);
  }
}
