import { Application, Sprite, Texture } from "pixi.js";

export class EngineScene {
  private app!: Application;
  private parentDIV!: HTMLDivElement;

  private canvasBackgroundColor: string = "#242424";

  get backgroundColor() {
    return this.canvasBackgroundColor;
  }

  get parentDiv() {
    return this.parentDIV;
  }

  public async init(parentDIV: HTMLDivElement) {
    this.parentDIV = parentDIV;
    this.app = new Application();
    await this.app.init({
      background: this.canvasBackgroundColor,
      resizeTo: this.parentDIV,
    });
    this.parentDIV.appendChild(this.app.canvas);

    console.log(this.app.renderer.resolution);
  }

  public async addGameObject(srcURL: string) {
    const texture = await new Promise<Texture>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(Texture.from(img));
      img.onerror = (err) => {
        console.error(`Failed to load image at ${srcURL}`, err);
      };
      img.src = srcURL;
    });

    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.x = this.app.renderer.width / 2;
    sprite.y = this.app.renderer.height / 2;
    sprite.scale.set(1, 1);

    this.app.stage.addChild(sprite);

    return sprite;
  }
}
