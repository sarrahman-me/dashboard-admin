"use client";
import { ListData } from "@/layouts/components/atoms";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { SectionLayout, Timeline } from "@/layouts/template";
import {
  Button,
  InsightCard,
  PieChart,
  Table,
  Typography,
} from "@/src/components";
import { PatchDataApi } from "@/src/utils";
import { GetDataApi, isValidDomain } from "@/utils";
import { Confirm, Notify } from "notiflix";
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
  const [oldProductInsight, setOldProductInsight] = useState({
    total_product_view: "",
    top_product_view: [],
  } as {
    total_product_view: string;
    top_product_view: any[];
  });
  const [oldsSarchInsight, setOldSearchInsight] = useState({
    total_searches: "",
    top_search_query: [],
  } as {
    total_searches: string;
    top_search_query: any[];
  });
  const [topBrand, setTopBrand] = useState({
    brands: [],
    views: [],
  } as {
    brands: string[];
    views: number[];
  });

  const calculatePercentage = (current: number, last: number) => {
    const selisihNilai = current - last;
    const persentasePotongan = (selisihNilai / current) * 100;
    return persentasePotongan.toFixed(0);
  };

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

        const responseBrandInsight = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/analytic/webstore-brand-insight/${webstoreResponse.data?.domain}`
        );

        if (
          responseWebstoreProductInsight?.data[0]?.total_searches !==
            undefined ||
          responseWebstoreProductInsight?.data[0]?.total_searches !== null
        ) {
          const { total_searches, top_search_query } =
            responseWebstoreSearchInsight.data[0];

          const { total_product_view, top_product_view } =
            responseWebstoreProductInsight.data[0];

          const responseBrand = responseBrandInsight.data[0].top_brand_view;

          const brands = responseBrand.map((a: any) => a.brandName);
          const views = responseBrand.map((a: any) => a.views);

          setTopBrand({
            brands,
            views,
          });

          setSearchInsight({
            total_searches,
            top_search_query,
          });

          setProductInsight({
            top_product_view,
            total_product_view,
          });
        }

        if (
          responseWebstoreProductInsight?.data[1]?.total_searches !==
            undefined ||
          responseWebstoreProductInsight?.data[1]?.total_searches !== null
        ) {
          const { total_searches, top_search_query } =
            responseWebstoreSearchInsight.data[1];

          const { total_product_view, top_product_view } =
            responseWebstoreProductInsight.data[1];

          setOldSearchInsight({
            total_searches,
            top_search_query,
          });

          setOldProductInsight({
            top_product_view,
            total_product_view,
          });
        }
      }
    }

    fetchData();
  }, [slug]);

  const handleChangeDomain = async () => {
    Confirm.prompt(
      "Konfirmasi",
      "Nama domain baru?",
      webstore.domain,
      "Ubah",
      "Batal",
      async (newDomain) => {
        if (isValidDomain(newDomain)) {
          const response = await PatchDataApi(
            `${process.env.NEXT_PUBLIC_HOST}/webstore/${slug}`,
            {
              url: `https://www.${newDomain}`,
              domain: newDomain,
            }
          );
          if (response.success) {
            Notify.success(response.message);
          } else {
            Notify.failure(response.message);
          }
        } else {
          Notify.failure("format domain tidak valid");
        }
      }
    );
  };

  return (
    <div>
      <HeaderAndBackIcon title={"Detail Webstore"} />
      <SectionLayout>
        <div>
          <ListData label="Nama Webstore" value={webstore.nama_webstore} />
          <ListData label="Domain" value={webstore.domain} />
          <ListData label="Url" value={webstore.url} />
          <ListData
            label="Persentase keuntungan"
            value={webstore.profit_percentage}
          />
          <ListData
            label="Tampil stok"
            value={webstore.show_stock ? <span>Ya</span> : <span>Tidak</span>}
          />
          <ListData
            label="Tampil harga"
            value={webstore.show_price ? <span>Ya</span> : <span>Tidak</span>}
          />
          <ListData
            label="Terkunci"
            value={webstore.use_password ? <span>Ya</span> : <span>Tidak</span>}
          />
          {webstore.use_password && (
            <ListData label="Password" value={webstore.password} />
          )}
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
          {webstore.isLive && (
            <Button onClick={handleChangeDomain} variant="outlined">
              Ubah Domain
            </Button>
          )}
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
                    data={productInsight.total_product_view}
                    percentase={
                      Number(
                        calculatePercentage(
                          Number(productInsight.total_product_view),
                          Number(oldProductInsight.total_product_view)
                        )
                      ) || 0
                    }
                    color={"violet"}
                    title={"Dilihat"}
                    icon={<FaEye />}
                  />

                  <InsightCard
                    data={searchInsight.total_searches}
                    title={"Pencarian"}
                    color={"amber"}
                    percentase={
                      Number(
                        calculatePercentage(
                          Number(searchInsight.total_searches),
                          Number(oldsSarchInsight.total_searches)
                        )
                      ) || 0
                    }
                    icon={<FaSearch />}
                  />
                </div>

                <div className="my-3">
                  <Typography>Produk Populer</Typography>
                  <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-4">
                    <div className="md:w-2/3 w-full">
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
                    <div className="md:w-1/3 w-full">
                      <PieChart
                        title={"Top Brands"}
                        labels={topBrand.brands}
                        data={topBrand.views}
                      />
                    </div>
                  </div>
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
