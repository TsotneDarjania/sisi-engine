"use client";

import AssetsComponent from "@/app/components/engineComponent/assetsComponent/Assets";
import SceneComponent from "./sceneComponent/SceneComponent";
import InspectorComponent from "./inspectorComponent/InspectorComponent";
import { useEffect, useRef, useState } from "react";
import GameEngine from "@/app/core";
import { InspectorObjectType } from "@/app/core/engine/inspector";
import BuildSettingsComponent from "./buildSettingsComponent/BuildSettinsComponent";

export default function EngineComponent() {
  const gameEngine = useRef<GameEngine | null>(null);
  const [isReady, setIsReady] = useState(false);

  const [objects, setObjects] = useState<InspectorObjectType[]>([]);

  const updateInspectorObjects = () => {
    const objects = gameEngine.current?.getAllInspectorObject() || [];
    setObjects(objects.map((obj) => ({ ...obj })));
  };

  useEffect(() => {
    gameEngine.current = new GameEngine();
    setIsReady(true);
  }, []);

  if (!isReady || !gameEngine.current) {
    return null; // Optionally render a loading UI here
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] h-screen">
      {/* Assets */}
      <AssetsComponent gameEngine={gameEngine.current} />
      {/* Scene */}
      <SceneComponent
        onObjectAdded={updateInspectorObjects}
        gameEngine={gameEngine.current}
      />
      {/* Inspector */}
      <InspectorComponent
        updateInspectorObjects={updateInspectorObjects}
        gameEngine={gameEngine.current}
        objects={objects}
      />
    </div>
  );
}
