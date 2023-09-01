import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("tx");
  let data;

  const responseProfile = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/auth/user/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
      credentials: "include",
    }
  );
  data = await responseProfile.json();

  return NextResponse.json(data);
}
