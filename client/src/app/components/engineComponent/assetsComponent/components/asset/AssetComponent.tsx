import { AssetType } from "@/enums/userEventEnums";
import Image from "next/image";
import { IoMdMove } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

export function AssetComponent({
  asset,
  deleteAsset,
}: {
  asset: AssetType;
  deleteAsset: (id: string) => void;
}) {
  return (
    <li
      key={asset.name}
      className="text-sm bg-gray-700 w-[90%] h-[35px] p-2 truncate justify-between flex items-center border-1 rounded-sm border-gray-500 text-gray-400  "
    >
      <div className=" gap-2 flex items-center">
        {/* Type */}
        <p className=" text-gray-400 font-bold">{asset.type}</p>
        {/* Name */}
        <p>{asset.name}</p>
        {/* Preview */}
        {(() => {
          if (asset.type === "video") {
            return <video className="w-5 h-5" src={asset.blobURL}></video>;
          }
          if (asset.type === "image") {
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
      <div className="flex items-center text-white   ">
        {/* Move */}  
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("application/json", JSON.stringify({
              id : asset.id,
              name : asset.name,
              type : asset.type,
              blobURL : asset.blobURL
            }));
            e.dataTransfer.setData("origin", "assets");
          }}
          className="cursor-pointer inline-block"
        >
          <IoMdMove fontSize="25px" />
        </div>

        {/* Delete */}
        <RiDeleteBin5Line 
          onClick={() => {
            deleteAsset(asset.id);
          }}
          className="cursor-pointer"
          fontSize={"24px"}
        />
      </div>
    </li>
  );
}
