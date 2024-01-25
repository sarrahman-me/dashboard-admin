"use client";
import { ListData } from "@/layouts/components/atoms";
import { HeaderAndBackIcon } from "@/layouts/components/molecules";
import { SectionLayout, Timeline } from "@/layouts/template";
import {
  Button,
  InsightCard,
  LineChart,
  PieChart,
  Select,
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
  const [period, setPeriod] = useState("harian");
  const [dataInsight, setDataInsight] = useState({
    total_product_view: "",
    total_product_view_last_period: "",
    top_product_view: [],
    total_searches: "",
    total_searches_last_period: "",
    top_search_query: [],
    top_brands: [],
    dailyProductView: [],
    dailySearchProduct: [],
  } as {
    total_product_view: string;
    total_product_view_last_period: string;
    top_product_view: any[];
    total_searches: string;
    total_searches_last_period: string;
    top_search_query: any[];
    top_brands: any[];
    dailyProductView: any[];
    dailySearchProduct: any[];
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
        const responseWebstoreInsight = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/analytic/dashboard-mitra-insight/${webstoreResponse.data?.domain}?period=${period}`
        );

        const responseDailyProductView = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/analytic/webstore-daily-activity/${webstoreResponse.data?.domain}`
        );

        const {
          total_product_view,
          total_product_view_last_period,
          top_product_view,
          total_searches,
          total_searches_last_period,
          top_search_query,
          top_brands,
        } = responseWebstoreInsight.data;

        setDataInsight({
          top_brands,
          top_product_view,
          total_product_view_last_period,
          top_search_query,
          total_product_view,
          total_searches_last_period,
          total_searches,
          dailyProductView: responseDailyProductView.data.product_view,
          dailySearchProduct: responseDailyProductView.data.search_product,
        });
      }
    }

    fetchData();
  }, [period, slug]);

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
            {dataInsight.total_product_view !== undefined && (
              <div>
                <div className="flex space-x-1">
                  <Typography variant="subtitle">
                    Insight Produk {webstore.domain}{" "}
                    {period === "harian"
                      ? "hari ini"
                      : period === "mingguan"
                      ? "7 hari terakhir"
                      : "30 hari terakhir"}
                  </Typography>
                  <Select
                    noIcon
                    size="small"
                    value={period}
                    setValue={(value) => {
                      setPeriod(value);
                    }}
                    lists={["bulanan", "mingguan", "harian"]}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-6">
                  <InsightCard
                    data={dataInsight.total_product_view}
                    percentase={
                      Number(
                        calculatePercentage(
                          Number(dataInsight.total_product_view),
                          Number(dataInsight.total_product_view_last_period)
                        )
                      ) || 0
                    }
                    color={"violet"}
                    title={"Dilihat"}
                    icon={<FaEye />}
                  />

                  <InsightCard
                    data={dataInsight.total_searches}
                    title={"Pencarian"}
                    color={"amber"}
                    percentase={
                      Number(
                        calculatePercentage(
                          Number(dataInsight.total_searches),
                          Number(dataInsight.total_searches_last_period)
                        )
                      ) || 0
                    }
                    icon={<FaSearch />}
                  />
                </div>

                <div className="my-3 flex items-center flex-col md:flex-row gap-2 md:gap-4">
                  <div className="md:w-2/3 w-full">
                    <LineChart
                      title={"Aktivitas Harian"}
                      labels={dataInsight.dailyProductView.map(
                        (item: any) => item.day
                      )}
                      data={[
                        {
                          label: "view",
                          color: "#32CD32",
                          data: dataInsight.dailyProductView.map(
                            (item: any) => item.total_data
                          ),
                        },
                        {
                          label: "search",
                          color: "#3949AB",
                          data: dataInsight.dailySearchProduct.map(
                            (item: any) => item.total_data
                          ),
                        },
                      ]}
                    />
                  </div>
                  <div className="md:w-1/3 w-full">
                    <PieChart
                      title={"Top Brands"}
                      labels={dataInsight.top_brands.map(
                        (item) => item.brandName
                      )}
                      data={dataInsight.top_brands.map((item) => item.views)}
                    />
                  </div>
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
                    datas={dataInsight.top_product_view}
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
                    datas={dataInsight.top_search_query}
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
