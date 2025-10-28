import { ContainerChild } from "pixi.js";


export type GameObjectType = {
  type: string;
  name: string;
  gameObject: ContainerChild;
  sceneData: {
    x: string;
    y: string;
    width: string;
    height: string;
    opacity: number;
    scale: number;
    isActive: boolean;
    rotation: number;
    ancor: [number, number];
  };
  scene: string;
  assetFile: File;
  assetSRC: string;
  childs: GameObjectType[];
};

export type ChangeOpbjectDataType = {
  parameter: GameObjectParameterType;
  value: string | number | boolean | [number, number];
};

export type GameObjectParameterType =
  | "x"
  | "y"
  | "width"
  | "height"
  | "scale"
  | "opacity"
  | "visible"
  | "rotation"
  | "ancor";
