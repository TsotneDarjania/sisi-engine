import { Application, Assets, Sprite, Texture, Container } from "pixi.js";
import { initDevtools } from "@pixi/devtools";
import { InspectorObjectType } from "../../app/core/engine/inspector";

export type GenerateBuildJSONType = {
  objects: {
    type: string;
    src: string;
    childs: InspectorObjectType[];
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
    isFullScreenWidth: boolean;
    isFullScreenHeight: boolean;
  };
};

function createSpriteTree(obj: any, parent: Container) {
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

  parent.addChild(sprite);

  if (obj.childs?.length > 0) {
    obj.childs.forEach((child: any) => {
      createSpriteTree(child, sprite); // ✅ recursively attach to this sprite
    });
  }
}

(async () => {
  const appElement = document.getElementById("app")!;

  const response = await fetch("./scene.json");
  const sceneData = (await response.json()) as GenerateBuildJSONType;

  appElement.style.width = sceneData.appElement.isFullScreenWidth
    ? "100vw"
    : `${sceneData.appElement.width}px`;
  appElement.style.height = sceneData.appElement.isFullScreenHeight
    ? "100vh"
    : `${sceneData.appElement.height}px`;

  const uniqueAssets = [
    ...new Set(sceneData.objects.flatMap((obj) => collectAllSrcs(obj))),
  ];
  const assetPaths = uniqueAssets.map((src) => `${src}`);

  await Assets.init();
  await Assets.load(assetPaths);

  const app = new Application();
  await app.init({
    background: sceneData.canvas.backgroundColor,
    resizeTo: appElement!,
  });

  initDevtools({ app });

  document.getElementById("app")!.appendChild(app.canvas);

  sceneData.objects.forEach((obj) => {
    createSpriteTree(obj, app.stage);
  });
})();

function collectAllSrcs(obj: any): string[] {
  const srcs = [obj.src];
  if (obj.childs?.length > 0) {
    obj.childs.forEach((child: any) => {
      srcs.push(...collectAllSrcs(child));
    });
  }
  return srcs;
}
