export enum AssetEventEnums {
  addAsset =  "addAsset",
  deleteAsset ="deleteAsset",
}

export enum GameSceneEventEnums {
  selectObject = "selectObject",
}

export enum InspectorEventEnums {
 changeObject = "changeObject",
}

export type UserEventEnums =
  | AssetEventEnums
  | GameSceneEventEnums
  | InspectorEventEnums;
