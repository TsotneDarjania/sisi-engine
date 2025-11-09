import { GameObjectType } from "@/types/engineTypes";
import { FaArrowRight } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { IoMdMove } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

export default function Indicators({
  object,
  toggle,
  deleteObject,
  isOpen,
}: {
  object: GameObjectType;
  toggle: () => void;
  deleteObject: (id: string) => void;
  isOpen: boolean;
}) {
  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <p>{object.type}</p>
        {object.childs.length > 0 && <FiBox fontSize={"25px"} />}
      </div>

      <p>{object.name}</p>

      {/* Controllers */}
      <div className="flex justify-center items-center">
        {/* DragAndDrop Icon */}
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("origin", "inspector");
            e.dataTransfer.setData("object_id", object.id);
          }}
          className="cursor-pointer inline-block"
        >
          <IoMdMove fontSize="25px" />
        </div>
        {/* Arrow */}
        <FaArrowRight
          onClick={() => {
            toggle();
          }}
          fontSize={"21px"}
          className={`cursor-pointer transition-all ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        {/* Delete */}
        <MdDeleteForever
          onClick={() => {
            deleteObject(object.id);
          }}
          className="cursor-pointer"
          fontSize={"30px"}
        />
      </div>
    </header>
  );
}
