import { GameObjectParameterType, GameObjectType } from "@/types/engineTypes";
import PropertiesComponent from "../propterties";
import GameEngine from "@/app/core";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Events from "../events";
import { VscSettings } from "react-icons/vsc";
import { GrAction } from "react-icons/gr";

export function Parameters({
  gameEngine,
  object,
}: {
  gameEngine: GameEngine;
  object: GameObjectType;
}) {
  const changeObjectParameter = (
    parameter: GameObjectParameterType,
    id: string,
    value: string | number | boolean | [number, number]
  ) => {
    gameEngine.inspector.changeObjectParameter(id, {
      parameter,
      value,
    });
  };

  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  function proeprtiesToggle() {
    setIsPropertiesOpen((prev) => !prev);
  }
  function eventsToggle() {
    setIsEventsOpen((prev) => !prev);
  }

  return (
    <ul className="flex flex-col gap-2">
      {/* Properties */}
      <li className=" text-sm border-2 border-gray-500 p-2 rounded-sm">
        <div className="  flex justify-between  ">
          <div className="flex justify-between items-center">
            <VscSettings className="text-[25px]" />
            <h2 className="text-white font-semibold "> (properties)</h2>
          </div>

          <FaArrowRight
            onClick={() => {
              proeprtiesToggle();
            }}
            fontSize={"21px"}
            className={`cursor-pointer transition-all ${
              isPropertiesOpen ? "rotate-90" : ""
            }`}
          />
        </div>
        {isPropertiesOpen && (
          <PropertiesComponent
            changeObjectParameter={changeObjectParameter}
            obj={object}
          />
        )}
      </li>

      {/* Events */}
      <li className="text-sm border-2 border-gray-500 p-2 rounded-sm">
        <div className="  flex justify-between  ">

          <div className="flex justify-between items-center">
            <GrAction className="text-[20px]" />
            <h2 className="text-white font-semibold "> (events)</h2>
          </div>

          <FaArrowRight
            onClick={() => {
              eventsToggle();
            }}
            fontSize={"21px"}
            className={`cursor-pointer transition-all ${
              isEventsOpen ? "rotate-90" : ""
            }`}
          />
        </div>
        {isEventsOpen && <Events gameObject={object} />}
      </li>
    </ul>
  );
}
