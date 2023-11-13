"use client";
import { LoadingAnimation, Typography } from "@/src/components";
import { GetDataApi } from "@/utils";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dailySearch, setDailySearch] = useState({} as any);
  const [dailyProductView, setProductView] = useState({} as any);
  const [dailySearchTrend, setDailySearchTrend] = useState([] as any);
  const [dailyPopulerProducts, setDailyPopulerProducts] = useState([] as any);

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

      setDailySearch(dailySearchResponse.data[0]);
      setProductView(dailyProductViewResponse.data[0]);
      setDailySearchTrend(dailySearchTrendResponse.data[0].searches);
      setDailyPopulerProducts(dailyPopulerProductResponse.data[0].products);
    }
    fetchData();
  }, []);

  if (!dailySearch.total_searches) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Typography variant="subtitle">Insight</Typography>
      <div className="flex items-center my-2 space-x-3">
        <div className="p-2 rounded bg-white dark:bg-gray-800">
          <Typography>{dailySearch.total_searches} pencarian</Typography>
          <Typography variant="helper" color="secondary">
            kemarin
          </Typography>
        </div>
        <div className="p-2 rounded bg-white dark:bg-gray-800">
          <Typography>
            {dailyProductView.total_product_views} klik produk
          </Typography>
          <Typography variant="helper" color="secondary">
            kemarin
          </Typography>
        </div>
      </div>

      <div className="p-2 my-2 rounded bg-white dark:bg-gray-800">
        <Typography variant="helper" color="secondary">
          Keyword pencarian populer
        </Typography>
        <div className="my-1">
          {dailySearchTrend.map((item: any, i: number) => (
            <div key={i} className="flex items-center space-x-1">
              <Typography>{item.query}</Typography>
              <Typography>{item.total_search}</Typography>
            </div>
          ))}
        </div>
        <Typography variant="helper" color="secondary">
          kemarin
        </Typography>
      </div>

      <div className="p-2 rounded bg-white dark:bg-gray-800">
        <Typography variant="helper" color="secondary">
          Produk dilihat terbanyak
        </Typography>
        <div className="my-1">
          {dailyPopulerProducts.map((item: any, i: number) => (
            <div key={i} className="flex items-center space-x-1">
              <Typography>{item.nama_barang}</Typography>
              <Typography>{item.brand}</Typography>
              <Typography>{item.viewed} x</Typography>
            </div>
          ))}
        </div>
        <Typography variant="helper" color="secondary">
          kemarin
        </Typography>
      </div>
    </div>
  );
}
