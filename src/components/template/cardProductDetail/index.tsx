"use client";
import { calculateDiscountPercentage } from "@/src/utils";
import { formatCurrency } from "@/utils";
import { Container, Typography } from "../../atoms";

interface CardProductDetailProps {
  barang: {
    images: string[];
    slug: string;
    kategori: string;
    warna: string;
    nama_barang: string;
    brand: string;
    stok: number;
    promo: boolean;
  };
  harga: number;
  hargaPromo: number;
}

/* eslint-disable @next/next/no-img-element */
export default function CardProductDetail({
  barang,
  harga,
  hargaPromo,
}: CardProductDetailProps) {
  const persentaseDiskon = calculateDiscountPercentage(harga, hargaPromo);

  const handleKlikKanan = (e: any) => {
    e.preventDefault();

    return false;
  };

  return (
    <div className="flex flex-col md:flex-row my-2">
      {/* gambar */}
      <div
        onContextMenu={handleKlikKanan}
        className="md:w-1/3 flex justify-center items-center w-full m-2 md:m-0"
      >
        {barang.images && (
          <img
            src={barang?.images[0]}
            alt={barang.slug}
            className="object-contain max-h-44 border"
          />
        )}
      </div>

      {/* detail */}

      <Container otherClass="p-2 w-full">
        <div className="space-y-2 md:space-y-3 ml-2">
          <p className="text-sm md:text-base text-lime-500">
            {barang.kategori}
          </p>

          {barang.nama_barang && (
            <Typography>
              {(barang?.nama_barang as string).toUpperCase()} - {barang.warna}
            </Typography>
          )}

          <Typography>{barang.brand}</Typography>
          <Typography>Stok {barang.stok} dus</Typography>

          {barang.promo && (
            <p className="text-base font-semibold">
              {formatCurrency(Number(hargaPromo))}
            </p>
          )}

          <div className="text-sm md:text-base">
            {barang.promo ? (
              <span className="flex items-center text-xs">
                <p className="bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${persentaseDiskon}%`}</p>
                <p className="text-gray-500 line-through">
                  {formatCurrency(Number(harga))}
                </p>
              </span>
            ) : (
              <span className="text-base font-semibold">
                {formatCurrency(Number(harga))}
              </span>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
