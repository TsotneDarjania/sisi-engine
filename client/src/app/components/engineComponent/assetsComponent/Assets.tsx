"use client";

import { MdDeleteForever } from "react-icons/md";
import { IoMdMove } from "react-icons/io";

import { useRef, useState } from "react";
import Image from "next/image";
import GameEngine from "@/app/core/engine";
import { AssetType } from "@/app/core/engine/assets";

export default function AssetsComponent({
  gameEngine,
}: {
  gameEngine: GameEngine;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState<AssetType[]>([]);

  console.log("re render");

  function handleAddAsset() {
    inputRef.current?.click();
  }

  function handleAssetDelete(assetName: string) {
    const newArr = assets.filter((asset) => asset.name !== assetName);
    setAssets(newArr);
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
    <aside className="flex flex-col items-center border-2 p-5">
      <h2>Assets</h2>
      <ul className="flex flex-col items-center w-full">
        {assets.map((asset) => (
          <li
            key={asset.name}
            className="text-sm w-full truncate justify-between flex items-center border p-2"
          >
            <div className=" flex items-center h-full gap-2">
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
          <button
            onClick={handleAddAsset}
            className="border-2 h-[40px] w-full text-2xl border-gray-700 flex justify-center items-center cursor-pointer mt-2"
          >
            +
          </button>
        </li>
      </ul>
    </aside>
  );
}
