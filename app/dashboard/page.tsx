"use client";
import { LoadingAnimation, Table, Typography } from "@/src/components";
import { FaSearch, FaCubes, FaEye } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { GetDataApi } from "@/utils";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Dashboard() {
  const [dailySearch, setDailySearch] = useState({} as any);
  const [dailyProductView, setProductView] = useState({} as any);
  const [dailySearchTrend, setDailySearchTrend] = useState([] as any);
  const [dailyPopulerProducts, setDailyPopulerProducts] = useState([] as any);
  const [lastDailySearch, setlastDailySearch] = useState({} as any);
  const [lastDailyProductView, setlastProductView] = useState({} as any);
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
      //  -- LAST --
      setlastDailySearch(dailySearchResponse?.data[1]);
      setlastProductView(dailyProductViewResponse?.data[1]);
      // --
      setProducts(productsResponse?.metadata);
      setBrand(productsBrandResponse?.metadata);
    }
    fetchData();
  }, []);

  const calculatePercentage = (current: number, last: number) => {
    const selisihNilai = current - last;
    const persentasePotongan = (selisihNilai / current) * 100;
    return persentasePotongan.toFixed(0);
  };

  if (!dailySearch.total_searches) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Typography variant="subtitle">Insight Produk (Kemarin)</Typography>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <InsightCard
          data={totalProducts.totalData}
          title={"Total"}
          color={"emerald"}
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
          percentase={Number(
            calculatePercentage(
              dailySearch.total_searches,
              lastDailySearch.total_searches
            )
          )}
          icon={<FaSearch />}
        />

        <InsightCard
          data={dailyProductView.total_product_views}
          percentase={Number(
            calculatePercentage(
              dailyProductView.total_product_views,
              lastDailyProductView.total_product_views
            )
          )}
          color={"violet"}
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
              label: "Jumlah dilihat",
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
              label: "Jumlah dicari",
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
  percentase?: number;
  title: string;
  color: "amber" | "emerald" | "sky" | "violet";
  icon: React.ReactNode;
}) => {
  const colorBg = {
    amber:
      "bg-gradient-to-br from-amber-300 to-amber-500 dark:from-amber-700 dark:to-amber-900",
    emerald:
      "bg-gradient-to-br from-emerald-300 to-emerald-500 dark:from-emerald-700 dark:to-emerald-900",
    sky: "bg-gradient-to-br from-sky-300 to-sky-500 dark:from-sky-700 dark:to-sky-900",
    violet:
      "bg-gradient-to-br from-violet-300 to-violet-500 dark:from-violet-700 dark:to-violet-900",
  };

  return (
    <div className={`p-3 rounded ${colorBg[props.color]}`}>
      <div className="flex justify-between">
        {props.icon}
        <Typography variant="subtitle">{props.data}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography variant="helper">{props.title}</Typography>
        {props.percentase && (
          <div className="flex items-center space-x-1">
            {props.percentase <= 0 ? (
              <FaArrowDown
                className={`text-xs ${
                  props.percentase <= 0 ? "text-red-500" : "text-green-500"
                }`}
              />
            ) : (
              <FaArrowUp
                className={`text-xs ${
                  props.percentase <= 0 ? "text-red-500" : "text-green-500"
                }`}
              />
            )}
            <Typography
              color={props.percentase <= 0 ? "danger" : "success"}
              variant="helper"
            >
              {props.percentase}%
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
