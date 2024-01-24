"use client";
import {
  InsightCard,
  LoadingAnimation,
  PieChart,
  Table,
  LineChart,
  Typography,
  Select,
} from "@/src/components";
import { FaSearch, FaCubes, FaEye } from "react-icons/fa";
import { LuSearchX } from "react-icons/lu";
import { GetDataApi } from "@/utils";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [period, setPeriod] = useState("harian");
  const [dataInsight, setDataInsight] = useState({
    total_product: "",
    total_product_view: "",
    total_product_view_last_period: "",
    total_searches: "",
    total_searches_without_result: "",
    totalSearchesWithoutResultLastPeriod: "",
    total_searches_last_period: "",
    top_product_view: [],
    top_search_query_without_result: [],
    top_search_query: [],
    top_brands: [],
    dailyProductView: [],
    dailySearchProduct: [],
  } as {
    total_product: string;
    total_product_view: string;
    total_product_view_last_period: string;
    total_searches: string;
    total_searches_without_result: string;
    totalSearchesWithoutResultLastPeriod: string;
    total_searches_last_period: string;
    top_product_view: any[];
    top_search_query_without_result: any[];
    top_search_query: any[];
    top_brands: any[];
    dailyProductView: any[];
    dailySearchProduct: any[];
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseDailyProductView = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analytic/daily-activity`
      );

      const responseAdminInsight = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analytic/dashboard-insight?period=${period}`
      );

      const {
        total_product,
        total_product_view,
        total_product_view_last_period,
        total_searches,
        total_searches_without_result,
        totalSearchesWithoutResultLastPeriod,
        total_searches_last_period,
        top_product_view,
        top_search_query_without_result,
        top_search_query,
        top_brands,
      } = responseAdminInsight.data;

      setDataInsight({
        top_search_query_without_result,
        totalSearchesWithoutResultLastPeriod,
        total_searches_without_result,
        total_product,
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
    };
    fetchData();
  }, [period]);

  const calculatePercentage = (current: number, last: number) => {
    const selisihNilai = current - last;
    const persentasePotongan = (selisihNilai / current) * 100;
    return persentasePotongan.toFixed(0);
  };

  if (!dataInsight.total_product) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <div className="flex space-x-1">
        <Typography variant="subtitle">
          Insight Produk{" "}
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <InsightCard
          data={dataInsight.total_product}
          title={"Barang"}
          color={"blue"}
          icon={<FaCubes />}
        />

        <InsightCard
          data={dataInsight.total_product_view}
          title={"Dilihat"}
          percentase={
            Number(
              calculatePercentage(
                Number(dataInsight.total_product_view),
                Number(dataInsight.total_product_view_last_period)
              )
            ) || 0
          }
          color={"stone"}
          icon={<FaEye />}
        />

        <InsightCard
          data={dataInsight.total_searches}
          percentase={
            Number(
              calculatePercentage(
                Number(dataInsight.total_searches),
                Number(dataInsight.total_searches_last_period)
              )
            ) || 0
          }
          color={"violet"}
          title={"Pencarian"}
          icon={<FaSearch />}
        />

        <InsightCard
          data={dataInsight.total_searches_without_result}
          title={"Pencarian Tanpa Hasil"}
          color={"amber"}
          percentase={
            Number(
              calculatePercentage(
                Number(dataInsight.total_searches_without_result),
                Number(dataInsight.totalSearchesWithoutResultLastPeriod)
              )
            ) || 0
          }
          icon={<LuSearchX />}
        />
      </div>

      <div className="my-3 flex items-center flex-col md:flex-row gap-2 md:gap-4">
        <div className="md:w-2/3 w-full">
          <LineChart
            title={"Aktivitas Harian"}
            labels={dataInsight.dailyProductView.map((item: any) => item.day)}
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
            labels={dataInsight.top_brands.map((item) => item.brandName)}
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

      <div className="my-3 flex items-center flex-col md:flex-row gap-2 md:gap-4">
        <div className="md:w-1/2 w-full">
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
        <div className="md:w-1/2 w-full">
          <Typography>Pencarian Tanpa Hasil</Typography>
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
            datas={dataInsight.top_search_query_without_result}
          />
        </div>
      </div>
    </div>
  );
}
