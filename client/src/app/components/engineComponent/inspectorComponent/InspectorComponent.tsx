"use client";

import GameEngine from "@/app/core";
import { InspectorObjectType } from "@/app/core/engine/inspector";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import PropertiesComponent from "./components/propterties";
import { useState } from "react";

export default function InspectorComponent({
  objects,
  gameEngine,
  updateInspectorObjects,
}: {
  objects: InspectorObjectType[];
  gameEngine: GameEngine;
  updateInspectorObjects: () => void;
}) {
  const changeObjectParameter = (
    parameter: string,
    objName: string,
    value: string | number | boolean
  ) => {
    gameEngine.changeGameobjectFromInspector(objName, {
      parameter,
      value,
    });
  };

  const [openObjects, setOpenObjects] = useState<number[]>([]);

  function toggle(index: number) {
    const newArr = openObjects.includes(index)
      ? openObjects.filter((item) => item !== index)
      : [...openObjects, index];
    setOpenObjects(newArr);
  }

  function deleteObject(objName: string, openIndex: number) {
    const newArr = openObjects.filter((index) => index !== openIndex);
    setOpenObjects(newArr);
    gameEngine.deleteObject(objName);
    updateInspectorObjects();
  }

  return (
    <aside className="flex items-center h-screen flex-col border-2 border-gray-700">
      <header className="bg-gray-900 flex justify-center items-center border-white border-2 border-l-0 border-r-0 border-t-0 w-full p-4">
        <h2 className="text-xl custom-font-1 text-white ">Inspector</h2>
      </header>

      <ul className="w-full h-full flex-grow  overflow-y-auto">
        {objects.map((object, index) => (
          <li
            key={object.name}
            className="border-2 border-white border-t-0 border-l-0 border-r-0 p-2 bg-gray-900 text-white"
          >
            <header className="flex items-center justify-between gap-2 ">
              <p>{object.type}</p>
              <p>{object.name}</p>

              {/* Controllers */}
              <div className="flex justify-center items-center">
                {/* Arrow */}
                <FaArrowRight
                  onClick={() => {
                    toggle(index);
                  }}
                  fontSize={"21px"}
                  className={`cursor-pointer transition-all ${
                    openObjects.includes(index) ? "rotate-90" : ""
                  }`}
                />
                {/* Delete */}
                <MdDeleteForever
                  onClick={() => {
                    deleteObject(object.name, index);
                  }}
                  className="cursor-pointer"
                  fontSize={"30px"}
                />
              </div>
            </header>

            {/* Inspector Components */}
            {openObjects.includes(index) && (
              <PropertiesComponent
                changeObjectParameter={changeObjectParameter}
                obj={object}
              />
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
