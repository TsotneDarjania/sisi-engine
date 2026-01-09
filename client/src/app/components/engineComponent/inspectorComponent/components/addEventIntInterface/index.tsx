import useStore from "@/app/store";
import { GameObjectType } from "@/types/engineTypes";
import { Fragment, useEffect, useState } from "react";
import { FaArrowRight, FaRegWindowClose } from "react-icons/fa";
import { Properties } from "./components/Properties";
import { GlobalGameObject } from "./components/GlobalGameObject";
import { InspectorEventEnums } from "@/enums/userEventEnums";

export default function AddEventInterface() {
  const setIsAddEvnetPopupOpen = useStore(
    (state) => state.setIsAddEventPopupOpen
  );

  const state = useStore((state) => state.addEventInterfaceState);
  const gameEngine = useStore((state) => state.gameEngine);

  const globalGameObjects = gameEngine?.inspector.gameObjects!.filter(
    (g) => g.id !== state.gameObject!.id
  );

  const [localEvents, setLocalEvents] = useState(
    state.gameObject?.events[state.eventName!]
  );

  const [isLocalChagesOpen, setIsLocalChagnesOpen] = useState(false);
  const [isGlobalChagesOpen, setIsGlobalChagnesOpen] = useState(false);
  const [isLocalChangesOpenForUfter, setIsLocalChangesOpenForUfter] =
    useState(false);
  const [isGlobalChangesOpenForUfter, setIsGloabalChangesOpenForUfter] =
    useState(false);

  useEffect(() => {
    if (!gameEngine) return;

    const handler = () => {
      const latest = useStore.getState().addEventInterfaceState;
      const arr = latest.gameObject?.events[latest.eventName!] ?? [];
      setLocalEvents([...arr]);
    };

    gameEngine.events.on(
      InspectorEventEnums.addEventOrChangeToGameObject,
      handler
    );

    return () => {
      gameEngine.events.off(
        InspectorEventEnums.addEventOrChangeToGameObject,
        handler
      );
    };
  }, [gameEngine]);

  return (
    <div className=" flex flex-col items-center p-2 fixed left-0 top-0  w-[100vw]  h-[100vh] z-10">
      {/* Close Button */}
      <FaRegWindowClose
        onClick={() => {
          setIsAddEvnetPopupOpen({
            isOpen: false,
            gameObject: null,
            eventName: null,
          });
        }}
        className=" cursor-pointer z-20 absolute right-2 top-2 text-6xl text-white"
      />

      {/* Shadow */}
      <div className=" z-0 absolute left-0 top-0 w-full h-full  bg-black opacity-90"></div>

      {/* Event Name */}
      <h2 className=" text-white text-4xl z-10 mt-2 underline">
        {state.eventName}
      </h2>

      {/* Main */}
      <div className="flex w-full h-[90vh] border-2 border-gray-400">
        {/* Before */}
        <div className=" overflow-y-scroll w-[50%] h-full flex flex-col items-center z-10">
          <h3 className=" text-yellow-400 text-2xl">Properties</h3>

          <div className=" w-full flex justify-between">
            <p className=" text-white">Local Changes: </p>
            {/* Arrow */}
            <FaArrowRight
              onClick={() => {
                setIsLocalChagnesOpen((prev) => !prev);
              }}
              fontSize={"21px"}
              className={`text-white mr-2 cursor-pointer transition-all ${
                isLocalChagesOpen ? "rotate-90" : ""
              }`}
            />
          </div>

          {/* Local Changes Object */}
          {isLocalChagesOpen && (
            <>
              <p className=" text-yellow-300 w-full">
                {state.gameObject?.name}
              </p>
              <Properties
                eventName={state.eventName!}
                object={state.gameObject!}
              />
            </>
          )}

          {/* Line */}
          <div className=" w-full bg-white border-2 h-1"></div>

          <div className=" w-full flex justify-between">
            <p className=" text-white">Global Changes: </p>
            <FaArrowRight
              onClick={() => {
                setIsGlobalChagnesOpen((prev) => !prev);
              }}
              fontSize={"21px"}
              className={`text-white mr-2 cursor-pointer transition-all ${
                isGlobalChagesOpen ? "rotate-90" : ""
              }`}
            />
          </div>

          {/* Global Changes Objects */}
          {isGlobalChagesOpen && (
            <div className=" w-full flex flex-col">
              {/* Object */}
              {globalGameObjects!.map((gameObject) => {
                return (
                  <GlobalGameObject
                    eventName={state.eventName!}
                    key={gameObject.id}
                    object={gameObject}
                  />
                );
              })}
            </div>
          )}
        </div>
        {/* Ufter */}
        <div className="overflow-y-scroll px-3 w-[50%] h-full flex flex-col items-center z-10">
          <h3 className=" text-green-500 text-2xl">Ufter</h3>
          <div className=" w-full flex justify-between">
            <p className=" text-white">Local Changes: </p>
            {/* Arrow */}
            <FaArrowRight
              onClick={() => {
                setIsLocalChangesOpenForUfter((prev) => !prev);
              }}
              fontSize={"21px"}
              className={`text-white mr-2 cursor-pointer transition-all ${
                isLocalChangesOpenForUfter ? "rotate-90" : ""
              }`}
            />
          </div>

          {/* Local Changes Object */}
          {isLocalChangesOpenForUfter && (
            <>
              <p className=" text-yellow-300 w-full">
                {state.gameObject?.name}
              </p>

              <div className="w-full flex-col flex justify-between text-white gap-1">
                {localEvents?.map((event, i) => {
                  return (
                    <div
                      className="w-full flex justify-between text-white"
                      key={i}
                    >
                      <p className="text-green-500"> {event.propertyKey} : </p>
                      <div
                        className="w-[200px] h-[30px]
                  border-2 border-green-500
                   p-2 flex justify-start items-center
                  "
                      >
                        <p className="text-yellow-500">
                          {String(event.oldValue)} /{" "}
                          <span className="text-green-500">
                            {" "}
                            {String(event.newValue)}{" "}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className=" w-full flex justify-between mt-1">
            <p className="text-white  w-full">Global Changes: </p>
            <FaArrowRight
              onClick={() => {
                setIsGloabalChangesOpenForUfter((prev) => !prev);
              }}
              fontSize={"21px"}
              className={`text-white mr-2 cursor-pointer transition-all ${
                isGlobalChangesOpenForUfter ? "rotate-90" : ""
              }`}
            />
          </div>

          {/* Local Changes Object */}
          {isGlobalChangesOpenForUfter && (
            <>
              <div className="w-full flex-col flex justify-between text-white gap-1">
                {globalGameObjects?.map((obj, i) => {
                  return (
                    <div
                      className="w-full flex flex-col justify-between text-white"
                      key={i}
                    >
                      <p className=" text-yellow-300 w-full">
                        {obj.name}
                      </p>

                      {obj.events[state.eventName!].map((event, i) => {
                        return (
                          <div
                            className="w-full flex justify-between text-white mt-1"
                            key={i}
                          >
                            <p className="text-green-500">
                              {" "}
                              {event.propertyKey} :{" "}
                            </p>
                            <div
                              className="w-[200px] h-[30px]
                        border-2 border-green-500
                         p-2 flex justify-start items-center
                        "
                            >
                              <p className="text-yellow-500">
                                {String(event.oldValue)} /{" "}
                                <span className="text-green-500">
                                  {" "}
                                  {String(event.newValue)}
                                </span>{" "}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
