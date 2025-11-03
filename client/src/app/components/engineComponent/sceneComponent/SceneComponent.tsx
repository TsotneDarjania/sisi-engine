"use client";

import { useEffect, useRef, useState } from "react";
import { SlSizeFullscreen } from "react-icons/sl";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import useStore from "@/app/store";
import { AssetType } from "@/enums/userEventEnums";
import BuildSettingsComponent from "../buildSettingsComponent/BuildSettinsComponent";

export default function SceneComponent() {
  const gameEngine = useStore((state) => state.gameEngine)!;
  const sceneDivRef = useRef<HTMLDivElement>(null);
  const setupDoneRef = useRef(false); // <-- ref to guard setup
  const [isOpenBuildSettins, setIsOpenBuildSettings] = useState(false);

  useEffect(() => {
    if (setupDoneRef.current) return; // already set up

    setupDoneRef.current = true; // mark as done
    const setup = async () => {
      await gameEngine.createScene(sceneDivRef.current!);
    };
    setup();
  }, []); // empty dependency array

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const origin = e.dataTransfer.getData("origin");

    if (origin !== "assets") {
      console.log("Ignored drop from non-assets");
      return;
    }

    const asset = JSON.parse(
      e.dataTransfer.getData("application/json")
    ) as unknown as AssetType;
    gameEngine.engineScene.droppedAsset(asset);
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
            onClick={() => {
              gameEngine.playScene();
            }}
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

      {/* Canvas Parent Div*/}
      <div
        className="w-full h-screen absolute top-0 left-0"
        ref={sceneDivRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      ></div>

      {setupDoneRef && isOpenBuildSettins && (
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
            canvasWidth={gameEngine.engineScene.canvas.width}
            canvasHeight={gameEngine.engineScene.canvas.height}
          />
        </>
      )}
    </main>
  );
}
