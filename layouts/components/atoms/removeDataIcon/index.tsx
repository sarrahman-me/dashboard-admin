"use client";
import { DeleteDataApi } from "@/utils";
import { useRouter } from "next/navigation";
import { Confirm, Notify } from "notiflix";
import { FaTrash } from "react-icons/fa";

export default function RemoveDataIcon(props: { url: string }) {
  const router = useRouter();

  const handleRemove = () => {
    Confirm.show(
      "Konfirmasi",
      "Yakin Ingin Menghapus Data?",
      "Hapus",
      "Batal",
      async () => {
        const response = await DeleteDataApi(
          `${process.env.NEXT_PUBLIC_HOST}${props.url}`
        );
        Notify.success(response?.message);
        router.back();
      },
      () => {},
      {
        okButtonBackground: "red",
        titleColor: "red",
      }
    );
  };

  return (
    <div>
      <FaTrash
        id="removeButton"
        onClick={handleRemove}
        className="m-1 w-9 h-9 cursor-pointer text-red-500 border p-2 rounded hover:border-orange-500"
      />
    </div>
  );
}
