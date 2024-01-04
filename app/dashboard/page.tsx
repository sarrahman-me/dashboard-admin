"use client";
import {
  InsightCard,
  LoadingAnimation,
  PieChart,
  Table,
  Typography,
} from "@/src/components";
import { FaSearch, FaCubes, FaEye } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { GetDataApi } from "@/utils";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [productInsight, setProductInsight] = useState({
    total_product_view: "",
    total_product: "",
    total_brand: "",
    top_product_view: [],
  } as {
    total_product_view: string;
    total_product: string;
    total_brand: string;
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
    total_product: "",
    total_brand: "",
    top_product_view: [],
  } as {
    total_product_view: string;
    total_product: string;
    total_brand: string;
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

  useEffect(() => {
    const fetchData = async () => {
      const responseProductInsight = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analytic/product-insight`
      );

      const responseSearchInsight = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analytic/search-insight`
      );

      const responseBrandInsight = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/analytic/brand-insight`
      );

      if (
        responseProductInsight?.data[0]?.total_searches !== undefined ||
        responseProductInsight?.data[0]?.total_searches !== null
      ) {
        const { total_searches, top_search_query } =
          responseSearchInsight.data[0];

        const {
          total_product,
          total_brand,
          total_product_view,
          top_product_view,
        } = responseProductInsight.data[0];

        setSearchInsight({
          total_searches,
          top_search_query,
        });

        const responseBrand = responseBrandInsight.data[0].top_brand_view;

        const brands = responseBrand.map((a: any) => a.brandName);
        const views = responseBrand.map((a: any) => a.views);

        setTopBrand({
          brands,
          views,
        });

        setProductInsight({
          total_product,
          total_brand,
          top_product_view,
          total_product_view,
        });

        if (
          responseProductInsight?.data[1]?.total_searches !== undefined ||
          responseProductInsight?.data[1]?.total_searches !== null
        ) {
          const { total_searches, top_search_query } =
            responseSearchInsight.data[1];

          const {
            total_product,
            total_brand,
            total_product_view,
            top_product_view,
          } = responseProductInsight.data[1];

          setOldSearchInsight({
            total_searches,
            top_search_query,
          });

          setOldProductInsight({
            total_product,
            total_brand,
            top_product_view,
            total_product_view,
          });
        }
      }
    };
    fetchData();
  }, []);

  const calculatePercentage = (current: number, last: number) => {
    const selisihNilai = current - last;
    const persentasePotongan = (selisihNilai / current) * 100;
    return persentasePotongan.toFixed(0);
  };

  if (!productInsight.total_product) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Typography variant="subtitle">Insight Produk (Kemarin)</Typography>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <InsightCard
          data={productInsight.total_product}
          title={"Total"}
          percentase={
            Number(
              calculatePercentage(
                Number(productInsight.total_product),
                Number(oldProductInsight.total_product)
              )
            ) || 0
          }
          color={"blue"}
          icon={<FaCubes />}
        />

        <InsightCard
          data={productInsight.total_brand}
          title={"Brand"}
          percentase={
            Number(
              calculatePercentage(
                Number(productInsight.total_brand),
                Number(oldProductInsight.total_brand)
              )
            ) || 0
          }
          color={"stone"}
          icon={<MdDiscount />}
        />

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

      <div className="my-3 flex items-center flex-col md:flex-row gap-2 md:gap-4">
        <div className="md:w-2/3 w-full">
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
        <div className="md:w-1/3 w-full">
          <PieChart
            title={"Top Brands"}
            labels={topBrand.brands}
            data={topBrand.views}
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
          datas={productInsight.top_product_view}
        />
      </div>
    </div>
  );
}
