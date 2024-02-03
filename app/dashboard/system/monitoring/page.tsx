"use client";
import React, { useEffect, useState } from "react";
import { GaugeChartComp } from "@/src/components";
import { GetDataApi } from "@/src/utils";
import moment from "moment";
import CPUCalculator from "@/src/utils/cpuCalculator";

export default function Monitoring() {
  const [cpu, setCpu] = useState<any>(0);
  const [memoryUsage, setMemoryUsage] = useState<any>(0);
  const [uptime, setUptime] = useState<any>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCPU = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/monitoring/cpu`
        );

        const responseMemory = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/monitoring/memory`
        );

        const { uptime } = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/monitoring/uptime`
        );

        setUptime(uptime);

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

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Format uptime using Moment.js
  const duration = moment.duration(uptime, "seconds");
  const formattedUptime = `${duration.hours()} jam ${duration.minutes()} menit ${duration.seconds()} detik`;

  return (
    <div>
      <p className="font-bold text-center text-lg">Informasi Server</p>
      <p className="font-semibold text-lg text-center my-3 text-lime-500">
        {formattedUptime}
      </p>

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
