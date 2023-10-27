"use client";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

/**
 * Komponen LottiePlayer digunakan untuk menampilkan animasi Lottie dengan pengontrolan sederhana.
 *
 * @param {string} url - URL animasi Lottie yang akan dimuat.
 * @param {string} height - Tinggi dari pemutar animasi.
 * @param {string} width - Lebar dari pemutar animasi.
 */

interface LottiePlayerProps {
  url: string;
  height: string;
  width: string;
}

const LottiePlayer = ({ url, height, width }: LottiePlayerProps) => {
  return (
    <Player autoplay loop src={url} style={{ height, width }}>
      <Controls buttons={["play", "repeat", "frame"]} />
    </Player>
  );
};

export default LottiePlayer;
