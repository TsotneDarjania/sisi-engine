import { GameObjectParameterType, GameObjectType } from "@/types/engineTypes";
import PropertiesComponent from "../propterties";
import GameEngine from "@/app/core";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Events from "../events";

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
    <ul>
      {/* Properties */}
      <li className=" ml-2">
        <div className="  flex justify-between  ">
          <h2 className="text-blue-400 font-semibold">Properties</h2>
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
      <li className=" ml-2">
        <div className="  flex justify-between  ">
          <h2 className="text-blue-400 font-semibold">Events</h2>
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
