"use client";

import { startRuntimeGame } from "@/runtime/src/main";
import { useEffect, useRef } from "react";

export default function Runtime() {
  const gameDIV = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameDIV.current) throw Error("Game Div is undefined");

    // Pull width/height from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const width = Number(urlParams.get("w")) || window.innerWidth;
    const height = Number(urlParams.get("h")) || window.innerHeight;

    // Apply size dynamically
    gameDIV.current.style.width = `${width}px`;
    gameDIV.current.style.height = `${height}px`;

    console.log("Runtime canvas sized:", width, height);

    startRuntimeGame(gameDIV.current);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        background: "black",
      }}
      id="runtime-canvas"
      ref={gameDIV}
    ></div>
  );
}
