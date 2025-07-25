"use client";

import { InspectorObjectType } from "@/app/core/engine/inspector";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import InspectorObjectComponent from "../inspectorObjectComponent";

export type PropertiesComponentType = {
  obj: InspectorObjectType;
  changeObjectParameter: (
    parameter: string,
    objName: string,
    value: string | number | boolean
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
        <label>Scale :</label>
        <input
          className="text-center border"
          defaultValue={props.obj.gameObject.scale.x}
          type="number"
          onChange={(e) => {
            props.changeObjectParameter(
              "scale",
              props.obj.name,
              e.currentTarget.value
            );
          }}
        />
      </li>
      <li className="flex justify-between">
        <label>Pos X :</label>
        <input
          className="text-center border"
          defaultValue={props.obj.gameObject.x}
          type="number"
          onChange={(e) => {
            props.changeObjectParameter(
              "x",
              props.obj.name,
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
          type="number"
          onChange={(e) => {
            props.changeObjectParameter(
              "y",
              props.obj.name,
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
          type="number"
          onChange={(e) => {
            props.changeObjectParameter(
              "width",
              props.obj.name,
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
          type="number"
          onChange={(e) => {
            props.changeObjectParameter(
              "height",
              props.obj.name,
              e.currentTarget.value
            );
          }}
        />
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
              props.obj.name,
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
              props.obj.name,
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
