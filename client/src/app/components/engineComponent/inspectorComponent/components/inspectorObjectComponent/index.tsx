import InspectorObjectIndicators from "../indicators";
import PropertiesComponent from "../propterties";
import { useState } from "react";
import useStore from "@/app/store";
import { GameObjectParameterType, GameObjectType } from "@/types/engineTypes";

// handleDrop: (
//   e: React.DragEvent<HTMLLIElement>,
//   parentObject: InspectorObjectType
// ) => void;

// function isChildAlreadyNested(
//   parent: InspectorObjectType,
//   targetName: string
// ): boolean {
//   for (const child of parent.childs) {
//     if (child.name === targetName) return true;
//     if (isChildAlreadyNested(child, targetName)) return true;
//   }
//   return false;
// }

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
      gameEngine.inspector.deleteGameObject(id)
  }

  const changeObjectParameter = (
    parameter: GameObjectParameterType,
    objName: string,
    value: string | number | boolean | [number, number]
  ) => {
    // gameEngine.changeGameobjectFromInspector(objName, {
    //   parameter,
    //   value,
    // });
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const origin = e.dataTransfer.getData("origin");
    const childObjectName = e.dataTransfer.getData("object_name");

    if (origin !== "inspector") {
      console.log("Ignored drop from non-inspector");
      return;
    }

    if (object.childs.find((obj) => obj.name === childObjectName)) {
      console.warn("dont try to repeate same...");
      return;
    }

    if (object.name === childObjectName) {
      console.warn("can not drop into same object");
      return;
    }

    // const childObject = gameEngine.findObjectByName(childObjectName);

    // if (childObject) {
    //   gameEngine.combineInspectorObjects(childObject, object);
    //   updateInspectorObjects();
    // } else {
    //   throw new Error("child object is undefined");
    // }
  };

  return (
    <li
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        handleDrop(e);
      }}
      key={object.name}
      className={`border-2 border-white border-t-0 border-l-0 border-r-0 p-2   text-white ${
        object.childs.length > 0 ? "bg-gray-800" : "bg-gray-900"
      }`}
    >
      <InspectorObjectIndicators
        deleteObject={deleteObject}
        toggle={toggle}
        object={object}
        isOpen={isOpen}
      />

      {/* Inspector Components */}
      {isOpen && (
        <PropertiesComponent
          changeObjectParameter={changeObjectParameter}
          obj={object}
        />
      )}
    </li>
  );
}
