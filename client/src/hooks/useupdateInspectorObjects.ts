// hooks/useUpdateInspectorObjects.ts
"use client";

import useStore from "@/app/store";
import { useCallback } from "react";

export default function useUpdateInspectorObjects() {
  const gameEngine = useStore((state) => state.gameEngine);
  const setInspectorObjects = useStore((state) => state.setInspectorObjects);

  const updateInspectorObjects = useCallback(() => {
    if (!gameEngine) {
      console.warn("GameEngine not available");
      return;
    }

    const objects = gameEngine.getAllInspectorObject() || [];

    setInspectorObjects(objects.map((obj) => ({ ...obj })));
  }, [gameEngine, setInspectorObjects]);

  return updateInspectorObjects;
}
