"use client";
import React from "react";
import { GetDataApi } from "@/utils";
import { useEffect, useState } from "react";
import { CardMembershipPlan } from "../../molecules";

const MembershipPlanList = () => {
  const [membershipList, setMembershipList] = useState([] as any);

  useEffect(() => {
    async function getData() {
      const data = await GetDataApi(
        `${process.env.NEXT_PUBLIC_HOST}/membership/klasifikasi`
      );
      setMembershipList(data.data);
    }
    getData();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <p className="text-lg text-center font-semibold mb-8">
        Pilihan Paket Membership
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {membershipList.reverse().map((item: any, i: number) => (
          <div key={i}>
            <CardMembershipPlan item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPlanList;
