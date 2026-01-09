import useStore from "@/app/store";
import {
  GameObjectEventName,
  GameObjectEventType,
  GameObjectType,
} from "@/types/engineTypes";
import { useRef } from "react";

export function Properties({
  object,
  eventName,
}: {
  object: GameObjectType;
  eventName: GameObjectEventName;
}) {
  const gameEngine = useStore((state) => state.gameEngine);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div className=" w-full text-white flex flex-col gap-1">
      {/* Properties */}
      <div className="w-full flex justify-between">
        <p className=""> pos X : </p>
        <input
          onChange={(e) => {
            const newValue = Number(e.currentTarget.value);

            if (Number.isNaN(newValue)) {
              console.warn("Please Input Correct Number Value");
              return;
            }

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
              gameEngine!.inspector.addEventToGameObject(object.id, {
                eventName,
                action: {
                  propertyKey: "x",
                  oldValue: object.gameObject.x,
                  newValue: newValue,
                },
              });
            }, 400);
          }}
          defaultValue={object.gameObject.x}
          className=" w-[200px] border-2 border-white "
          type="text"
        />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> pos Y : </p>
        <input
          onChange={(e) => {
            const newValue = Number(e.currentTarget.value);

            if (Number.isNaN(newValue)) {
              console.warn("Please Input Correct Number Value");
              return;
            }

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
              gameEngine!.inspector.addEventToGameObject(object.id, {
                eventName,
                action: {
                  propertyKey: "y",
                  oldValue: object.gameObject.y,
                  newValue: newValue,
                },
              });
            }, 400);
          }}
          defaultValue={object.gameObject.y}
          className=" w-[200px] border-2 border-white "
          type="text"
        />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Width : </p>
        <input
          onChange={(e) => {
            const newValue = Number(e.currentTarget.value);

            if (Number.isNaN(newValue)) {
              console.warn("Please Input Correct Number Value");
              return;
            }

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
              gameEngine!.inspector.addEventToGameObject(object.id, {
                eventName,
                action: {
                  propertyKey: "width",
                  oldValue: object.gameObject.width,
                  newValue: newValue,
                },
              });
            }, 400);
          }}
          defaultValue={object.gameObject.width}
          className=" w-[200px] border-2 border-white "
          type="text"
        />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Height : </p>
        <input
          onChange={(e) => {
            const newValue = Number(e.currentTarget.value);

            if (Number.isNaN(newValue)) {
              console.warn("Please Input Correct Number Value");
              return;
            }

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
              gameEngine!.inspector.addEventToGameObject(object.id, {
                eventName,
                action: {
                  propertyKey: "height",
                  oldValue: object.gameObject.height,
                  newValue: newValue,
                },
              });
            }, 400);
          }}
          defaultValue={object.gameObject.height}
          className=" w-[200px] border-2 border-white "
          type="text"
        />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Rotation : </p>
        <input
          onChange={(e) => {
            const newValue = Number(e.currentTarget.value);

            if (Number.isNaN(newValue)) {
              console.warn("Please Input Correct Number Value");
              return;
            }

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
              gameEngine!.inspector.addEventToGameObject(object.id, {
                eventName,
                action: {
                  propertyKey: "rotation",
                  oldValue: object.gameObject.rotation,
                  newValue: newValue,
                },
              });
            }, 400);
          }}
          defaultValue={object.gameObject.rotation}
          className=" w-[200px] border-2 border-white "
          type="text"
        />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Ancor : </p>
        <div className=" w-[200px] flex">
          <input
            onChange={(e) => {
              const newValue = Number(e.currentTarget.value);

              if (Number.isNaN(newValue)) {
                console.warn("Please Input Correct Number Value");
                return;
              }

              if (debounceRef.current) clearTimeout(debounceRef.current);

              debounceRef.current = setTimeout(() => {
                gameEngine!.inspector.addEventToGameObject(object.id, {
                  eventName,
                  action: {
                    propertyKey: "ancor",
                    oldValue: object.sceneData.ancor[0],
                    newValue: newValue,
                  },
                });
              }, 400);
            }}
            defaultValue={object.gameObject.pivot.x}
            className="border-2 w-[100px] border-white "
            type="text"
          />
          <input
          onChange={(e) => {
              const newValue = Number(e.currentTarget.value);

              if (Number.isNaN(newValue)) {
                console.warn("Please Input Correct Number Value");
                return;
              }

              if (debounceRef.current) clearTimeout(debounceRef.current);

              debounceRef.current = setTimeout(() => {
                gameEngine!.inspector.addEventToGameObject(object.id, {
                  eventName,
                  action: {
                    propertyKey: "ancor",
                    oldValue: object.sceneData.ancor[1],
                    newValue: newValue,
                  },
                });
              }, 400);
            }}
            defaultValue={object.gameObject.pivot.y}
            className="border-2 w-[100px] border-white "
            type="text"
          />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Opacity : </p>
        <input
          onChange={(e) => {
            const newValue = Number(e.currentTarget.value);

            if (Number.isNaN(newValue)) {
              console.warn("Please Input Correct Number Value");
              return;
            }

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(() => {
              gameEngine!.inspector.addEventToGameObject(object.id, {
                eventName,
                action: {
                  propertyKey: "opacity",
                  oldValue: object.gameObject.alpha,
                  newValue: newValue,
                },
              });
            }, 400);
          }}
          defaultValue={object.gameObject.alpha}
          className=" w-[200px] border-2 border-white "
          type="text"
        />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Visible : </p>
        <input
        onChange={(e) => {
              const newValue = e.currentTarget.checked;

              if (Number.isNaN(newValue)) {
                console.warn("Please Input Correct Number Value");
                return;
              }

              console.log(newValue)

              if (debounceRef.current) clearTimeout(debounceRef.current);

              debounceRef.current = setTimeout(() => {
                gameEngine!.inspector.addEventToGameObject(object.id, {
                  eventName,
                  action: {
                    propertyKey: "isActive",
                    oldValue: object.sceneData.isActive,
                    newValue: newValue,
                  },
                });
              }, 400);
            }}
          defaultChecked={object.gameObject.visible}
          className=" w-[200px] border-2 border-white "
          type="checkbox"
        />
      </div>
    </div>
  );
}
