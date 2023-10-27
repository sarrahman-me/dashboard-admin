"use client";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils";
import { Button, Container, ListIcon, Typography } from "../../atoms";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

interface CardMembershipPlanProps {
  item: {
    deskripsi: string;
    harga: number;
    kategori_harga: string;
    nama_klasifikasi: string;
    slug: string;
  };
}

const CardMembershipPlan = ({ item }: CardMembershipPlanProps) => {
  const router = useRouter();

  const lists = [
    {
      icon: <TiTick />,
      iconColor: "success",
      text: "Buat Toko Online dengan Banyak Fitur",
    },
    {
      icon: <TiTick />,
      iconColor: "success",
      text: "Temukan keramik dari suplier di sekitar",
    },
    {
      icon: <TiTick />,
      iconColor: "success",
      text: "Dukungan dan suport setiap saat",
    },
    {
      icon: <TiTick />,
      iconColor: "success",
      text: "Gunakan berbagai alat yang dapat membantu berjualan",
    },
    {
      icon: item?.slug !== "premium" ? <RxCross2 /> : <TiTick />,
      iconColor: item?.slug !== "premium" ? "danger" : "success",
      textDecor: item?.slug !== "premium" ? "coret" : "default",
      text: "Dapatkan wawasan dari aktifitas customer",
    },
    {
      icon: item?.slug !== "premium" ? <RxCross2 /> : <TiTick />,
      iconColor: item?.slug !== "premium" ? "danger" : "success",
      textDecor: item?.slug !== "premium" ? "coret" : "default",
      text: "Uji coba fitur baru lebih awal",
    },
  ];

  return (
    <Container otherClass="p-6 xl:p-8 mx-auto max-w-lg">
      {/* title */}
      <div className="flex justify-center items-center mb-3">
        <Typography variant="h4">{item?.nama_klasifikasi}</Typography>
        {item?.slug === "premium" ? (
          <BsHandThumbsUpFill className="text-indigo-600" />
        ) : null}
      </div>

      {/* deskripsi */}
      <Typography align="center" color="secondary">
        {item?.deskripsi}
      </Typography>

      {/* harga */}
      <div className="flex justify-center items-baseline my-8">
        <Typography variant="h3">{formatCurrency(item?.harga)}</Typography>
        <Typography color="secondary">/bln</Typography>
      </div>

      {/* list */}
      <ul role="list" className="mb-8 space-y-4 text-left">
        {lists.map((list, i) => (
          <div key={i}>
            <ListIcon
              icon={list.icon}
              iconColor={list.iconColor}
              text={list.text}
              textDecor={list.textDecor}
            />
          </div>
        ))}
      </ul>

      {/* tombol daftar */}
      <div className="flex justify-center">
        <Button
          variant={item?.slug !== "premium" ? "outlined" : "contained"}
          onClick={() => {
            const paymentUrl = `/dashboard/membership/payment?klasifikasi-membership=${encodeURIComponent(
              item.slug
            )}`;
            router.push(paymentUrl);
          }}
        >
          Daftar
        </Button>
      </div>
    </Container>
  );
};

export default CardMembershipPlan;
