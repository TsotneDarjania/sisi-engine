"use client";

import { MdDeleteForever } from "react-icons/md";
import { IoMdMove } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

import { useRef, useState } from "react";
import Image from "next/image";
import GameEngine from "@/app/core";
import { AssetType } from "@/app/core/engine/assets";

export default function AssetsComponent({
  gameEngine,
}: {
  gameEngine: GameEngine;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState<AssetType[]>([]);

  function handleAddAsset() {
    inputRef.current?.click();
  }

  function handleAssetDelete(assetName: string) {
    gameEngine.deleteAsset(assetName);
    setAssets(gameEngine.getAllAsset());
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      gameEngine.addNewAsset(file);
      setAssets(gameEngine.getAllAsset());
      event.target.value = "";
    }
  }

  return (
    <aside className="flex items-center h-screen flex-col border-2 border-gray-700">
      <header className="bg-gray-900 flex justify-center items-center border-white border-2 border-l-0 border-r-0 border-t-0 w-full p-4">
        <h2 className="text-xl custom-font-1 text-white ">Assets</h2>
      </header>
      <ul className="flex flex-col items-center w-full">
        {assets.map((asset) => (
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
                  return (
                    <video className="w-5 h-5" src={asset.blobURL}></video>
                  );
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
                  console.log("drag");
                  e.dataTransfer.setData("text/plain", asset.name);
                }}
                className="cursor-pointer inline-block"
              >
                <IoMdMove fontSize="25px" />
              </div>

              {/* Delete */}
              <MdDeleteForever
                onClick={() => {
                  handleAssetDelete(asset.name);
                }}
                className="cursor-pointer"
                fontSize={"30px"}
              />
            </div>
          </li>
        ))}
        <li className=" w-full  h-full">
          <input
            onChange={handleFileChange}
            ref={inputRef}
            className="hidden"
            type="file"
          ></input>

          <IoAddCircleOutline
            fontSize={"50px"}
            className="w-full flex justify-center items-center cursor-pointer"
            onClick={handleAddAsset}
          />
        </li>
      </ul>
    </aside>
  );
}
