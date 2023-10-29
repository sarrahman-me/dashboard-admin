"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { GetDataApi, PatchDataApi } from "@/utils";
import { Notify } from "notiflix";
import { Button, TextfieldGroup } from "@/src/components";

export default function FormEditData(props: {
  submitEndpoint: string;
  formInput: any;
}) {
  const router = useRouter();
  const [data, setdata] = useState({} as any);
  const [error, seterror] = useState({} as any);

  // Mengambil data yang akan diedit
  useEffect(() => {
    const getData = async () => {
      const response = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}${props.submitEndpoint}`
      );
      const data = response.data;
      props.formInput.map((input: any, i: any) => {
        setdata({
          ...data,
          [input.name]: data[input.name],
        });
      });
    };
    getData();
  }, [props.submitEndpoint, props.formInput]);

  // Mengirim Permintaan edit ke server
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await PatchDataApi(
      `${process.env.NEXT_PUBLIC_HOST}${props.submitEndpoint}`,
      data
    );
    console.log(response);
    if (response.success) {
      Notify.success(response.message);
      router.back();
    } else {
      seterror(response.error);
      Notify.failure(response.message);
    }
  };

  return (
    <div>
      <form className="md:w-1/2 mt-5" onSubmit={handleSubmit}>
        <TextfieldGroup
          error={error}
          forms={props.formInput}
          setData={setdata}
          data={data}
        />
        <div className="mt-4">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  );
}
