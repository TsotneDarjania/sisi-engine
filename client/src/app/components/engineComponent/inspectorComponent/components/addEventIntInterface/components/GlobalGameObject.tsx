import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Properties } from "./Properties";

export function GlobalGameObject() {
  const [isPropertiesOPen, setIsPropertiesOpen] = useState(false);

  return (
    <div className="w-full">
      <p className=" text-yellow-500"> Object Name </p>
      <div className=" w-full flex justify-between">
        <p className=" text-white">Properties</p>
        <FaArrowRight
          onClick={() => {
            setIsPropertiesOpen((prev) => !prev);
          }}
          fontSize={"21px"}
          className={`text-white mr-2 cursor-pointer transition-all ${
            isPropertiesOPen ? "rotate-90" : ""
          }`}
        />
      </div>
      {isPropertiesOPen && <Properties />}
       <div className=" w-full h-1 border-2 border-yellow-600 border-dotted"></div>
    </div>
  );
}
