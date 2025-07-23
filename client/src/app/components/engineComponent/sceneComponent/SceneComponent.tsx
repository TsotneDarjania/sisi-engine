"use client";

import { useEffect, useRef } from "react";
import GameEngine from "@/app/core/engine";
import { uid } from "@/helper";

export default function SceneComponent({
  gameEngine,
  onObjectAdded,
}: {
  gameEngine: GameEngine;
  onObjectAdded: () => void;
}) {
  const sceneDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const setup = async () => {
      await gameEngine.createScene(sceneDivRef.current!);
    };

    setup();
  }, []);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const assetName = e.dataTransfer.getData("text/plain");
    const asset = gameEngine.getAssetByName(assetName);

    if (asset) {
      await gameEngine.addGameObject(
        asset.name,
        asset.blobURL,
        asset.type,
        asset.file
      );
      onObjectAdded();
    }
  };

  return (
    <main className="flex flex-col justify-start items-center border-2 border-gray-700 pt-5 relative">
      {/* Interface */}
      <div className="flex  justify-between w-full items-center gap-3 pl-4 pr-4">
        <h2 className="text-center z-10">
          {gameEngine.sceneName} {`(scene)`}
        </h2>
        <button
          onClick={() => {
            gameEngine.build();
          }}
          className="z-10 border p-2 cursor-pointer"
        >
          Build
        </button>
      </div>

      <div
        className="w-full h-screen absolute top-0 left-0"
        ref={sceneDivRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      ></div>
    </main>
  );
}
