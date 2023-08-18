"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function BackIcon() {
  const router = useRouter();
  return (
    <div>
      <FaArrowLeft
        className="cursor-pointer w-5 h-5 mr-5"
        onClick={() => router.back()}
      />
    </div>
  );
}
