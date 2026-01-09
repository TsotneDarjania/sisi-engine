import { ContainerChild, Sprite } from "pixi.js";
import EventManager from "../../eventManager";
import {
  ChangeOpbjectDataType,
  GameObjectEventType,
  GameObjectType,
} from "@/types/engineTypes";
import {
  AssetType,
  GameSceneEventEnums,
  InspectorEventEnums,
} from "@/enums/userEventEnums";
import { getNumericValue, uid } from "@/helper";

export class Inspector {
  public gameObjects: Array<GameObjectType> = [];
  private _canvas!: HTMLCanvasElement;

  constructor(public events: EventManager) {
    events.on(GameSceneEventEnums.dropedAsset, (data) => {
      this.addGameObject(data);
    });
    events.on(GameSceneEventEnums.resizeCanvas, ({ width, height }) => {
      this.onGameSceneResize(width, height);
    });
  }

  private findObjectByID(id: string): GameObjectType | null {
    return this.findObjectByIDRecursive(this.gameObjects, id);
  }

  private removeObjectRecursive(
    list: GameObjectType[],
    targetID: string
  ): GameObjectType[] {
    return list
      .filter((obj) => obj.id !== targetID)
      .map((obj) => ({
        ...obj,
        childs: this.removeObjectRecursive(obj.childs, targetID),
      }));
  }

  private findObjectByIDRecursive(
    list: GameObjectType[],
    id: string
  ): GameObjectType | null {
    for (const obj of list) {
      if (obj.id === id) return obj;

      const foundInChild = this.findObjectByIDRecursive(obj.childs, id);
      if (foundInChild) return foundInChild;
    }

    return null;
  }

  private getAllObjectsFlatRecursive(
    list: GameObjectType[],
    result: GameObjectType[]
  ) {
    for (const obj of list) {
      result.push(obj);
      this.getAllObjectsFlatRecursive(obj.childs, result);
    }
  }

  private getAllObjectsFlat(): GameObjectType[] {
    const result: GameObjectType[] = [];
    this.getAllObjectsFlatRecursive(this.gameObjects, result);
    return result;
  }

  private getObjectName(baseName: string) {
    let count = 1;
    let fileName = baseName;

    while (this.getAllObjectsFlat().find((asset) => asset.name === fileName)) {
      fileName = `${baseName} (${count})`;
      count++;
    }

    return fileName;
  }

  private containsId(root: GameObjectType, targetId: string): boolean {
    if (root.id === targetId) return true;
    for (const c of root.childs ?? []) {
      if (this.containsId(c, targetId)) return true;
    }
    return false;
  }

  public addGameObject(data: { asset: AssetType; pixiObject: ContainerChild }) {
    this.gameObjects.push({
      type: data.asset.type,
      name: this.getObjectName(data.asset.name),
      id: uid(),
      gameObject: data.pixiObject,
      scene: "testScene",
      blobURL: data.asset.blobURL,
      childs: [],
      events: {
        onClick: [],
        mouseOver: [],
        mouseUp: [],
      },
      sceneData: {
        x: String(data.pixiObject.x),
        y: String(data.pixiObject.y),
        width: String(data.pixiObject.width),
        height: String(data.pixiObject.height),
        opacity: data.pixiObject.alpha,
        isActive: data.pixiObject.visible,
        rotation: data.pixiObject.rotation,
        ancor: [0.5, 0.5],
      },
    });
  }

  public addEventToGameObject<ActionValueType>(
    id: string,
    event: GameObjectEventType<ActionValueType>
  ) {
    // if (event.action.oldValue === event.action.newValue) {
    //   console.warn(
    //     `nothing was changed, because new value is same as old (old:${event.action.oldValue} new:old:${event.action.newValue})`
    //   );
    //   return;
    // }

    const targetGameObject = this.findObjectByID(id);
    if (!targetGameObject) {
      console.error(`Can not Find Target Gameobject With ID:${id}`);
      return;
    }

    const eventActions = (targetGameObject.events[event.eventName] ??= []);

    const existingPropertyAction = eventActions.find(
      (a) => a.propertyKey === event.action.propertyKey
    );

    if (existingPropertyAction) {
      Object.assign(existingPropertyAction, event.action);
    } else {
      eventActions.push(event.action);
    }

    this.events.emit(InspectorEventEnums.addEventOrChangeToGameObject, event);

    console.log(targetGameObject.events, "Add Or Change GameObject Event");
  }

