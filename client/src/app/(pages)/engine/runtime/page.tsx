"use client";

import { startRuntimeGame } from "@/runtime/src/main";
import { useEffect, useRef } from "react";

export default function Runtime() {
  const gameDIV = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameDIV.current) throw Error("Game Div is undefined");

    startRuntimeGame(gameDIV.current);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
      }}
      id="runtime-canvas"
      ref={gameDIV}
    ></div>
  );
}
