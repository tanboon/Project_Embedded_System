import React, { useEffect, useState } from "react";
import { Card } from "./UI/card";
import { Fuel } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FeedEntry, FuelsResponse } from "../hooks/useFuel";
import dayjs, { Dayjs } from "dayjs";

interface FuelChartProps {
  data: FuelsResponse;
}

export const FuelChart = ({ data }: FuelChartProps) => {
  const [fuelData, setFuelData] = useState<any>([]);

  useEffect(() => {
    let latest_day: Dayjs = dayjs(data.feeds[0].created_at);
    for (let i = 0; i < data.feeds.length; ++i) {
      let day = dayjs(data.feeds[i].created_at);
      if (day.isAfter(latest_day)) {
        latest_day = day;
      }
    }

    const processedData = data.feeds
      .filter((value) => dayjs(value.created_at).isSame(latest_day, "day"))
      .map((value) => ({
        time: dayjs(value.created_at).format("HH:mm:ss"),
        level: parseInt(value.field1),
      }));

    setFuelData(processedData);
  }, [data]);

  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Fuel className="text-primary" />
        Fuel Consumption
      </h3>
      <div style={{ aspectRatio: 16 / 10.45 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={fuelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF" }}
              label={{
                value: "Fuel Level (%)",
                angle: -90,
                position: "insideLeft",
                fill: "#9CA3AF",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "0.375rem",
                textAlign: "left",
              }}
              labelStyle={{ color: "#9CA3AF" }}
              itemStyle={{ color: "#9CA3AF" }}
            />
            <Line
              type="monotone"
              dataKey="level"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#8b5cf6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
