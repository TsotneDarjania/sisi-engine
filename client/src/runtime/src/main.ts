import { Application, Assets, Sprite, Texture, Container } from "pixi.js";
import { GameObjectType } from "../../types/engineTypes";
import { RuntimeGame } from "./runtimeGame";

export type GenerateBuildJSONType = {
  objects: GameObjectType[];
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

export function setupRuntime(json: GenerateBuildJSONType) {
  const sceneBlob = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  const sceneBlobUrl = URL.createObjectURL(sceneBlob);

  const popup = window.open(
    `/engine/runtime?scene=${encodeURIComponent(sceneBlobUrl)}&w=${json.appElement.width}&h=${json.appElement.height}`,
    "_blank",
    `width=${json.appElement.width},height=${json.appElement.height},left=0,top=${window.innerHeight / 2},resizable=yes`
  );

  if (!popup) {
    // Popup may be blocked; show helpful info
    alert("Please allow popups for this site to preview the runtime.");
    return;
  }
}

export async function startRuntimeGame(parentDIV: HTMLDivElement) {
  const sceneURL = new URLSearchParams(window.location.search).get("scene");
  if (!sceneURL) throw Error("Scene JSON is undefined");

  const sceneJSON: GenerateBuildJSONType = await fetch(sceneURL).then((r) =>
    r.json()
  );

  new RuntimeGame(sceneJSON, parentDIV);
}

// function createSpriteTree(obj: any, parent: Container) {
//   const texture = Texture.from(obj.src);
//   const sprite = new Sprite(texture);

//   sprite.x = obj.data.x;
//   sprite.y = obj.data.y;
//   sprite.scale.set(obj.data.scale, obj.data.scale);
//   sprite.width = obj.data.width;
//   sprite.height = obj.data.height;
//   sprite.alpha = obj.data.alpha;
//   sprite.visible = obj.data.isActive;
//   sprite.anchor.set(obj.data.anchor[0], obj.data.anchor[1]);
//   sprite.rotation = obj.data.rotation;

//   parent.addChild(sprite);

//   if (obj.childs?.length > 0) {
//     obj.childs.forEach((child: any) => {
//       createSpriteTree(child, sprite); // ✅ recursively attach to this sprite
//     });
//   }
// }

// (async () => {
//   const appElement = document.getElementById("app")!;

//   const response = await fetch("./scene.json");
//   const sceneData = (await response.json()) as GenerateBuildJSONType;

//   appElement.style.width = sceneData.appElement.isFullScreenWidth
//     ? "100vw"
//     : `${sceneData.appElement.width}px`;
//   appElement.style.height = sceneData.appElement.isFullScreenHeight
//     ? "100vh"
//     : `${sceneData.appElement.height}px`;

//   const uniqueAssets = [
//     ...new Set(sceneData.objects.flatMap((obj) => collectAllSrcs(obj))),
//   ];
//   const assetPaths = uniqueAssets.map((src) => `${src}`);

//   await Assets.init();
//   await Assets.load(assetPaths);

//   const app = new Application();
//   await app.init({
//     background: sceneData.canvas.backgroundColor,
//     resizeTo: appElement!,
//   });

//   // initDevtools({ app });

//   document.getElementById("app")!.appendChild(app.canvas);

//   sceneData.objects.forEach((obj) => {
//     createSpriteTree(obj, app.stage);
//   });
// })();

// function collectAllSrcs(obj: any): string[] {
//   const srcs = [obj.src];
//   if (obj.childs?.length > 0) {
//     obj.childs.forEach((child: any) => {
//       srcs.push(...collectAllSrcs(child));
//     });
//   }
//   return srcs;
// }
