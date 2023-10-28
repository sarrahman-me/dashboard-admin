/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import {
  calculateDiscountPercentage,
  isNewProduct,
  upPriceWithPercen,
  formatCurrency,
} from "@/src/utils";
import { useSelector } from "react-redux";
import { Container } from "../../atoms";

interface CardProductProps {
  product: any;
}

const CardProduct = ({ product }: CardProductProps) => {
  const router = useRouter();
  const { persentaseHarga } = useSelector((state: any) => state.profile);

  // menghitung harga
  const harga = upPriceWithPercen(product?.harga, persentaseHarga);
  const hargaPromo = upPriceWithPercen(product?.harga_promo, persentaseHarga);

  // cek apakah barang baru
  const isNew = isNewProduct(product.createdAt);

  // hitung persentase diskon
  const persentaseDiskon = calculateDiscountPercentage(harga, hargaPromo);

  // menghilangkan fungsi klik kanan pada gambar
  const handleKlikKanan = (e: any) => {
    e.preventDefault();

    return false;
  };

  return (
    <Container
      otherClass="relative hover:shadow cursor-pointer dark:hover:shadow-gray-500"
      onClick={() => {
        router.push(`/dashboard/barang/${product.slug}`);
      }}
    >
      {/* label jika barang baru */}

      {isNew && (
        <div className="bg-lime-500 text-white text-xs md:text-sm px-2 py-1 rounded-br absolute top-0 left-0">
          Baru
        </div>
      )}

      {/* gambar barang */}

      <div onContextMenu={handleKlikKanan} className="flex justify-center">
        <img
          className="object-contain max-h-28 md:max-h-32 lg:max-h-40 border"
          src={product?.images[0]}
          alt={product?.nama_barang}
        />
      </div>

      <div className="p-1 divide-y-2 md:divide-y-4 divide-transparent">
        <p className="text-xs text-lime-500">{product?.kategori}</p>
        <p className="text-xs md:text-sm">{product?.nama_barang}</p>

        {/* harga */}

        {product.promo ? (
          <p className="text-xs md:text-sm font-semibold">
            {formatCurrency(hargaPromo)}
          </p>
        ) : (
          <p className="text-xs md:text-sm font-semibold">
            {formatCurrency(harga)}
          </p>
        )}

        {/* harga tercoret jika promo */}

        {product.promo && (
          <span className="flex items-center text-xs">
            <p className="text-xs md:bg-red-200 text-red-500 rounded p-0.5 mr-1">{`${persentaseDiskon}%`}</p>
            <p className="text-xs text-gray-400 line-through">
              {formatCurrency(harga)}
            </p>
          </span>
        )}

        {/* detail tambahan */}

        <div className="text-xs flex justify-between items-center">
          <p>{product?.tekstur}</p>
          <p>{product?.ukuran}</p>
        </div>
      </div>
    </Container>
  );
};

export default CardProduct;
