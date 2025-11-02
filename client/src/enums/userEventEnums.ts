import { ContainerChild } from "pixi.js";

export enum AssetEventEnums {
  addAsset = "addAsset",
  deleteAsset = "deleteAsset",
}

export enum GameSceneEventEnums {
  selectObject = "selectObject",
  dropedAsset = "dropedAsset",
  resizeCanvas = "resizeCanvas",
}

export enum InspectorEventEnums {
  deleteGameObject = "deleteGameObject",
  changeObject = "changeObject",
  combineObjects = "combineObjects",
  removeFromParent = "removeFromParent",
}

export type UserEventEnums =
  | AssetEventEnums
  | GameSceneEventEnums
  | InspectorEventEnums;

export type AssetType = {
  name: string;
  id: string;
  type: "unknown" | "image" | "video";
  blobURL: string;
};

export type EventPayloads = {
  [AssetEventEnums.addAsset]: AssetType;
  [AssetEventEnums.deleteAsset]: string;
  [GameSceneEventEnums.selectObject]: {
    objectId: string;
    multiSelect?: boolean;
  };
  [GameSceneEventEnums.dropedAsset]: {
    asset: AssetType;
    pixiObject: ContainerChild;
  };
  [GameSceneEventEnums.resizeCanvas]: { width: number; height: number };
  [InspectorEventEnums.changeObject]: {
    objectId: string;
    changes: Record<string, any>;
  };
  [InspectorEventEnums.deleteGameObject]: string;
  [InspectorEventEnums.combineObjects]: { parentID: string; childID: string };
  [InspectorEventEnums.removeFromParent]: { childID: string };
};
