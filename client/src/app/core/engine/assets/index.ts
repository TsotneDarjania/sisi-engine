import { AssetEventEnums, AssetType } from "@/enums/userEventEnums";
import EventManager from "../../eventManager";
import { uid } from "@/helper";

export default class Assets {
  public gameAssets: Array<AssetType> = [];

  constructor(public eventManager: EventManager) {}

  public addAsset(file: File) {
    const blobURL = URL.createObjectURL(file);

    const detectType = () => {
      if (file.type.includes("image")) return "image";
      if (file.type.includes("video")) return "video";
      return "unknown";
    };

    const existing = this.gameAssets.find(
      (a) => a.name === file.name.split(".")[0] && a.type === detectType()
    );
    if (existing) {
      alert("File already added!");
      return;
    }

    const asset: AssetType = {
      name: file.name.split(".")[0],
      id: uid(),
      type: detectType(),
      blobURL,
    };

    this.gameAssets.push(asset);
    this.eventManager.emit(AssetEventEnums.addAsset, asset);
  }

  public deleteAsset(id : string) {
    const newArr = this.gameAssets.filter((asset) => asset.id !== id)
    this.gameAssets = newArr;

    this.eventManager.emit(AssetEventEnums.deleteAsset, id);
  }

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
