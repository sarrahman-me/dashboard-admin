"use client";
import React, { useEffect, useState } from "react";
import { GaugeChartComp, LineChart } from "@/src/components";
import { GetDataApi } from "@/src/utils";
import moment from "moment";
import CPUCalculator from "@/src/utils/cpuCalculator";

export default function Monitoring() {
  const [cpu, setCpu] = useState<any>(0);
  const [memoryUsage, setMemoryUsage] = useState<any>(0);
  const [uptime, setUptime] = useState<any>(0);
  const [cpuData, setCpuData] = useState<any[]>([]);
  const [memoryData, setMemoryData] = useState<any[]>([]);
  const [timeLabels, setTimeLabels] = useState<number[]>([]);

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

        // Update the data arrays for LineChart
        setCpuData((prevCpuData) => [
          ...prevCpuData,
          CPUCalculator(responseCPU),
        ]);
        setMemoryData((prevMemoryData) => [
          ...prevMemoryData,
          memoryUsagePercentage.toFixed(2),
        ]);

        // Update the time labels array
        setTimeLabels((prevTimeLabels) => [
          ...prevTimeLabels,
          Math.floor(uptime),
        ]);
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
      <div className="my-3">
        <p className="font-semibold text-lg text-center text-lime-500">
          {formattedUptime}
        </p>
        <p className="text-xs text-center">
          {moment().subtract(uptime, "seconds").format("LLL")}
        </p>
      </div>
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
      <div className="my-3">
        <LineChart
          title={"Monitor"}
          labels={timeLabels}
          data={[
            {
              label: "Average Cpu",
              color: "#32CD32",
              data: cpuData,
            },
            {
              label: "Average Memory",
              color: "#3949AB",
              data: memoryData,
            },
          ]}
        />
      </div>
    </div>
  );
}
