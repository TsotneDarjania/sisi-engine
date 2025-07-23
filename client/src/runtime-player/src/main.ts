import { Application, Assets, Sprite, Texture } from "pixi.js";
import { initDevtools } from "@pixi/devtools";

export type GenerateBuildJSONType = {
  objects: {
    type: string;
    src: string;
    data: {
      x: number;
      y: number;
      scale: number;
      width: number;
      height: number;
      alpha: number;
      isActive: boolean;
    };
    scene: string;
  }[];
  canvas: {
    backgroundColor: string;
  };
  appElement: {
    width: number;
    height: number;
  };
};

(async () => {
  const appElement = document.getElementById("app")!;

  const response = await fetch("./scene.json");
  const sceneData = (await response.json()) as GenerateBuildJSONType;
  appElement.style.width = `${sceneData.appElement.width}px`;
  appElement.style.height = `${sceneData.appElement.height}px`;

  const uniqueAssets = [...new Set(sceneData.objects.map((obj) => obj.src))];

  const assetPaths = uniqueAssets.map((src) => `${src}`);

  await Assets.init();

  await Assets.load(assetPaths);

  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({
    background: sceneData.canvas.backgroundColor,
    resizeTo: appElement!,
  });

  initDevtools({ app });

  console.log(app.renderer.resolution);

  // Append the application canvas to the document body
  document.getElementById("app")!.appendChild(app.canvas);

  sceneData.objects.forEach((obj) => {
    const texture = Texture.from(obj.src);

    const sprite = new Sprite(texture);

    sprite.x = obj.data.x;
    sprite.y = obj.data.y;
    sprite.scale.set(obj.data.scale, obj.data.scale);
    sprite.width = obj.data.width;
    sprite.height = obj.data.height;
    sprite.alpha = obj.data.alpha;
    sprite.visible = obj.data.isActive;
    sprite.anchor.set(0.5);

    app.stage.addChild(sprite);
  });
})();
