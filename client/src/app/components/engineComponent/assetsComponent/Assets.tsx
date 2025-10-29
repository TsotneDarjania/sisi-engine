"use client";
import { IoAddCircleOutline } from "react-icons/io5";

import { useEffect, useRef, useState } from "react";
import useStore from "@/app/store";
import { AssetComponent } from "./assetComponent/AssetComponent";
import { AssetEventEnums, AssetType } from "@/enums/userEventEnums";

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
    <aside className="flex items-center h-screen flex-col border-2 border-gray-700">
      <header className="bg-gray-900 flex justify-center items-center border-white border-2 border-l-0 border-r-0 border-t-0 w-full p-4">
        <h2 className="text-xl custom-font-1 text-white ">Assets</h2>
      </header>
      <ul className="flex flex-col items-center w-full">
        {assets.map((asset) => (
          <AssetComponent
            key={asset.id}
            asset={asset}
            deleteAsset={deleteAsset}
          />
        ))}
        <li className="w-full h-full">
          <input
            onChange={addAsset}
            ref={inputRef}
            className="hidden"
            type="file"
          ></input>

          {/* Add Asset Button */}
          <IoAddCircleOutline
            fontSize={"50px"}
            className="w-full flex justify-center items-center cursor-pointer"
            onClick={clickOnAddAssetButton}
          />
        </li>
      </ul>
    </aside>
  );
}
