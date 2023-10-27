"use client";
import { useRouter } from "next/navigation";
import { FcLock } from "react-icons/fc";
import { Button, Container, Typography } from "../../atoms";

export default function NotMembership() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <Container otherClass="p-8">
        <Typography align="center" variant="h4">
          Halaman terkunci
        </Typography>
        <div className="flex justify-center">
          <FcLock className="text-9xl" />
        </div>
        <Typography align="center">
          Untuk mengakses halaman ini, Kamu perlu berlangganan terlebih dahulu.
        </Typography>
        <div className="flex justify-center mt-5">
          <Button onClick={() => router.push("/dashboard/membership")}>
            Berlangganan Sekarang
          </Button>
        </div>
      </Container>
    </div>
  );
}
