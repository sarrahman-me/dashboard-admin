"use client";
import { Container, LottiePlayer, Typography } from "../../atoms";

export default function PaymentChecking() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Container otherClass="p-8">
        <Typography align="center" variant="h4">
          Pengecekan pembayaran
        </Typography>
        <div className="flex justify-center">
          <LottiePlayer
            url="https://lottie.host/52a9a577-6df8-40e4-8aa1-cee07b153545/ir8pOdy5MP.json"
            height="300px"
            width="300px"
          />
        </div>
        <Typography align="center">
          Pembayaranmu sedang dalam proses verifikasi. Mohon tunggu beberapa
          saat hingga verifikasi selesai.
        </Typography>
      </Container>
    </div>
  );
}