  public deleteGameObject(id: string) {
    const target = this.findObjectByID(id);
    if (!target) {
      throw new Error("target object is undefined (for delete)");
    }

    target.gameObject.destroy(true);
    this.gameObjects = this.removeObjectRecursive(this.gameObjects, id);

    this.events.emit(InspectorEventEnums.deleteGameObject, id);
  }

  public changeObjectParameter(id: string, data: ChangeOpbjectDataType) {
    const targetObj = this.findObjectByID(id);
    if (!targetObj) throw new Error("targetObject is undefined");

    const getNumericValue = (
      value: string | number,
      fullSize: number
    ): number => {
      if (typeof value === "string" && value.trimEnd().endsWith("%")) {
        const cleaned = value.trimEnd().replace(/\s+%$/, "%").slice(0, -1);
        const percent = parseFloat(cleaned);
        if (!isNaN(percent)) return (fullSize * percent) / 100;
      }
      return Number(value);
    };

    // helper that updates ONLY oldValue for a specific sceneData key
    const writeOldValueIntoEvents = (
      propertyKey: keyof GameObjectType["sceneData"],
      oldValue: unknown
    ) => {
      (
        Object.keys(targetObj.events) as Array<keyof typeof targetObj.events>
      ).forEach((eventKey) => {
        targetObj.events[eventKey] = targetObj.events[eventKey].map(
          (action) => {
            if (action.propertyKey !== propertyKey) return action;
            return { ...action, oldValue }; // ✅ newValue untouched
          }
        );
      });
      console.log(targetObj.events);
    };

    switch (data.parameter) {
      case "x": {
        targetObj.sceneData.x = String(data.value);
        targetObj.gameObject.x = getNumericValue(
          String(data.value),
          this._canvas.width
        );
        writeOldValueIntoEvents("x", targetObj.sceneData.x);
        break;
      }

      case "y": {
        targetObj.sceneData.y = String(data.value);
        targetObj.gameObject.y = getNumericValue(
          String(data.value),
          this._canvas.height
        );
        writeOldValueIntoEvents("y", targetObj.sceneData.y);
        break;
      }

      case "width": {
        targetObj.sceneData.width = String(data.value);
        targetObj.gameObject.width = getNumericValue(
          String(data.value),
          this._canvas.width
        );
        writeOldValueIntoEvents("width", targetObj.sceneData.width);
        break;
      }

      case "height": {
        targetObj.sceneData.height = String(data.value);
        targetObj.gameObject.height = getNumericValue(
          String(data.value),
          this._canvas.height
        );
        writeOldValueIntoEvents("height", targetObj.sceneData.height);
        break;
      }

      case "opacity": {
        targetObj.sceneData.opacity = Number(data.value);
        targetObj.gameObject.alpha = Number(data.value);
        writeOldValueIntoEvents("opacity", targetObj.sceneData.opacity);
        break;
      }

      case "visible": {
        targetObj.sceneData.isActive = Boolean(data.value);
        targetObj.gameObject.visible = Boolean(data.value);
        writeOldValueIntoEvents("isActive", targetObj.sceneData.isActive);
        break;
      }

      case "rotation": {
        targetObj.sceneData.rotation = Number(data.value);
        targetObj.gameObject.rotation = Number(data.value);
        writeOldValueIntoEvents("rotation", targetObj.sceneData.rotation);
        break;
      }

      case "ancor_x": {
        targetObj.sceneData.ancor[0] = data.value as number;
        (targetObj.gameObject as Sprite).anchor.set(
          targetObj.sceneData.ancor[0],
          targetObj.sceneData.ancor[1]
        );
        writeOldValueIntoEvents("ancor", [...targetObj.sceneData.ancor] as [number, number]);
        break;
      }

      case "ancor_y": {
        targetObj.sceneData.ancor[1] = data.value as number;
        (targetObj.gameObject as Sprite).anchor.set(
          targetObj.sceneData.ancor[0],
          targetObj.sceneData.ancor[1]
        );
        writeOldValueIntoEvents("ancor", [...targetObj.sceneData.ancor] as [number, number]);
        break;
      }

      default:
        console.error("Unknown Parameter:", data.parameter);
    }
  }

