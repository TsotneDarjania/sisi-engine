"use client";

import GameEngine from "@/app/core/engine";
import { InspectorObjectType } from "@/app/core/engine/inspector";
import { Fragment, useState } from "react";

export default function InspectorComponent({
  objects,
  gameEngine,
}: {
  objects: InspectorObjectType[];
  gameEngine: GameEngine;
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

  return (
    <aside className="flex items-center flex-col border-2 border-gray-700 p-5">
      <h2>Inspector</h2>
      <ul className="w-full">
        {objects.map((object) => (
          <Fragment key={object.name}>
            <li className="flex items-center justify-between gap-2">
              <p>{object.type}</p>
              <p>{object.name}</p>
            </li>
            <ul className="w-full bg-gray-600 p-2 text-white">
              <li className="flex justify-between">
                <label>Scale :</label>
                <input
                  className="text-center border"
                  defaultValue={object.gameObject.scale.x}
                  type="number"
                  onChange={(e) => {
                    changeObjectParameter(
                      "scale",
                      object.name,
                      e.currentTarget.value
                    );
                  }}
                />
              </li>
              <li className="flex justify-between">
                <label>Pos X :</label>
                <input
                  className="text-center border"
                  defaultValue={object.gameObject.x}
                  type="number"
                  onChange={(e) => {
                    changeObjectParameter(
                      "x",
                      object.name,
                      e.currentTarget.value
                    );
                  }}
                />
              </li>
              <li className="flex justify-between">
                <label>Pos Y :</label>
                <input
                  className="text-center border"
                  defaultValue={object.gameObject.y}
                  type="number"
                  onChange={(e) => {
                    changeObjectParameter(
                      "y",
                      object.name,
                      e.currentTarget.value
                    );
                  }}
                />
              </li>
              <li className="flex justify-between">
                <label>Width :</label>
                <input
                  className="text-center border"
                  defaultValue={object.gameObject.width}
                  type="number"
                  onChange={(e) => {
                    changeObjectParameter(
                      "width",
                      object.name,
                      e.currentTarget.value
                    );
                  }}
                />
              </li>
              <li className="flex justify-between">
                <label>Height :</label>
                <input
                  className="text-center border"
                  defaultValue={object.gameObject.height}
                  type="number"
                  onChange={(e) => {
                    changeObjectParameter(
                      "height",
                      object.name,
                      e.currentTarget.value
                    );
                  }}
                />
              </li>
              <li className="flex justify-between">
                <label>Opacity :</label>
                <input
                  className="text-center border"
                  defaultValue={object.gameObject.alpha}
                  type="number"
                  onChange={(e) => {
                    changeObjectParameter(
                      "opacity",
                      object.name,
                      e.currentTarget.value
                    );
                  }}
                />
              </li>
              <li className="flex justify-between">
                <label>Visible :</label>
                <input
                  className="text-center border"
                  defaultChecked={object.gameObject.visible}
                  // checked={object.gameObject.visible}
                  type="checkbox"
                  onChange={(e) => {
                    changeObjectParameter(
                      "visible",
                      object.name,
                      e.currentTarget.checked
                    );
                  }}
                />
              </li>
            </ul>
          </Fragment>
        ))}
      </ul>
    </aside>
  );
}
