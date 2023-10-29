"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostDataApi } from "@/utils";
import { Notify } from "notiflix";
import { Button, TextfieldGroup } from "@/src/components";

export default function FormData(props: {
  submitEndpoint: string;
  formInput: any;
}) {
  const router = useRouter();
  const [data, setdata] = useState({} as any);
  const [error, seterror] = useState({} as any);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}${props.submitEndpoint}`,
      data
    );
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
