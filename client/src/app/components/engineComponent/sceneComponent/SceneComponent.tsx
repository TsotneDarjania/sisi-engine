"use client";

import { useEffect, useRef, useState } from "react";
import GameEngine from "@/app/core";
import { SlSizeFullscreen } from "react-icons/sl";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaToolbox } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import BuildSettingsComponent from "../buildSettingsComponent/BuildSettinsComponent";

export default function SceneComponent({
  gameEngine,
  onObjectAdded,
}: {
  gameEngine: GameEngine;
  onObjectAdded: () => void;
}) {
  const sceneDivRef = useRef<HTMLDivElement>(null);
  const [isSceneCreated, setIsSceneCreated] = useState(false);
  const [isOpenBuildSettins, setIsOpenBuildSettings] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await gameEngine.createScene(sceneDivRef.current!);
      setIsSceneCreated(true);
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

  function handleFullScreen() {
    const el = sceneDivRef.current;
    if (!el) return;

    if (el.requestFullscreen) {
      el.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
        alert("Sorry Your Browser does not support full screen mode...");
      });
    }
  }

  return (
    <main className="flex flex-col justify-start items-center pt-3 relative">
      {/* Interface */}
      <div className="flex text-white  justify-between w-full items-center pl-4 pr-4">
        {/* Donwload Icon */}
        <FaFileDownload
          onClick={() => {
            setIsOpenBuildSettings(true);
          }}
          fontSize={"35px"}
          className=" text-white cursor-pointer z-10"
        />

        <div className=" z-10 flex items-center justify-center gap-2">
          {/* Play Icon */}
          <AiOutlinePlaySquare
            fontSize={"45px"}
            className=" text-white cursor-pointer z-10"
          />
          {/* Full Screen Icon */}
          <SlSizeFullscreen
            onClick={handleFullScreen}
            fontSize={"30px"}
            className=" text-white cursor-pointer z-10"
          />
        </div>
      </div>

      <div
        className="w-full h-screen absolute top-0 left-0"
        ref={sceneDivRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      ></div>

      {isSceneCreated && isOpenBuildSettins && (
        <>
          {/* Shadow */}
          <div
            onClick={() => {
              setIsOpenBuildSettings(false);
            }}
            className="w-screen cursor-pointer h-screen fixed left-0 top-0 bg-black z-20 opacity-90"
          ></div>
          <BuildSettingsComponent
            gameEngine={gameEngine}
            canvasWidth={gameEngine.canvas.clientWidth}
            canvasHeight={gameEngine.canvas.clientHeight}
          />
        </>
      )}
    </main>
  );
}
