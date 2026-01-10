import { Application, Assets, Sprite, Texture, Container } from "pixi.js";
import { GenerateBuildJSONType } from "../main";
import { GameObjectType } from "../../../types/engineTypes";
import { getNumericValue } from "../../../helper";

export class RuntimeGame {
  app!: Application;

  /** Only real nodes from JSON: id -> Sprite (images only) */
  private nodeMap = new Map<string, Sprite>();

  constructor(
    public sceneJSON: GenerateBuildJSONType,
    public parentDIV: HTMLDivElement
  ) {
    this.init();
  }

  // ---------- lifecycle ----------

  private async init() {
    this.app = new Application();
    await this.app.init({
      background: this.sceneJSON.canvas.backgroundColor,
      resizeTo: this.parentDIV,
    });
    this.parentDIV.appendChild(this.app.canvas);

    await this.loadAssets();

    console.log("Scene JSON : ", this.sceneJSON);
    // Build ONLY what exists in JSON (no dummy containers)
    this.buildSpritesRecursive(this.sceneJSON.objects, this.app.stage);

    // Initial layout relative to canvas
    this.layoutAllRelativeToCanvas();

    // Resize
    this.app.renderer.on("resize", this.onGameResize);
  }

  // ---------- assets ----------

  private flatten(objects: GameObjectType[]): GameObjectType[] {
    const out: GameObjectType[] = [];
    const walk = (arr: GameObjectType[]) => {
      for (const o of arr) {
        out.push(o);
        if (o.childs?.length) walk(o.childs);
      }
    };
    walk(objects);
    return out;
  }

  private async loadAssets() {
    await Assets.init();
    const all = this.flatten(this.sceneJSON.objects);

    await Promise.all(
      all.map((obj) => {
        if (obj.type === "image" && obj.blobURL) {
          return Assets.load({
            alias: obj.id,
            src: obj.blobURL,
            loadParser: "loadTextures",
          });
        }
        return Promise.resolve();
      })
    );
  }

  // ---------- build (no extra containers) ----------

