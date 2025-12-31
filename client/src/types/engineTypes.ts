import { ContainerChild } from "pixi.js";

export type GameObjectType = {
  type: "image" | "video" | "audio" | "unknown";
  name: string;
  id: string;
  gameObject: ContainerChild;
  events: {
    [K in GameObjectEventName]: Array<GameObjectEventActionType<unknown>>;
  };
  sceneData: {
    x: string;
    y: string;
    width: string;
    height: string;
    opacity: number;
    isActive: boolean;
    rotation: number;
    ancor: [number, number];
  };
  scene: string;
  blobURL: string;
  childs: GameObjectType[];
};

export type GameObjectEventType<T> = {
  eventName: GameObjectEventName;
  action: GameObjectEventActionType<T>
};

export type GameObjectEventActionType<T> = {
  propertyKey : keyof GameObjectType["sceneData"],
  oldValue: T;
  newValue: T;
};

export type GameObjectEventName = "onClick" | "mouseOver" | "mouseUp";

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
  | "ancor_x"
  | "ancor_y";
