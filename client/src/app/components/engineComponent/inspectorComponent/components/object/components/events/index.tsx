import { useState } from "react";
import useStore from "@/app/store";
import { GameObjectType } from "@/types/engineTypes";

export default function Events({ gameObject }: { gameObject: GameObjectType }) {
  const [isEventOptionsOpen, setIsEventOptionsOpen] = useState(false);

  const setIsAddEvnetPopupOpen = useStore(
    (state) => state.setIsAddEventPopupOpen
  );

  return (
    <ul>
      <li
        onClick={() => {
          setIsEventOptionsOpen((prev) => !prev);
        }}
        className=" w-full text-center border-2 py-1 border-white cursor-pointer"
      >
        Add
      </li>

      {/* Event Options */}
      {isEventOptionsOpen && (
        <li className=" flex flex-col justify-center text-center mt-2 p-2 gap-2">
          <p
            onClick={() => {
              setIsAddEvnetPopupOpen({
                isOpen: true,
                gameObject: gameObject,
                eventName: "onClick",
              });
            }}
            className=" border-1 border-dotted border-white cursor-pointer"
          >
            onClick
          </p>
          <p onClick={() => {
              setIsAddEvnetPopupOpen({
                isOpen: true,
                gameObject: gameObject,
                eventName: "mouseOver",
              });
            }}  className=" border-1 border-dotted border-white cursor-pointer">
            onMouseOver
          </p>
          <p onClick={() => {
              setIsAddEvnetPopupOpen({
                isOpen: true,
                gameObject: gameObject,
                eventName: "mouseLeave",
              });
            }}  className=" border-1 border-dotted border-white cursor-pointer">
            onMouseLeave
          </p>
          <p onClick={() => {
              setIsAddEvnetPopupOpen({
                isOpen: true,
                gameObject: gameObject,
                eventName: "mouseUp",
              });
            }} className=" border-1 border-dotted border-white cursor-pointer">
            onMouseUp
          </p>
        </li>
      )}
    </ul>
  );
}
