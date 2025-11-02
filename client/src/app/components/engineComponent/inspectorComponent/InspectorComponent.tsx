"use client";
import InspectorObjectComponent from "./components/inspectorObjectComponent";
import useStore from "@/app/store";
import { useEffect, useState } from "react";
import { GameObjectType } from "@/types/engineTypes";
import {
  GameSceneEventEnums,
  InspectorEventEnums,
} from "@/enums/userEventEnums";

export default function InspectorComponent() {
  const gameEngine = useStore((state) => state.gameEngine)!;

  const [gameObjects, setGameObjects] = useState<Array<GameObjectType>>(
    gameEngine.inspector.gameObjects
  );

  useEffect(() => {
    gameEngine.events.on(GameSceneEventEnums.dropedAsset, () => {
      setGameObjects([...gameEngine.inspector.gameObjects]);
    });
    gameEngine.events.on(InspectorEventEnums.deleteGameObject, () => {
      setGameObjects([...gameEngine.inspector.gameObjects]);
    });
    gameEngine.events.on(InspectorEventEnums.combineObjects, () => {
      setGameObjects([...gameEngine.inspector.gameObjects]);
    });
    gameEngine.events.on(InspectorEventEnums.removeFromParent, () => {
      setGameObjects([...gameEngine.inspector.gameObjects]);
    });
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();

    const origin = e.dataTransfer.getData("origin");
    const childObjecID = e.dataTransfer.getData("object_id");

    if (origin !== "inspector") {
      console.log("Ignored drop from non-inspector");
      return;
    }

    gameEngine.inspector.removeFromParent(childObjecID)
  };

  return (
    <aside className="flex items-center h-screen flex-col border-2 border-gray-700">
      <header className="bg-gray-900 flex justify-center items-center border-white border-2 border-l-0 border-r-0 border-t-0 w-full p-4">
        <h2 className="text-xl custom-font-1 text-white ">Inspector</h2>
      </header>

      <ul
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          handleDrop(e);
        }}
        className="w-full h-full flex-grow  overflow-y-auto"
      >
        {gameObjects.map((object, index) => (
          <InspectorObjectComponent key={index} object={object} />
        ))}
      </ul>
    </aside>
  );
}
