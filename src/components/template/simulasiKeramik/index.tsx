/* eslint-disable @next/next/no-img-element */
"use client";
import { Textfield } from "@/src/components";
import { useState } from "react";

export default function SimulasiKeramik(props: {
  imageUrl: string;
  ukuran: string;
}) {
  const penentuanUkuran = (ukuran: string) => {
    const angka = ukuran.split("x");

    if (angka[0] === angka[1]) {
      return "lantai";
    } else {
      return "dinding";
    }
  };

  const [backgroundColor, setBackgroundColor] = useState("#dddddd");

  const gridStyles = {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    backgroundColor: backgroundColor,
  };

  const handleKlikKanan = (e: any) => {
    e.preventDefault();

    return false;
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div
        onContextMenu={handleKlikKanan}
        className="md:w-1/2 w-full grid m-1 relative object-cover"
        style={gridStyles}
      >
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <ImagePattern imageUrl={props.imageUrl} />
        <div className="absolute -bottom-8 left-1/4">
          {penentuanUkuran(props.ukuran) === "lantai" ? (
            <img
              className="w-60 h-48 sm:w-72 sm:h-60 md:w-96 md:h-72"
              src="https://ik.imagekit.io/sarrahmanme/pngwing.com-removebg-preview.png?updatedAt=1696159906656"
              alt="sofa top"
            />
          ) : (
            <img
              className="w-52 h-36 sm:w-60 sm:h-52 md:w-72 md:h-56"
              src="https://ik.imagekit.io/sarrahmanme/sofa-removebg-preview.png?updatedAt=1696156084852"
              alt="sofa"
            />
          )}
        </div>
      </div>
      <div className="md:w-1/2 w-full m-1">
        <Textfield
          label={"Warna Nat"}
          name={"natColor"}
          type="color"
          value={backgroundColor}
          onChange={(value) => setBackgroundColor(value)}
        />
      </div>
    </div>
  );
}

const ImagePattern = (props: { imageUrl: string }) => {
  return (
    <img
      src={props.imageUrl}
      onClick={(e) => {
        const img = e.target as HTMLImageElement;
        const deg = img.style.transform
          ? parseInt(
              img.style.transform.replace("rotate(", "").replace("deg)", "")
            )
          : 0;
        img.style.transform = `rotate(${deg + 90}deg)`;
      }}
      alt="produk"
      width={300}
      height={300}
    />
  );
};
