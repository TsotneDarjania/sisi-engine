// store.ts
import { create } from "zustand";
import GameEngine from "@/app/core";
import { InspectorObjectType } from "@/app/core/engine/inspector";

type StoreState = {
  gameEngine: GameEngine | null;
  setGameEngine: (engine: GameEngine) => void;

  inspectorObjects: InspectorObjectType[];
  setInspectorObjects: (objs: InspectorObjectType[]) => void;
};

const useStore = create<StoreState>((set) => ({
  gameEngine: null,
  setGameEngine: (engine) => set({ gameEngine: engine }),

  inspectorObjects: [],
  setInspectorObjects: (objs) => set({ inspectorObjects: objs }),
}));

export default useStore;
