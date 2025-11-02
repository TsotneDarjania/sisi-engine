"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import InspectorObjectComponent from "../inspectorObjectComponent";
import { Sprite } from "pixi.js";
import { GameObjectParameterType, GameObjectType } from "@/types/engineTypes";

export type PropertiesComponentType = {
  obj: GameObjectType;
  changeObjectParameter: (
    parameter: GameObjectParameterType,
    objName: string,
    value: string | number | boolean | [number, number]
  ) => void;
};

export default function PropertiesComponent(props: PropertiesComponentType) {
  const [isChildsOpen, setIsChildsOpen] = useState(false);

  function toggle() {
    setIsChildsOpen((prev) => !prev);
  }

  return (
    <ul className="w-full text-white mt-3 transition-all">
      <li className="flex justify-between">
        <label>Pos X :</label>
        <input
          className="text-center border"
          defaultValue={props.obj.gameObject.x}
          type="string"
          onChange={(e) => {
            props.changeObjectParameter(
              "x",
              props.obj.id,
              e.currentTarget.value
            );
          }}
        />
      </li>
      <li className="flex justify-between">
        <label>Pos Y :</label>
        <input
          className="text-center border"
          defaultValue={props.obj.gameObject.y}
          type="string"
          onChange={(e) => {
            props.changeObjectParameter(
              "y",
              props.obj.id,
              e.currentTarget.value
            );
          }}
        />
      </li>
      <li className="flex justify-between">
        <label>Width :</label>
        <input
          className="text-center border"
          defaultValue={props.obj.gameObject.width}
          type="string"
          onChange={(e) => {
            props.changeObjectParameter(
              "width",
              props.obj.id,
              e.currentTarget.value
            );
          }}
        />
      </li>
      <li className="flex justify-between">
        <label>Height :</label>
        <input
          className="text-center border"
          defaultValue={props.obj.gameObject.height}
          type="string"
          onChange={(e) => {
            props.changeObjectParameter(
              "height",
              props.obj.id,
              e.currentTarget.value
            );
          }}
        />
      </li>
      <li className="flex justify-between">
        <label>Rotation :</label>
        <input
          className="text-center border"
          defaultValue={props.obj.gameObject.rotation}
          type="string"
          onChange={(e) => {
            props.changeObjectParameter(
              "rotation",
              props.obj.id,
              e.currentTarget.value
            );
          }}
        />
      </li>
      <li className="flex justify-between">
        <label>Ancor :</label>
        <div className="flex items-center">
          <input
            className="text-center border  w-[103px]"
            defaultValue={(props.obj.gameObject as Sprite).anchor.x}
            type="number"
            onChange={(e) => {
              props.changeObjectParameter(
                "ancor_x",
                props.obj.id,
                Number(e.currentTarget.value),
              );
            }}
          />
          <input
            className="text-center border w-[103px]"
            defaultValue={(props.obj.gameObject as Sprite).anchor.y}
            type="number"
            onChange={(e) => {
              props.changeObjectParameter(
                "ancor_y",
                props.obj.id,
                Number(e.currentTarget.value)
              );
            }}
          />
        </div>
      </li>
      <li className="flex justify-between">
        <label>Opacity :</label>
        <input
          className="text-center border"
          defaultValue={props.obj.gameObject.alpha}
          type="number"
          onChange={(e) => {
            props.changeObjectParameter(
              "opacity",
              props.obj.id,
              e.currentTarget.value
            );
          }}
        />
      </li>
      <li className="flex justify-between">
        <label>Visible :</label>
        <input
          className="text-center border"
          defaultChecked={props.obj.gameObject.visible}
          type="checkbox"
          onChange={(e) => {
            props.changeObjectParameter(
              "visible",
              props.obj.id,
              e.currentTarget.checked
            );
          }}
        />
      </li>
      {props.obj.childs.length > 0 && (
        <>
          <li className="flex justify-between">
            <label>Childs : </label>
            <div className="flex items-center gap-2">
              <p>{props.obj.childs.length}</p>
              {/* Arrow */}
              <FaArrowRight
                onClick={() => {
                  toggle();
                }}
                fontSize={"21px"}
                className={`cursor-pointer transition-all ${
                  isChildsOpen ? "rotate-90" : ""
                }`}
              />
            </div>
          </li>
          {isChildsOpen &&
            props.obj.childs.map((obj, key) => (
              <InspectorObjectComponent key={key} object={obj} />
            ))}
        </>
      )}
    </ul>
  );
}
