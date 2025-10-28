import { AssetEventEnums } from "@/enums/userEventEnums";
import EventManager from "../../eventManager";

export type AssetType = {
  name: string;
  type: string;
  file: File;
  blobURL: string;
};

export default class Assets {
  public gameAssets: Record<string, AssetType> = {};

  constructor(public eventManager: EventManager) {}

  public addAsset(file: File) {
    this.eventManager.emit(AssetEventEnums.addAsset, {
      id: "2",
      type: "img",
    });
  }

  public deleteAsset() {}

  // public deleteAsset(name: string) {
  //   delete this.assets[name];
  // }

  // public addNewAsset(file: File) {
  //   const blobURL = URL.createObjectURL(file);

  //   const detectType = () => {
  //     if (file.type.includes("image")) return "img";
  //     if (file.type.includes("video")) return "video";
  //     return "unknown";
  //   };

  //   const fileParts = file.name.split(".");
  //   const extension = fileParts.pop();
  //   let baseName = fileParts.join(".");

  //   if (baseName.length > 18) {
  //     baseName = baseName.slice(0, 10);
  //   }

  //   // 👉 Check for exact duplicate by size and lastModified:
  //   const duplicate = Object.values(this.assets).find(
  //     (asset) =>
  //       asset.file.size === file.size &&
  //       asset.file.lastModified === file.lastModified
  //   );

  //   if (duplicate) {
  //     alert(`Asset already added: ${duplicate.name}`);
  //     return; // Skip adding completely
  //   }

  //   let finalName = baseName;
  //   let count = 1;
  //   let fileNameWithExtension = `${finalName}.${extension}`;

  //   while (
  //     Object.values(this.assets).find(
  //       (asset) => asset.name === fileNameWithExtension
  //     )
  //   ) {
  //     count++;
  //     finalName = `${baseName}(clone ${count - 1})`;
  //     fileNameWithExtension = `${finalName}.${extension}`;
  //   }

  //   this.assets[fileNameWithExtension] = {
  //     name: fileNameWithExtension,
  //     type: detectType(),
  //     file,
  //     blobURL,
  //   };
  // }

  // public getAllAsset() {
  //   return Object.values(this.assets);
  // }

  // public getAssetByName(name: string): AssetType | undefined {
  //   return Object.values(this.assets).find((asset) => asset.name === name);
  // }
}