  /**
   * Create Sprites for "image" nodes only.
   * If parent is a Sprite, attach as child; otherwise attach to stage.
   * For non-image nodes, we don't create anything—just keep walking children.
   */
  private buildSpritesRecursive(objects: GameObjectType[], parent: Container) {
    for (const obj of objects) {
      let attachTo: Container = parent;

      if (obj.type === "image") {
        const tex = Texture.from(obj.id);
        const sprite = new Sprite(tex);

        // JSON-driven static props
        sprite.visible = obj.sceneData.isActive;
        sprite.alpha = obj.sceneData.opacity;
        sprite.rotation = obj.sceneData.rotation;
        sprite.anchor.set(obj.sceneData.ancor[0], obj.sceneData.ancor[1]);

        if (!obj.events) return;
        // add Events
        Object.keys(obj.events).forEach((event) => {
          const eventkey = event as keyof typeof obj.events;
          obj.events[eventkey].forEach((event) => {
            sprite.interactive = true;

            if (eventkey === "onClick") {
              sprite.on("pointerdown", () => {
                const w = this.app.canvas.width;
                const h = this.app.canvas.height;

                switch (event.propertyKey) {
                  case "x":
                    sprite.x = getNumericValue(event.newValue as string, w);
                    break;
                  case "y":
                    sprite.y = getNumericValue(event.newValue as string, h);
                    break;
                  case "ancor":
                    sprite.anchor.x = event.newValue as any[0] as number;
                    sprite.anchor.y = event.newValue as any[1] as number;
                    break;
                  case "width":
                    sprite.width = getNumericValue(event.newValue as string, w);
                    break;
                  case "height":
                    sprite.height = getNumericValue(
                      event.newValue as string,
                      h
                    );
                    break;
                  case "isActive":
                    sprite.visible = event.newValue as boolean;
                    break;
                  case "opacity":
                    sprite.alpha = event.newValue as number;
                    break;
                  case "rotation":
                    sprite.rotation = event.newValue as number;
                    break;
                }
              });
            }

            if (eventkey === "mouseOver") {
              sprite.on("pointerover", () => {
                const w = this.app.canvas.width;
                const h = this.app.canvas.height;

                switch (event.propertyKey) {
                  case "x":
                    console.log(getNumericValue(event.newValue as string, w));
                    sprite.x = getNumericValue(event.newValue as string, w);
                    break;
                  case "y":
                    sprite.y = getNumericValue(event.newValue as string, h);
                    break;
                  case "ancor":
                    sprite.anchor.x = event.newValue as any[0] as number;
                    sprite.anchor.y = event.newValue as any[1] as number;
                    break;
                  case "width":
                    sprite.width = getNumericValue(event.newValue as string, w);
                    break;
                  case "height":
                    sprite.height = getNumericValue(
                      event.newValue as string,
                      h
                    );
                    break;
                  case "isActive":
                    sprite.visible = event.newValue as boolean;
                    break;
                  case "opacity":
                    sprite.alpha = event.newValue as number;
                    break;
                  case "rotation":
                    sprite.rotation = event.newValue as number;
                    break;
                }
              });
            }

            if (eventkey === "mouseLeave") {
              sprite.on("mouseleave", () => {
                const w = this.app.canvas.width;
                const h = this.app.canvas.height;

                switch (event.propertyKey) {
                  case "x":
                    sprite.x = getNumericValue(event.newValue as string, w);
                    break;
                  case "y":
                    sprite.y = getNumericValue(event.newValue as string, h);
                    break;
                  case "ancor":
                    sprite.anchor.x = event.newValue as any[0] as number;
                    sprite.anchor.y = event.newValue as any[1] as number;
                    break;
                  case "width":
                    sprite.width = getNumericValue(event.newValue as string, w);
                    break;
                  case "height":
                    sprite.height = getNumericValue(
                      event.newValue as string,
                      h
                    );
                    break;
                  case "isActive":
                    sprite.visible = event.newValue as boolean;
                    break;
                  case "opacity":
                    sprite.alpha = event.newValue as number;
                    break;
                  case "rotation":
                    sprite.rotation = event.newValue as number;
                    break;
                }
              });
            }

            if (eventkey === "mouseUp") {
              sprite.on("pointerup", () => {
                const w = this.app.canvas.width;
                const h = this.app.canvas.height;
                
                switch (event.propertyKey) {
                  case "x":
                    sprite.x = getNumericValue(event.newValue as string, w);
                    break;
                  case "y":
                    sprite.y = getNumericValue(event.newValue as string, h);
                    break;
                  case "ancor":
                    sprite.anchor.x = event.newValue as any[0] as number;
                    sprite.anchor.y = event.newValue as any[1] as number;
                    break;
                  case "width":
                    sprite.width = getNumericValue(event.newValue as string, w);
                    break;
                  case "height":
                    sprite.height = getNumericValue(
                      event.newValue as string,
                      h
                    );
                    break;
                  case "isActive":
                    sprite.visible = event.newValue as boolean;
                    break;
                  case "opacity":
                    sprite.alpha = event.newValue as number;
                    break;
                  case "rotation":
                    sprite.rotation = event.newValue as number;
                    break;
                }
              });
            }
          });
        });

        // Keep for later updates
        this.nodeMap.set(obj.id, sprite);

        // Attach to parent
        parent.addChild(sprite);

        // Children (if any) will attach to THIS sprite
        attachTo = sprite;
      }

      // Recurse into children regardless of whether we created a sprite
      if (obj.childs?.length) {
        this.buildSpritesRecursive(obj.childs, attachTo);
      }
    }
  }

  // ---------- layout (always canvas-relative) ----------

  private layoutAllRelativeToCanvas() {
    const w = this.app.canvas.width;
    const h = this.app.canvas.height;

    const walk = (arr: GameObjectType[]) => {
      for (const obj of arr) {
        const sprite = this.nodeMap.get(obj.id);
        if (sprite) {
          sprite.x = getNumericValue(obj.sceneData.x, w);
          sprite.y = getNumericValue(obj.sceneData.y, h);
          sprite.width = getNumericValue(obj.sceneData.width, w);
          sprite.height = getNumericValue(obj.sceneData.height, h);
        }
        if (obj.childs?.length) walk(obj.childs);
      }
    };

    walk(this.sceneJSON.objects);
  }

  private onGameResize = () => {
    this.layoutAllRelativeToCanvas();
  };

  // ---------- destroy ----------

  public destroyGame() {
    // Destroy sprites we created (safe but optional since app.destroy(true) cascades)
    this.nodeMap.forEach((sprite) => {
      try {
        sprite.destroy({ children: true, texture: true });
      } catch {
        /* ignore */
      }
    });
    this.nodeMap.clear();

    if (this.app) {
      this.app.destroy(true); // also removes canvas & listeners
    }

    this.app = null as unknown as Application;
  }
}
