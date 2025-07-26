import { InspectorObjectType } from "@/app/core/engine/inspector";
import { FaArrowRight } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { IoMdMove } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

export default function InspectorObjectIndicators({
  object,
  toggle,
  deleteObject,
  isOpen,
}: {
  object: InspectorObjectType;
  toggle: () => void;
  deleteObject: (objName: string) => void;
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
            console.log("drag");
            e.dataTransfer.setData("origin", "inspector");
            e.dataTransfer.setData("object_name", object.name);
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
            deleteObject(object.name);
          }}
          className="cursor-pointer"
          fontSize={"30px"}
        />
      </div>
    </header>
  );
}
