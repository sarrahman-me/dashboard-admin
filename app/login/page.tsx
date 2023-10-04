"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading } from "@/layouts/components/atoms";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import { TextfieldGroup } from "@/layouts/components/organisms";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [error, seterror] = useState({} as any);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    Loading.hourglass();
    const response = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/auth/user/login`,
      data
    );

    if (response.success) {
      Notify.success(response.message);
      // router.push("/dashboard");
      Loading.remove();
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
      label: "Akun",
      name: "akun",
      placeholder: "Email atau Whatsapp",
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
          <Heading>Dunia Bangunan</Heading>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
              Masuk
            </Button>
            <p className="text-center">
              Belum punya akun{" "}
              <span
                onClick={() => router.push("/register")}
                className="underline text-indigo-500 cursor-pointer"
              >
                Daftar
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
