import { cookies } from "next/headers";

export async function SSRGetDataApi(url: string): Promise<any> {
  const cookieStore = cookies();
  const token = cookieStore.get("tx");

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // Authorization: `Bearer ${token?.value}`,
    },
    // cache: "no-store",
  });
  const data = await response.json();

  return data;
}
