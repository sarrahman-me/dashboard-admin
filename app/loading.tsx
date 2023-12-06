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
        src="https://lottie.host/9d4fc8b0-b795-4bf5-9e42-3553a3d700b0/mcs6yU8z4S.json"
        style={{ height: "300px", width: "300px" }}
      >
        <Controls buttons={["play", "repeat", "frame", "debug"]} />
      </Player>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
