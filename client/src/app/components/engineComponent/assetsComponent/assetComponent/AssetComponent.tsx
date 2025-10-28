import { AssetType } from "@/app/core/engine/assets";
import Image from "next/image";
import { IoMdMove } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

export function AssetComponent({ asset, deleteAsset }: { asset: AssetType, deleteAsset : (id : string) => void}) {
  return (
    <li
      key={asset.name}
      className="text-sm w-full truncate justify-between flex items-center border pt-2 pb-2 border-l-0 border-r-0 border-t-0"
    >
      <div className=" gap-2 flex items-center h-full">
        {/* Type */}
        <p className=" text-gray-800 font-bold">{asset.type}</p>
        {/* Name */}
        <p>{asset.name}</p>
        {/* Preview */}

        {(() => {
          if (asset.type === "video") {
            return <video className="w-5 h-5" src={asset.blobURL}></video>;
          }
          if (asset.type === "img") {
            return (
              <div className="relative w-5 h-5">
                <Image
                  fill
                  objectFit="contain"
                  src={asset.blobURL}
                  alt={asset.name}
                />
              </div>
            );
          }
        })()}
      </div>

      {/* Controllers */}
      <div className="flex items-center ">
        {/* Move */}
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", asset.name);
            e.dataTransfer.setData("origin", "assets");
          }}
          className="cursor-pointer inline-block"
        >
          <IoMdMove fontSize="25px" />
        </div>

        {/* Delete */}
        <MdDeleteForever
          onClick={() => {
            deleteAsset(asset.name);
          }}
          className="cursor-pointer"
          fontSize={"30px"}
        />
      </div>
    </li>
  );
}
