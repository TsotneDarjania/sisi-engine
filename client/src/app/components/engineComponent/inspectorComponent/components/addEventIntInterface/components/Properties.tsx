export function Properties() {
  return (
    <div className=" w-full text-white flex flex-col gap-1">
      {/* Properties */}
      <div className="w-full flex justify-between">
        <p className=""> pos X : </p>
        <input className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> pos Y : </p>
        <input className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Width : </p>
        <input className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Height : </p>
        <input className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Rotation : </p>
        <input className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Ancor : </p>
        <div className=" w-[200px] flex">
          <input className="border-2 w-[100px] border-white " type="text" />
          <input className="border-2 w-[100px] border-white " type="text" />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Opacity : </p>
        <input className=" w-[200px] border-2 border-white " type="text" />
      </div>
      <div className="w-full flex justify-between">
        <p className=""> Visible : </p>
        <input className=" w-[200px] border-2 border-white " type="checkbox" />
      </div>
    </div>
  );
}
