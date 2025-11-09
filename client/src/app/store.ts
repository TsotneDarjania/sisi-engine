// store.ts
import { create } from "zustand";
import GameEngine from "@/app/core";
import { GameObjectType } from "@/types/engineTypes";

type EventType = "onClick" | "mouseOver" | "mouseUp";

type StoreState = {
  gameEngine: GameEngine | null;
  setGameEngine: (engine: GameEngine) => void;

  addEventInterfaceState: {
    isOpen: boolean;
    gameObject: GameObjectType | null;
    eventType: EventType | null;
  };
  setIsAddEventPopupOpen: (state: {
    isOpen: boolean;
    gameObject: GameObjectType | null;
    eventType: EventType | null;
  }) => void;
};

const useStore = create<StoreState>((set) => ({
  gameEngine: null,
  setGameEngine: (engine) => set({ gameEngine: engine }),

  addEventInterfaceState: {
    isOpen: false,
    gameObject: null,
    eventType: null,
  },

  setIsAddEventPopupOpen: ({ isOpen, gameObject, eventType }) =>
    set({
      addEventInterfaceState: { isOpen, gameObject, eventType },
    }),
}));

export default useStore;
