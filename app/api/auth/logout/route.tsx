"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("tx");
  let data;

  const responseLogout = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/auth/user/logout`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      credentials: "include",
    }
  );
  data = await responseLogout.json();

  return NextResponse.json(data);
}
