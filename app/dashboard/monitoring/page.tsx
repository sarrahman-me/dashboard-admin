"use client";
import React, { useEffect, useState } from "react";
import { GaugeChartComp } from "@/src/components";
import { GetDataApi } from "@/src/utils";
import CPUCalculator from "@/src/utils/cpuCalculator";

export default function Monitoring() {
  const [cpu, setCpu] = useState<any>(0);
  const [memoryUsage, setMemoryUsage] = useState<any>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCPU = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/monitoring/cpu`
        );

        const responseMemory = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/monitoring/memory`
        );

        const { totalMemory, freeMemory } = responseMemory;

        const memoryUsagePercentage =
          ((totalMemory - freeMemory) / totalMemory) * 100;

        setCpu(CPUCalculator(responseCPU));
        setMemoryUsage(memoryUsagePercentage.toFixed(2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p className="font-bold text-lg">Monitoring</p>
      <div className="justify-center space-x-3 flex">
        <div>
          <GaugeChartComp data={cpu} />
          <p className="text-xs text-center">CPU Usage</p>
        </div>
        <div>
          <GaugeChartComp data={memoryUsage} />
          <p className="text-xs text-center">Memory Usage</p>
        </div>
      </div>
    </div>
  );
}
