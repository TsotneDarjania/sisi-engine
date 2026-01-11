"use client";

import AssetsComponent from "@/app/components/engineComponent/assetsComponent/Assets";
import SceneComponent from "./sceneComponent/SceneComponent";
import InspectorComponent from "./inspectorComponent/InspectorComponent";
import { useEffect, useRef, useState } from "react";
import GameEngine from "@/app/core";
import useStore from "@/app/store";
import AddEventInterface from "./inspectorComponent/components/addEventIntInterface";

export default function EngineComponent() {
  const gameEngine = useStore((state) => state.gameEngine);
  const setGameEngine = useStore((state) => state.setGameEngine);

  const addEventInterfaceState = useStore(
    (state) => state.addEventInterfaceState
  );

  useEffect(() => {
    const engine = new GameEngine();
    setGameEngine(engine);
  }, []);

  if (!gameEngine) {
    return null;
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] h-screen">
      {/* Assets */}
      <AssetsComponent />
      {/* Scene */}
      <SceneComponent />
      {/* Inspector */}
      <InspectorComponent />
      {/* UI Interfaces */}
      {addEventInterfaceState.isOpen && <AddEventInterface />}
    </div>
  );
}