  set canvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  /**
   * Removes a GameObject from its current parent and moves it back to the root
   */
  public removeFromParent(childID: string) {
    const child = this.findObjectByID(childID);
    if (!child) {
      throw Error(`Child object with id ${childID} not found`);
    }

    // 1) Find the parent of this child inside the object tree
    const findParent = (
      list: GameObjectType[],
      targetId: string
    ): GameObjectType | null => {
      for (const obj of list) {
        if (obj.childs?.some((c) => c.id === targetId)) {
          return obj;
        }
        const nested = findParent(obj.childs ?? [], targetId);
        if (nested) return nested;
      }
      return null;
    };

    const parent = findParent(this.gameObjects, childID);

    if (!parent) {
      // No parent found: already at root — nothing to do
      console.warn(`Child ${childID} is already a root object`);
      return;
    }

    // 2) Remove the child logic-side from its parent
    parent.childs = parent.childs.filter((c) => c.id !== childID);

    // 3) Add it back to root level
    this.gameObjects.push(child);

    // 4) Update PIXI scene graph: remove from old parent, add to stage
    const childPixi = child.gameObject as any;
    const parentPixi = parent.gameObject as any;
    const stage = parentPixi?.stage || parentPixi?.parent?.stage; // depends on how you pass the root
    if (parentPixi?.removeChild && childPixi) {
      parentPixi.removeChild(childPixi);
    }
    if (stage?.addChild) {
      stage.addChild(childPixi);
    } else {
      console.warn(
        "Could not find valid stage in removeFromParent: make sure Inspector has access to PIXI app.stage"
      );
    }

    this.events.emit(InspectorEventEnums.removeFromParent, { childID });
  }

  public combineObject(childID: string, parentID: string) {
    if (childID === parentID) {
      throw Error("Cannot combine: parent and child IDs are the same.");
    }

    const childObject = this.findObjectByID(childID);
    const parentObject = this.findObjectByID(parentID);

    if (!parentObject || !childObject) {
      console.warn(
        `parent - ${parentID} or child - ${childID} object did not found`
      );
      return;
    }

    // guard against cycles: don't attach under your own descendant
    if (this.containsId(childObject, parentID)) {
      console.warn(
        "Cannot combine: target parent is inside child's subtree (cycle)."
      );
      return;
    }

    // --- keep PIXI scene graph in sync: detach child from its current PIXI parent
    const childPixi = childObject.gameObject as any;
    const oldPixiParent = childPixi?.parent;
    if (oldPixiParent?.removeChild) {
      oldPixiParent.removeChild(childPixi);
    }

    // 1) Remove child from our logical tree (this may rebuild branches)
    this.gameObjects = this.removeObjectRecursive(
      this.gameObjects,
      childObject.id
    );

    // 2) Re-find parent on the UPDATED tree to avoid stale reference
    const parentNow = this.findObjectByID(parentID);
    if (!parentNow) {
      // very defensive; should not happen because we blocked cycles
      console.warn(`Parent ${parentID} was not found after restructuring.`);
      return;
    }

    // 3) Attach child to the new parent in our logical tree
    if (!Array.isArray(parentNow.childs)) parentNow.childs = [];
    parentNow.childs.push(childObject);

    // 4) Attach in PIXI graph too (if parent supports addChild)
    const parentPixi = parentNow.gameObject as any;
    if (parentPixi?.addChild) {
      parentPixi.addChild(childPixi);
    }

    this.events.emit(InspectorEventEnums.combineObjects, { parentID, childID });
  }

  public onGameSceneResize(sceneWidth: number, sceneHeight: number) {
    const objects = this.getAllObjectsFlat();
    for (const obj of objects) {
      this.updategGameObjects(obj.id, obj.sceneData, sceneWidth, sceneHeight);
    }
  }

  // When screen resize or whatever...
  public updategGameObjects(
    id: string,
    sceneData: GameObjectType["sceneData"],
    sceneWidth: number,
    sceneHeight: number
  ) {
    const targetObj = this.findObjectByID(id);
    if (!targetObj) {
      throw new Error("targetObject is undefined");
    }

    // Apply all values from sceneData
    targetObj.sceneData = { ...sceneData };
    targetObj.gameObject.x = getNumericValue(sceneData.x, sceneWidth);
    targetObj.gameObject.y = getNumericValue(sceneData.y, sceneHeight);
    targetObj.gameObject.width = getNumericValue(sceneData.width, sceneWidth);
    targetObj.gameObject.height = getNumericValue(
      sceneData.height,
      sceneHeight
    );

    targetObj.gameObject.alpha = sceneData.opacity;
    targetObj.gameObject.visible = sceneData.isActive;
  }
}
