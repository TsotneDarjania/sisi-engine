import { useState } from "react";
import useStore from "@/app/store";
import { GameObjectType } from "@/types/engineTypes";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { AddEventWindowPopup } from "./components/addEventWindow";

export default function Events({ gameObject }: { gameObject: GameObjectType }) {
  const [isAddEventWindowOpen, setIsAddEventWindowOpen] = useState(false);

  const setIsAddEvnetPopupOpen = useStore(
    (state) => state.setIsAddEventPopupOpen
  );

  return (
    <ul className="mt-2">
      <li
        onClick={() => {
          setIsAddEventWindowOpen((prev) => !prev);
        }}
        className=" flex justify-center items-center gap-2 w-full text-center border-2 py-1 border-white cursor-pointer"
      >
        <FaPlus className="cursor-pointer text-2xl " />
        Add Event
      </li>

      {
        isAddEventWindowOpen && <AddEventWindowPopup />
      }

      {/* Event Options
      {isAddEventWindowOpen && (
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
          <p
            onClick={() => {
              setIsAddEvnetPopupOpen({
                isOpen: true,
                gameObject: gameObject,
                eventName: "mouseOver",
              });
            }}
            className=" border-1 border-dotted border-white cursor-pointer"
          >
            onMouseOver
          </p>
          <p
            onClick={() => {
              setIsAddEvnetPopupOpen({
                isOpen: true,
                gameObject: gameObject,
                eventName: "mouseLeave",
              });
            }}
            className=" border-1 border-dotted border-white cursor-pointer"
          >
            onMouseLeave
          </p>
          <p
            onClick={() => {
              setIsAddEvnetPopupOpen({
                isOpen: true,
                gameObject: gameObject,
                eventName: "mouseUp",
              });
            }}
            className=" border-1 border-dotted border-white cursor-pointer"
          >
            onMouseUp
          </p>
        </li>
      )} */}
    </ul>
  );
}
