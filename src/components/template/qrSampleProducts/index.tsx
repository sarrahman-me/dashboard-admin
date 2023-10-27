/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Container, Typography } from "@/src/components";
import { useEffect, useState } from "react";

const generateQrCodeUrl = (webstore: any, barang: any) => {
  return `https://api.qrserver.com/v1/create-qr-code/?data=${webstore?.url}/products/${barang.kode_barang}&size=100x100`;
};

export default function QrSampleProducts(props: {
  webstore: any;
  barang: any;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleDownload = async () => {
    try {
      const response = await fetch(
        generateQrCodeUrl(props.webstore, props.barang)
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${props.barang.kode_barang}.png`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          generateQrCodeUrl(props.webstore, props.barang)
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        setImageLoaded(true);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };
    fetchImage();
  }, [props.webstore, props.barang]);

  return (
    <Container otherClass="flex flex-col md:flex-row items-center p-2 my-2">
      <div className="w-full px-4 md:px-0 md:w-2/3 max-w-xl md:mx-auto my-2 space-y-1">
        <Typography variant="subtitle">
          Yuk, Tempel pada sample fisik di tokomu!
        </Typography>
        <Typography>
          {" "}
          Qr code ini akan mengarahkan pelangganmu langsung ke barang ini pada
          situs webstore milikmu
        </Typography>
      </div>

      <div className="w-1/3 flex justify-center items-center md:flex-col">
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              className="border m-2 w-32 h-w-32"
              alt={`${props.webstore?.url}/products/${props.barang.kode_barang}`}
              title={`${props.webstore?.url}/products/${props.barang.kode_barang}`}
            />
            <Button onClick={handleDownload}>Download</Button>
          </>
        )}
      </div>
    </Container>
  );
}
