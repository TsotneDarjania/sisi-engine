"use client";

import { useEffect, useRef, useState } from "react";
import { SlSizeFullscreen } from "react-icons/sl";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { FaCircleStop } from "react-icons/fa6";
import useStore from "@/app/store";
import { AssetType } from "@/enums/userEventEnums";
import BuildSettingsComponent from "../buildSettingsComponent/BuildSettinsComponent";
import { CiPlay1 } from "react-icons/ci";

export default function SceneComponent() {
  const gameEngine = useStore((state) => state.gameEngine)!;
  const editorDivRef = useRef<HTMLDivElement>(null);
  const runtimeDivRef = useRef<HTMLDivElement>(null);
  const playIconRef = useRef<HTMLDivElement>(null);
  const stopIconRef = useRef<HTMLDivElement>(null);
  const setupDineRef = useRef(false);
  const [isOpenBuildSettins, setIsOpenBuildSettings] = useState(false);

  const mode = useRef<"editor" | "runtime">("editor");

  useEffect(() => {
    if (setupDineRef.current) return; // already set up

    setupDineRef.current = true; // mark as done
    const setup = async () => {
      await gameEngine.createScene(editorDivRef.current!);
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
    if (mode.current === "editor") {
      const el = editorDivRef.current;
      if (!el) return;
      if (el.requestFullscreen) {
        el.requestFullscreen().catch((err) => {
          console.error("Fullscreen request failed:", err);
          alert("Sorry Your Browser does not support full screen mode...");
        });
      }
    }

    if (mode.current === "runtime") {
      const runtime_el = runtimeDivRef.current;
      if (!runtime_el) return;
      if (runtime_el.requestFullscreen) {
        runtime_el.requestFullscreen().catch((err) => {
          console.error("Fullscreen request failed:", err);
          alert("Sorry Your Browser does not support full screen mode...");
        });
      }
    }
  }

  return (
    <main className="flex flex-col justify-start items-center pt-2 relative">
      {/* Interface */}
      <div className="flex text-white  justify-between w-full items-center pl-1 pr-2">
        {/* Donwload Icon */}
        <FaFileDownload
          onClick={() => {
            setIsOpenBuildSettings(true);
          }}
          fontSize={"30px"}
          className=" text-white cursor-pointer z-10"
        />

        <div className=" z-10 flex items-center justify-center gap-2">
          {/* Play Icon */}
          <div className="absolute right-[35px]" ref={playIconRef}>
            <CiPlay1
              onClick={() => {
                mode.current = "runtime";
                playIconRef.current!.style.visibility = "hidden";
                stopIconRef.current!.style.visibility = "visible";
                runtimeDivRef.current!.style.visibility = "visible";
                gameEngine.playRuntimeGame()
              }}
              fontSize={"35px"}
              className=" text-white cursor-pointer z-10"
            />
          </div>

          {/* Stop Icon */}
          <div className="absolute right-[40px]" style={{ visibility: "hidden" }} ref={stopIconRef}>
            <FaCircleStop
              onClick={() => {
                mode.current = "editor";
                playIconRef.current!.style.visibility = "visible";
                runtimeDivRef.current!.style.visibility = "hidden";
                stopIconRef.current!.style.visibility = "hidden";
                gameEngine.stopRuntimeGame()
              }}
              fontSize={"32px"}
              className=" text-white cursor-pointer z-10"
            />
          </div>

          {/* Full Screen Icon */}
          <SlSizeFullscreen
            onClick={handleFullScreen}
            fontSize={"25px"}
            className=" text-white cursor-pointer z-10"
          />
        </div>
      </div>

      {/* Editor Div*/}
      <div
        id="game-canvas-parent-element"
        className="w-full h-screen absolute top-0 left-0"
        ref={editorDivRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      ></div>

      {/* Runtime Div */}
      <div
        ref={runtimeDivRef}
        style={{ visibility: "hidden" }}
        id="runtime-game-parent-element"
        className="w-full h-screen absolute top-0 left-0"
      ></div>

      {editorDivRef && isOpenBuildSettins && (
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
