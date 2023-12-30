"use client";
import { ListData } from "@/layouts/components/atoms";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { SectionLayout, Timeline } from "@/layouts/template";
import { InsightCard, Table, Typography } from "@/src/components";
import { GetDataApi } from "@/utils";
import { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";

export default function DetailWebstore({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const [webstore, setWebstore] = useState({} as any);
  const [productInsight, setProductInsight] = useState({
    total_product_view: "",
    top_product_view: [],
  } as {
    total_product_view: string;
    top_product_view: any[];
  });
  const [searchInsight, setSearchInsight] = useState({
    total_searches: "",
    top_search_query: [],
  } as {
    total_searches: string;
    top_search_query: any[];
  });

  useEffect(() => {
    async function fetchData() {
      const webstoreResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/webstore/${slug}`
      );

      setWebstore(webstoreResponse.data);

      if (webstoreResponse.data?.domain) {
        const responseWebstoreProductInsight = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/analytic/webstore-product-insight/${webstoreResponse.data?.domain}`
        );

        const responseWebstoreSearchInsight = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/analytic/webstore-search-insight/${webstoreResponse.data?.domain}`
        );

        if (
          responseWebstoreProductInsight?.data[0]?.total_searches ===
            undefined ||
          responseWebstoreProductInsight?.data[0]?.total_searches === null
        ) {
          const { total_searches, top_search_query } =
            responseWebstoreSearchInsight.data[0];

          const { total_product_view, top_product_view } =
            responseWebstoreProductInsight.data[0];

          setSearchInsight({
            total_searches,
            top_search_query,
          });

          setProductInsight({
            top_product_view,
            total_product_view,
          });
        }
      }
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
      <div>
        {webstore.isLive && (
          <div>
            {productInsight.total_product_view !== undefined && (
              <div>
                <p className="underline font-semibold m-2">
                  Wawasan {webstore.domain}
                </p>
                <div className="grid grid-cols-2 gap-2 md:gap-6">
                  <InsightCard
                    data={searchInsight.total_searches}
                    title={"Pencarian"}
                    color={"emerald"}
                    // percentase={Number(
                    //   calculatePercentage(
                    //     dailySearch.total_searches,
                    //     lastDailySearch.total_searches
                    //   )
                    // )}
                    icon={<FaSearch />}
                  />

                  <InsightCard
                    data={productInsight.total_product_view}
                    // percentase={Number(
                    //   calculatePercentage(
                    //     dailyProductView.total_product_views,
                    //     lastDailyProductView.total_product_views
                    //   )
                    // )}
                    color={"sky"}
                    title={"Dilihat"}
                    icon={<FaEye />}
                  />
                </div>

                <div className="my-3">
                  <Typography>Produk Populer</Typography>
                  <Table
                    columns={[
                      {
                        label: "Nama Barang",
                        renderCell: (item: any) => item.productName,
                      },
                      {
                        label: "Brand",
                        renderCell: (item: any) => item.productBrand,
                      },
                      {
                        label: "Jumlah dilihat",
                        renderCell: (item: any) => item.views,
                      },
                    ]}
                    datas={productInsight.top_product_view}
                  />
                </div>

                <div className="my-3">
                  <Typography>Pencarian Populer</Typography>
                  <Table
                    columns={[
                      {
                        label: "Kata kunci",
                        renderCell: (item: any) => item.query,
                      },
                      {
                        label: "Jumlah dicari",
                        renderCell: (item: any) => item.totalSearch,
                      },
                    ]}
                    datas={searchInsight.top_search_query}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
