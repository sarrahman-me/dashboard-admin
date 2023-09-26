"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Button(props: {
  children: string;
  className?: string;
  isSubmit?: boolean;
  href?: string;
  isFullWidth?: boolean;
  color?: string;
  isLoading?: boolean;
  onClick?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const color = `bg-${props.color}-600`;

  const handleClick = () => {
    if (props.isLoading) {
      return;
    }

    setLoading(true);

    if (props.href) {
      router.push(props.href);
    } else if (props.onClick) {
      props.onClick();
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        id={props.children}
        onClick={handleClick}
        type={props.isSubmit ? "submit" : "button"}
        disabled={props.isLoading}
        className={`${
          props.isFullWidth ? "w-full" : ""
        } text-white ${color} hover:shadow-md bg-indigo-600 hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2.5 m-1 text-center ${
          props.className
        }`}
      >
        {props.isLoading ? "Loading..." : props.children}
      </button>
    </div>
  );
}
