"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heading } from "@/layouts/components/atoms";
import { Loading, Notify } from "notiflix";
import { PostDataApi } from "@/utils";
import {
  Button,
  Container,
  Logo,
  TextfieldGroup,
  Typography,
} from "@/src/components";

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
      setCookie("tx", response.data.token, {
        secure: true,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24,
      });
      setCookie("rtx", response.data.refreshToken, {
        secure: true,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      Notify.success(response.message);
      router.push("/dashboard");
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
    <section className="flex flex-col items-center justify-center h-screen">
      <div>
        <Logo />
      </div>
      <Container otherClass="my-5 min-w-[95%] sm:min-w-[50%] lg:min-w-[30%]">
        <form
          className="p-6 space-y-4 md:space-y-6 sm:p-8"
          onSubmit={handleSubmit}
        >
          <TextfieldGroup
            error={error}
            forms={form}
            setData={setData}
            data={data}
          />
          <Button loading={loading} size="full" type="submit">
            Masuk
          </Button>
        </form>
      </Container>
    </section>
  );
}
