import { useState } from "react";
import useStore from "@/app/store";
import { GameObjectType } from "@/types/engineTypes";
import Indicators from "./components/indicators";
import { Parameters } from "./components/parameters";

export default function InspectorObjectComponent({
  object,
}: {
  object: GameObjectType;
}) {
  const gameEngine = useStore((state) => state.gameEngine)!;

  const [isOpen, setIsOPen] = useState(false);

  function toggle() {
    setIsOPen((prev) => !prev);
  }

  function deleteObject(id: string) {
    gameEngine.inspector.deleteGameObject(id);
  }

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const origin = e.dataTransfer.getData("origin");
    const childObjectID = e.dataTransfer.getData("object_id");

    if (origin !== "inspector") {
      console.log("Ignored drop from non-inspector");
      return;
    }

    gameEngine.inspector.combineObject(childObjectID, object.id);
  };

  return (
    <li
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        handleDrop(e);
      }}
      key={object.name}
      className={`border-2 w-[100%] border-gray-600 flex justify-between flex-col p-2 rounded-sm   text-white ${
        object.childs.length > 0 ? " bg-gray-900" : "bg-gray-700"
      }`}
    >
      {/* Indicators */}
      <Indicators
        deleteObject={deleteObject}
        toggle={toggle}
        object={object}
        isOpen={isOpen}
      />

      {/* Parameters */}
      {isOpen && <Parameters gameEngine={gameEngine} object={object} />}
    </li>
  );
}
