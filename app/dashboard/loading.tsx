"use client";
import {
  AppBar,
  FooterText,
  LoadingAnimation,
  Sidebar,
} from "@/src/components";
import { useState } from "react";

export default function Loading() {
  const [expand, setExpand] = useState(true);

  const widthContentClass = expand ? "sm:ml-64" : "sm:ml-16";

  return (
    <div>
      <Sidebar expand={expand} setExpand={setExpand} />
      <div className={widthContentClass}>
        <AppBar />
        <div className="p-2 md:p-4">
          <LoadingAnimation />
        </div>
        <FooterText />
      </div>
    </div>
  );
}
