"use client";
import { LoadingAnimation, Table, Typography } from "@/src/components";
import { FaSearch, FaCubes, FaEye } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { GetDataApi } from "@/utils";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [dailySearch, setDailySearch] = useState({} as any);
  const [dailyProductView, setProductView] = useState({} as any);
  const [dailySearchTrend, setDailySearchTrend] = useState([] as any);
  const [dailyPopulerProducts, setDailyPopulerProducts] = useState([] as any);
  const [totalProducts, setProducts] = useState({} as any);
  const [totalBrand, setBrand] = useState({} as any);

  useEffect(() => {
    async function fetchData() {
      const dailySearchResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analysis/data/daily-search`
      );
      const dailyProductViewResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analysis/data/daily-product-view`
      );
      const dailySearchTrendResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analysis/data/daily-search-trend`
      );
      const dailyPopulerProductResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analysis/data/daily-populer-products`
      );
      const productsResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/products/barang?limit=1`
      );
      const productsBrandResponse = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/suplier/brand?limit=1`
      );

      setDailySearch(dailySearchResponse?.data[0]);
      setProductView(dailyProductViewResponse?.data[0]);
      setDailySearchTrend(dailySearchTrendResponse?.data[0].searches);
      setDailyPopulerProducts(dailyPopulerProductResponse?.data[0].products);
      setProducts(productsResponse?.metadata);
      setBrand(productsBrandResponse?.metadata);
    }
    fetchData();
  }, []);

  if (!dailySearch.total_searches) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Typography variant="subtitle">Insight Produk (Kemarin)</Typography>
      <div className="flex items-center my-2 space-x-1 md:space-x-3">
        <InsightCard
          data={totalProducts.totalData}
          title={"Total"}
          color={"violet"}
          icon={<FaCubes />}
        />

        <InsightCard
          data={totalBrand.totalData}
          title={"Brand"}
          color={"sky"}
          icon={<MdDiscount />}
        />

        <InsightCard
          data={dailySearch.total_searches}
          title={"Pencarian"}
          color={"amber"}
          icon={<FaSearch />}
        />

        <InsightCard
          data={dailyProductView.total_product_views}
          title={"Dilihat"}
          color={"emerald"}
          icon={<FaEye />}
        />
      </div>

      <div className="my-3">
        <Typography>Produk Populer</Typography>
        <Table
          columns={[
            {
              label: "Nama Barang",
              renderCell: (item: any) => item.nama_barang,
            },
            {
              label: "Brand",
              renderCell: (item: any) => item.brand,
            },
            {
              label: "Warna",
              renderCell: (item: any) => item.warna,
            },

            {
              label: "Jumlah",
              renderCell: (item: any) => item.viewed,
            },
          ]}
          datas={dailyPopulerProducts}
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
              label: "Jumlah",
              renderCell: (item: any) => item.total_search,
            },
          ]}
          datas={dailySearchTrend}
        />
      </div>
    </div>
  );
}

const InsightCard = (props: {
  data: string;
  title: string;
  color: "amber" | "emerald" | "sky" | "violet";
  icon: React.ReactNode;
}) => {
  const colorBg = {
    amber: "bg-amber-300 dark:bg-amber-700",
    emerald: "bg-emerald-300 dark:bg-emerald-700",
    sky: "bg-sky-300 dark:bg-sky-700",
    violet: "bg-violet-300 dark:bg-violet-700",
  };

  return (
    <div
      className={`flex justify-between p-3 w-1/2 md:w-1/4 rounded ${
        colorBg[props.color]
      }`}
    >
      <div className="space-y-2">
        {props.icon}
        <Typography variant="helper">{props.title}</Typography>
      </div>
      <Typography variant="subtitle" align="center">
        {props.data}
      </Typography>
    </div>
  );
};
