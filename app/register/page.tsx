"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading } from "@/layouts/components/atoms";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import { TextfieldGroup } from "@/layouts/components/organisms";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [error, seterror] = useState({} as any);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    Loading.circle();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/auth/user/register`,
      data
    );
    if (response.success) {
      Loading.remove();
      Notify.success(response.message);
      router.push("/login");
    } else {
      setLoading(false);
      seterror(response.error);
      Loading.remove();
      Notify.failure(response.message);
    }
  };

  const form = [
    {
      type: "text",
      label: "Nama",
      name: "nama",
      placeholder: "eg. Jhon Doe",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      placeholder: "yourMail@example.com",
    },
    {
      type: "number",
      label: "Whatsapp",
      name: "whatsapp",
      placeholder: "08123456789",
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      placeholder: "******",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="mb-3">
          <Heading>Sarrahman Bangunan</Heading>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <form
            className="p-6 space-y-4 md:space-y-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <TextfieldGroup
              error={error}
              form={form}
              setData={setData}
              data={data}
            />
            <Button isLoading={loading} isFullWidth={true} isSubmit={true}>
              Daftar
            </Button>
            <p className="text-center">
              Sudah punya akun{" "}
              <span
                onClick={() => router.push("/login")}
                className="underline text-indigo-500 cursor-pointer"
              >
                Masuk
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
