import { GameObjectType } from "@/types/engineTypes";

export function Properties({object} : {object : GameObjectType}) {
  return (
    <div className=" w-full text-white flex flex-col gap-1">
      {/* Properties */}
      <div className="w-full flex justify-between">
        <p className=""> pos X : </p>
        <input defaultValue={object.gameObject.x} className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> pos Y : </p>
        <input defaultValue={object.gameObject.y} className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Width : </p>
        <input defaultValue={object.gameObject.width} className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Height : </p>
        <input defaultValue={object.gameObject.height} className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Rotation : </p>
        <input defaultValue={object.gameObject.rotation} className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Ancor : </p>
        <div className=" w-[200px] flex">
          <input defaultValue={object.gameObject.pivot.x} className="border-2 w-[100px] border-white " type="text" />
          <input defaultValue={object.gameObject.pivot.y} className="border-2 w-[100px] border-white " type="text" />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Opacity : </p>
        <input defaultValue={object.gameObject.alpha} className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Visible : </p>
        <input defaultValue={object.gameObject.visible} className=" w-[200px] border-2 border-white " type="checkbox" />
      </div>
    </div>
  );
}
