"use client";
import React, { useEffect, useState } from "react";
import { LuFileSearch } from "react-icons/lu";
import { GaugeChartComp, IconButton, Textfield } from "@/src/components";
import { GetDataApi } from "@/src/utils";
import moment from "moment";

export default function Monitoring() {
  const [monitor, setMonitor] = useState({} as any);
  const [logs, setLogs] = useState([] as any);
  const [query, setQuery] = useState<string>("");
  const [logsSearches, setSearches] = useState([] as any);
  const [onSearch, setOnSearch] = useState(false);

  const handleSearch = async () => {
    const responseLogs = await GetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/monitor/logs?limit=100&search=${query}`
    );

    setOnSearch(true);
    setSearches(responseLogs.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseServer = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/monitor/server`
        );

        const responseLogs = await GetDataApi(
          `${process.env.NEXT_PUBLIC_HOST}/monitor/logs?limit=100`
        );

        setLogs(responseLogs.data);

        const { cpu_percentage, memory_usage_percentage, uptime } =
          responseServer.data;

        setMonitor({ cpu_percentage, memory_usage_percentage, uptime });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  // Format uptime using Moment.js
  const duration = moment.duration(monitor.uptime, "seconds");
  const formattedUptime = `${duration.hours()} jam ${duration.minutes()} menit ${duration.seconds()} detik`;

  return (
    <div>
      <p className="font-bold text-center text-lg">Informasi Server</p>
      <div className="my-3">
        <p className="font-semibold text-lg text-center text-lime-500">
          {formattedUptime}
        </p>
        <p className="text-xs text-center">
          {moment().subtract(monitor.uptime, "seconds").format("LLL")}
        </p>
      </div>
      <div className="justify-center space-x-3 flex">
        <div>
          <GaugeChartComp data={monitor.cpu_percentage} />
          <p className="text-xs text-center">CPU Usage</p>
        </div>
        <div>
          <GaugeChartComp data={monitor.memory_usage_percentage} />
          <p className="text-xs text-center">Memory Usage</p>
        </div>
      </div>

      <div className="flex justify-center mb-1 mt-3">
        <div className="flex items-center space-x-1">
          <Textfield
            placeholder="Cari ..."
            name={"search"}
            onChange={(value) => setQuery(value)}
          />
          <IconButton
            size="large"
            disabled={!query}
            icon={<LuFileSearch />}
            onClick={handleSearch}
          />
        </div>
      </div>
      {query && onSearch && (
        <div>
          <p className="font-semibold underline my-2 text-sm sm:text-base">
            Pencarian Catatan {query}
          </p>
          <div className="border bg-gray-900 text-green-500 p-2 rounded-md font-mono text-xs sm:text-sm overflow-auto">
            {logsSearches.map((log: any, i: any) => (
              <div
                key={i}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <p>{moment(log.timestamp).format("DD/MM/YYYY HH:mm:ss")}</p>
                <p>{log.source}</p>
                <p> {log.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="font-semibold underline my-2  text-sm sm:text-base">
          Catatan Server
        </p>
        <div className="border bg-gray-900 text-green-500 p-2 rounded-md font-mono text-xs sm:text-sm overflow-auto">
          {logs.map((log: any, i: any) => (
            <div
              key={i}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <p>{moment(log.timestamp).format("HH:mm:ss")}</p>
              <p>{log.source}</p>
              <p> {log.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
