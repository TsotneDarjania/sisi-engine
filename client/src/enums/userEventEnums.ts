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



export type EventPayloads = {
  [AssetEventEnums.addAsset]: { id: string; type: string };
  [AssetEventEnums.deleteAsset]: { id: string };
  [GameSceneEventEnums.selectObject]: { objectId: string; multiSelect?: boolean };
  [InspectorEventEnums.changeObject]: { objectId: string; changes: Record<string, any> };
  // add more event payloads here
};