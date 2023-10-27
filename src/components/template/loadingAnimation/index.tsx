"use client";
import { LottiePlayer, Typography } from "@/src/components/atoms";

/**
 * Halaman Loading digunakan untuk menampilkan animasi saat halaman loading.
 */

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center" role="status">
      <LottiePlayer
        url={
          "https://lottie.host/b75eed4a-23a4-4f95-a0cd-b40dfa2ef70c/H3bKzDBXwg.json"
        }
        height={"200px"}
        width={"200px"}
      />
      <Typography otherClass="sr-only">Loading</Typography>
    </div>
  );
};

export default LoadingAnimation;
