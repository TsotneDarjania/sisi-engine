import JSZip from "jszip";
import { Builder } from "./builder";
import Assets from "./engine/assets";
import { EngineScene } from "./engine/engineScene";
import { Inspector } from "./engine/inspector";
import { saveAs } from "file-saver";
import { Signal } from "./state/signal";
import EventManager from "./eventManager";
import { GameObjectType } from "@/types/engineTypes";
import { EventPayloads } from "@/enums/userEventEnums";

export default class GameEngine {
  private _assets!: Assets;
  private _engineScene!: EngineScene;
  private _inspector!: Inspector;
  private _events!: EventManager;

  private builder!: Builder;

  private currentSceneName = new Signal("default");

  constructor() {
    this.init();
  }

  private init() {
    this.createEventManager();
    this.createAssets();
    this.createInspector();
    this.createBuilder();
  }

  private createEventManager() {
    this._events = new EventManager<EventPayloads>();
  }

  private createAssets() {
    this._assets = new Assets(this._events);
  }

  private createInspector() {
    this._inspector = new Inspector(this._events);
  }

  private createBuilder() {
    this.builder = new Builder();
  }

  // Public API

  public async createScene(parentDIV: HTMLDivElement) {
    this._engineScene = new EngineScene(this.events);

    await this.engineScene.init(parentDIV, () => {
      // this.onGameScreenResize();
    });
  }

  get assets() {
    return this._assets;
  }

  get inspector() {
    return this._inspector;
  }

  get events() {
    return this._events;
  }

  get engineScene(){
    return this._engineScene
  }

  // public async addGameObject(
  //   name: string,
  //   srcURL: string,
  //   type: string,
  //   file: File
  // ) {
  //   const newObj = await this.engineScene.addGameObject(srcURL);
  //   this.inspector.addObject(type, name, newObj, this.currentSceneName.value, file);
  // }

  // public changeGameobjectFromInspector(
  //   objName: string,
  //   data: ChangeOpbjectDataType
  // ) {
  //   const { width, height } = this.engineScene.getSceneWidthAndHeight();
  //   this.inspector.changeObjectParameter(objName, data, width, height);
  // }

  // public getAllAsset(): Array<AssetType> {
  //   return this.assets.getAllAsset();
  // }

  // public getAssetByName(name: string): AssetType | undefined {
  //   return this.assets.getAssetByName(name);
  // }

  // public getAllInspectorObject() {
  //   return this.inspector.AllObject;
  // }

  // public addNewAsset(file: File) {
  //   this.assets.addNewAsset(file);
  // }

  // public deleteAsset(assetName: string) {
  //   this.assets.deleteAsset(assetName);
  // }

  // public combineInspectorObjects(
  //   child: InspectorObjectType,
  //   parent: InspectorObjectType
  // ) {
  //   this.inspector.combineObject(child, parent);
  // }

  // public removeFromParent(childObject: InspectorObjectType) {
  //   this.inspector.removeFromParent(childObject, this.engineScene.stage);
  // }

  // public deleteObject(objName: string) {
  //   this.inspector.deleteObject(objName);
  // }

  // public findObjectByName(name: string) {
  //   return this.inspector.findObjectByName(name);
  // }

  // public onGameScreenResize() {
  //   const { width, height } = this.engineScene.getSceneWidthAndHeight();
  //   this.inspector.onGameSceneResize(width, height);
  // }

  // public async build(
  //   width: number,
  //   height: number,
  //   isFullScreenWidth: boolean,
  //   isFullScreenHeight: boolean
  // ) {
  //   const sceneJson = this.builder.generateJSON(
  //     this.inspector.AllObject,
  //     {
  //       backgroundColor: this.engineScene.backgroundColor,
  //     },
  //     {
  //       width,
  //       height,
  //       isFullScreenWidth,
  //       isFullScreenHeight,
  //     }
  //   );

  //   const zip = new JSZip();

  //   // 👉 Fetch player template files from public URL space (served statically)
  //   const indexHtml = await fetch("/runtime-template/index.html").then((r) =>
  //     r.text()
  //   );
  //   zip.file("index.html", indexHtml);

  //   const styleCss = await fetch("/runtime-template/style.css").then((r) =>
  //     r.text()
  //   );
  //   zip.file("style.css", styleCss);

  //   const assetFiles = [
  //     "browserAll.js",
  //     // "colorToUniform.js",
  //     "index.js",
  //     // "SharedSystems.js",
  //     // "WebGLRenderer.js",
  //     // "WebGPURenderer.js",
  //     "webworkerAll.js",
  //     // Add any additional files if needed
  //   ];

  //   const assetsFolder = zip.folder("assets");
  //   for (const filename of assetFiles) {
  //     const content = await fetch(`/runtime-template/assets/${filename}`).then(
  //       (r) => r.blob()
  //     );
  //     assetsFolder!.file(filename, content);
  //   }

  //   // 👉 Add dynamic scene.json
  //   zip.file("scene.json", sceneJson);

  //   // 👉 Add user-uploaded game assets reliably using stored File objects
  //   const gameAssetsFolder = zip.folder("game-assets");

  //   const usedAssets = this.inspector.AllObject.map((obj) => ({
  //     file: obj.assetFile, // <-- Using directly stored File object now!
  //     fileName: obj.assetSRC, // Optionally sanitize this if needed
  //   }));

  //   for (const asset of usedAssets) {
  //     gameAssetsFolder!.file(asset.fileName, asset.file);
  //   }

  //   // 👉 Generate zip and trigger download
  //   zip.generateAsync({ type: "blob" }).then((content) => {
  //     saveAs(content, "my-pixi-game.zip");
  //   });

  //   alert("Build complete! Download should start.");
  // }
}
