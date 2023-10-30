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
          "https://lottie.host/9d4fc8b0-b795-4bf5-9e42-3553a3d700b0/mcs6yU8z4S.json"
        }
        height={"200px"}
        width={"200px"}
      />
      <Typography otherClass="sr-only">Loading</Typography>
    </div>
  );
};

export default LoadingAnimation;
