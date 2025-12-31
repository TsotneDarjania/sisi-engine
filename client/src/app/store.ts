// store.ts
import { create } from "zustand";
import GameEngine from "@/app/core";
import { GameObjectEventName, GameObjectEventType, GameObjectType } from "@/types/engineTypes";

type StoreState = {
  gameEngine: GameEngine | null;
  setGameEngine: (engine: GameEngine) => void;

  addEventInterfaceState: {
    isOpen: boolean;
    gameObject: GameObjectType | null;
    eventName: GameObjectEventName | null;
  };
  setIsAddEventPopupOpen: (state: {
    isOpen: boolean;
    gameObject: GameObjectType | null;
    eventName:  GameObjectEventName | null;
  }) => void;
};

const useStore = create<StoreState>((set) => ({
  gameEngine: null,
  setGameEngine: (engine) => set({ gameEngine: engine }),

  addEventInterfaceState: {
    isOpen: false,
    gameObject: null,
    eventName: null,
  },

  setIsAddEventPopupOpen: ({ isOpen, gameObject, eventName }) =>
    set({
      addEventInterfaceState: { isOpen, gameObject, eventName },
    }),
}));

export default useStore;
