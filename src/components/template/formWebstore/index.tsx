"use client";
import { useState } from "react";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import { stringToSlug } from "@/utils";
import { Button, Textfield, Typography } from "@/src/components";

const FormWebstore = () => {
  const [namaWebstore, setNamaWebstore] = useState("");
  const [error, setError] = useState("");
  const [domainPredict, setDomainPredict] = useState("");

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    Loading.circle();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/webstore/deploy`,
      {
        nama_webstore: namaWebstore,
      }
    );

    if (response.success) {
      Loading.remove();
      Notify.success(response.message);
      window.location.reload();
    } else {
      Loading.remove();
      setError(response.message);
    }
  };

  return (
    <div className="mt-2">
      <Typography variant="subtitle">
        Buat toko mu dilihat banyak orang
      </Typography>

      <form onSubmit={handleFormSubmit} className="mt-2">
        <Textfield
          otherClass="w-full md:w-1/2"
          placeholder="nama toko mu"
          label={"Nama Toko Online"}
          onChange={(value) => {
            setNamaWebstore(value);
            setDomainPredict(stringToSlug(value));
          }}
          name={"nama_webstore"}
        />

        <Typography variant="helper" color="danger">
          {error}
        </Typography>

        {domainPredict && (
          <Typography variant="helper" color="success">
            Nama Domain kamu akan seperti ini {domainPredict}.vercel.app
          </Typography>
        )}

        <div className="mt-4">
          <Button type="submit">Buat Situs</Button>
        </div>
      </form>
    </div>
  );
};

export default FormWebstore;
