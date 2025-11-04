import { Application, Assets, Sprite, Texture } from "pixi.js";
import { GenerateBuildJSONType } from "../main";
import { GameObjectType } from "../../../types/engineTypes";
import { getNumericValue } from "../../../helper";

export class RuntimeGame {
  app!: Application;

  gameObjects: GameObjectType[] = [];
  displayObjectsMap = new Map<string, Sprite>();

  constructor(
    public sceneJSON: GenerateBuildJSONType,
    public parentDIV: HTMLDivElement
  ) {
    this.init();
  }

  async init() {
    console.log(this.sceneJSON, "SCENE JSON");

    // Create APP
    this.app = new Application();
    await this.app.init({
      background: this.sceneJSON.canvas.backgroundColor,
      resizeTo: this.parentDIV,
    });

    this.parentDIV.appendChild(this.app.canvas);

    await this.loadAssets();
    this.initGameObjects();

    // Listen for resize events
    this.app.renderer.on("resize", this.onGameResize.bind(this));
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
    this.displayObjectsMap.set(obj.id, sprite);

    console.log("🖼️ Image Added with ID:", obj.id);
  }

  private onGameResize() {
    const canvasWidth = this.app.canvas.width;
    const canvasHeight = this.app.canvas.height;

    this.sceneJSON.objects.forEach((obj) => {
      const sprite = this.displayObjectsMap.get(obj.id);
      if (!sprite) return;

      // Update position and size
      sprite.x = getNumericValue(obj.sceneData.x, canvasWidth);
      sprite.y = getNumericValue(obj.sceneData.y, canvasHeight);
      sprite.width = getNumericValue(obj.sceneData.width, canvasWidth);
      sprite.height = getNumericValue(obj.sceneData.height, canvasHeight);
    });

    console.log("🔁 Game resized and objects updated");
  }

  public destroyGame() {
    console.log("🗑️ Destroying game...");

    // 1. Destroy all display objects and clear the map
    this.displayObjectsMap.forEach((sprite) => {
      // Destroy the sprite and its Texture object
      sprite.destroy({ children: true, texture: true } as any);

      // Also destroy the underlying base texture/source if still alive
      const tex = sprite.texture;
      if (tex && !tex.destroyed) {
        try {
          tex.destroy(true); // `true` => also destroy base/source
        } catch {
          /* ignore if already destroyed */
        }
      }
    });
    this.displayObjectsMap.clear();

    // 2. Destroy Pixi Application (also destroys canvas if `true`)
    if (this.app) {
      this.app.destroy(true); // `true` removes canvas & event listeners
    }

    // 4. Clear reference to Application (avoid memory leaks)
    this.app = null as unknown as Application;

    console.log("✅ Game destroyed and resources cleaned up");
  }
}
