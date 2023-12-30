"use client";
import {
  InsightCard,
  LoadingAnimation,
  Table,
  Typography,
} from "@/src/components";
import { FaSearch, FaCubes, FaEye } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { GetDataApi } from "@/utils";
import React, { useEffect, useState } from "react";

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
