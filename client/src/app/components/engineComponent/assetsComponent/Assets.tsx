"use client";
import { IoAddCircleOutline } from "react-icons/io5";

import { useEffect, useRef, useState } from "react";
import useStore from "@/app/store";
import { AssetComponent } from "./components/asset/AssetComponent";
import { AssetEventEnums, AssetType } from "@/enums/userEventEnums";
import { FaPlus, FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function AssetsComponent() {
  const gameEngine = useStore((state) => state.gameEngine)!;

  const inputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState<AssetType[]>([]);

  function clickOnAddAssetButton() {
    inputRef.current?.click();
  }

  function deleteAsset(id: string) {
    gameEngine.assets.deleteAsset(id);
  }

  function addAsset(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      gameEngine.assets.addAsset(file);
      event.target.value = "";
    }
  }

  useEffect(() => {
    gameEngine.events.on(AssetEventEnums.addAsset, () => {
      setAssets([...gameEngine.assets.gameAssets]);
    });
    gameEngine.events.on(AssetEventEnums.deleteAsset, () => {
      setAssets([...gameEngine.assets.gameAssets]);
    });
  }, []);

  return (
    <aside className="flex items-center h-screen flex-col border-2 bg-gray-800 border-gray-700">
      <header className="bg-[radial-gradient(ellipse_at_center,_#1b2436_0%,_#0b1020_55%,_#05070d_100%)] flex justify-center items-center border-l-0 border-r-0 border-t-0 w-full p-4">
        <h2 className="text-xl custom-font-1 text-white ">Assets</h2>
      </header>
      {/* Add Indicator */}
      <div className="w-[90%] h-[50px] flex items-center text-gray-300 justify-between">
        <p>Assets</p>
        <FaPlus
          onClick={clickOnAddAssetButton}
          className="cursor-pointer text-2xl "
        />
      </div>
      {/* Search Bar */}
      <div className=" flex justify-between items-center w-[90%] h-[40px] border-2 border-gray-700 border-l-0 border-r-0 border-b-0">
        <input
          className="bg-gray-600 w-[90%] h-full mt-2 rounded-sm rounded-r-none border-2 border-gray-500 outline-0 p-2 text-white"
          type="text"
          name=""
          id=""
          placeholder="Search..."
        />
        <div className=" border-gray-500 border-l-0 rounded-sm rounded-l-none border-2 bg-gray-700 mt-2 w-[10%] h-full flex justify-center items-center cursor-pointer">
          <FaSearch className="mt-[1px] text-2x text-white" />
        </div>
      </div>
      <ul className="flex flex-col mt-2 gap-1 items-center w-full">
        {assets.map((asset) => (
          <AssetComponent
            key={asset.id}
            asset={asset}
            deleteAsset={deleteAsset}
          />
        ))}

        <input
          onChange={addAsset}
          ref={inputRef}
          className="hidden"
          type="file"
        ></input>
      </ul>
    </aside>
  );
}
