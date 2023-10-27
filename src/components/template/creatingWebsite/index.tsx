"use client";
import React from "react";
import { Container, LottiePlayer, Typography } from "../../atoms";

export default function CreatingWebsite() {
  return (
    <Container otherClass="p-6">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <div className="mb-2">
              <Typography variant="subtitle">
                Webstore mu sedang dalam pengecekan
              </Typography>
            </div>
            <Typography color="secondary">
              Situs mu sudah dalam antrian, Tim kami akan melakukan pengecekan
              situs kamu sebelum bisa diluncurkan ke public maksimal 1x24 jam
            </Typography>
          </div>
          <div className="w-full md:w-1/2">
            <LottiePlayer
              url="https://lottie.host/ff6d244f-0c1f-44be-be49-8bae9fd30832/AQMO92eQ6D.json"
              width="300px"
              height="300px"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
