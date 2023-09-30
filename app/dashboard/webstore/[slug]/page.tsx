"use client";
import { ListData } from "@/layouts/components/atoms";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { SectionLayout, Timeline } from "@/layouts/template";
import { GetDataApi } from "@/utils";
import { useEffect, useState } from "react";

export default function DetailWebstore({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const [webstore, setWebstore] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const webstoreResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/webstore/${slug}`
      );
      setWebstore(webstoreResponse.data);
    }

    fetchData();
  }, [slug]);

  return (
    <div>
      <HeaderAndBackIcon title={"Detail Webstore"} />
      <SectionLayout>
        <div>
          <ListData label="Nama Webstore" value={webstore.nama_webstore} />
          <ListData label="Domain" value={webstore.domain} />
          <ListData label="Url" value={webstore.url} />
          <ListData
            label="Status"
            value={
              webstore.isLive ? (
                <span className="text-green-500">Live</span>
              ) : (
                <span className="text-red-500">not yet deployed</span>
              )
            }
          />
        </div>
      </SectionLayout>
      {!webstore.isLive && (
        <div>
          <p className="font-medium underline">Proses Deployment</p>
          <Timeline
            id_webstore={webstore.id_webstore}
            nama_webstore={webstore.nama_webstore}
          />
        </div>
      )}
    </div>
  );
}
