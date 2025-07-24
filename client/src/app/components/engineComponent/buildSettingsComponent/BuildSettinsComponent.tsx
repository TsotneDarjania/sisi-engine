"use client";

import GameEngine from "@/app/core";
import { useState } from "react";

export type BuildSettingsType = {
  canvasWidth: number;
  canvasHeight: number;
  gameEngine: GameEngine;
};

export default function BuildSettingsComponent(props: BuildSettingsType) {
  const [width, setWidth] = useState(props.canvasWidth);
  const [height, setHeight] = useState(props.canvasHeight);
  const [fullWidth, setFullWidth] = useState(false);
  const [fullHeight, setFullHeight] = useState(false);

  const handleDownload = () => {
    props.gameEngine.build(width, height, fullWidth, fullHeight);
  };

  return (
    <div className="w-[350px] h-fit fixed z-40 m-auto top-0 bottom-0 left-0 right-0 bg-white p-6 rounded-2xl border border-gray-300 shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center">Build Settings</h2>

      {/* Width */}
      <div className="flex items-center justify-between">
        <label className="font-medium w-16">Width:</label>
        <input
          type="number"
          className="border px-2 py-1 rounded w-24"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
          disabled={fullWidth}
          placeholder="px"
        />
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={fullWidth}
            onChange={(e) => setFullWidth(e.target.checked)}
          />
          Fullscreen
        </label>
      </div>

      {/* Height */}
      <div className="flex items-center justify-between">
        <label className="font-medium w-16">Height:</label>
        <input
          type="number"
          className="border px-2 py-1 rounded w-24"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
          disabled={fullHeight}
          placeholder="px"
        />
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={fullHeight}
            onChange={(e) => setFullHeight(e.target.checked)}
          />
          Fullscreen
        </label>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-4 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Download
      </button>
    </div>
  );
}
