"use client";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function LoadingPage() {
  return (
    <div
      className="flex justify-center items-center h-screen w-screen"
      role="status"
    >
      <Player
        autoplay
        loop
        src="https://lottie.host/a07b9995-147c-4ee5-9f19-3a830d9a13ec/EVdtHO33Fa.json"
        style={{ height: "300px", width: "300px" }}
      >
        <Controls buttons={["play", "repeat", "frame", "debug"]} />
      </Player>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
