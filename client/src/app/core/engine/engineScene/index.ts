import { Application, Sprite, Texture } from "pixi.js";
import { SceneMenu } from "./sceneMenu/sceneMenu";
import { SceneControllers } from "./sceneControllers";
import EventManager from "../../eventManager";
import { AssetType, GameSceneEventEnums } from "@/enums/userEventEnums";

export class EngineScene {
  private app!: Application;
  private parentDIV!: HTMLDivElement;
  private sceneIndicators!: SceneMenu;
  private sceneControllers!: SceneControllers;

  private canvasBackgroundColor: string = "#101828";

  constructor(public events: EventManager) {}

  get backgroundColor() {
    return this.canvasBackgroundColor;
  }

  get parentDiv() {
    return this.parentDIV;
  }

  get canvas() {
    return this.app?.canvas;
  }

  public async init(parentDIV: HTMLDivElement, onCreated : () => void) {
    this.parentDIV = parentDIV;
    this.app = new Application();
    await this.app.init({
      background: this.canvasBackgroundColor,
      resizeTo: this.parentDIV,
    });

    onCreated();
    
    this.app.renderer.on("resize", () => {
      this.onResize();
      this.events.emit(GameSceneEventEnums.resizeCanvas, {width: this.app.renderer.width, height: this.app.renderer.height})
  
    });
    this.parentDIV.appendChild(this.app.canvas);
    this.addSceneIndicators();
    this.createSceneControllers();
  }

  private createSceneControllers() {
    this.sceneControllers = new SceneControllers();
  }

  public addSceneIndicators() {
    this.sceneIndicators = new SceneMenu(
      this.app.stage,
      this.app.renderer.width,
      this.app.renderer.height
    );
  }

  public async droppedAsset(asset: AssetType) {
    if (asset.type === "image") {
      const texture = await new Promise<Texture>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(Texture.from(img));
        img.onerror = (err) => {
          console.error(`Failed to load image at ${asset.blobURL}`, err);
        };
        img.src = asset.blobURL;
      });

      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.x = this.app.renderer.width / 2;
      sprite.y = this.app.renderer.height / 2;
      sprite.scale.set(1, 1);

      this.app.stage.addChild(sprite);

      this.events.emit(GameSceneEventEnums.dropedAsset, {
        asset: asset,
        pixiObject : sprite,
      });

      return sprite;
    }
  }

  // public getSceneWidthAndHeight() {
  //   return {
  //     width: this.app.canvas.width,
  //     height: this.app.canvas.height,
  //   };
  // }

  private onResize() {
    if (this.sceneIndicators) {
      this.sceneIndicators.onResize(
        this.app.renderer.width,
        this.app.renderer.height
      );
    }
  }
}
