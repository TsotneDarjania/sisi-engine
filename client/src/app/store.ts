// store.ts
import { create } from "zustand";
import GameEngine from "@/app/core";

type StoreState = {
  gameEngine: GameEngine | null;
  setGameEngine: (engine: GameEngine) => void;
};

const useStore = create<StoreState>((set) => ({
  gameEngine: null,
  setGameEngine: (engine) => set({ gameEngine: engine }),
}));

export default useStore;
