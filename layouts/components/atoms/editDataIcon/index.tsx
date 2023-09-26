"use client";
import { useRouter, usePathname } from "next/navigation";
import { FaPen } from "react-icons/fa";

export default function EditDataIcon() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <FaPen
        id="editButton"
        onClick={() => router.push(`${pathname}/edit`)}
        className="m-1 w-9 h-9 cursor-pointer text-orange-500 border p-2 rounded hover:border-orange-500"
      />
    </div>
  );
}
