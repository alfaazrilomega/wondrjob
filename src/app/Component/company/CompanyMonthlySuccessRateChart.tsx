"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CompanyMonthlyStats {
  month: number;
  year: number;
  successRate: number; // Percentage
}

interface ChartDataPoint {
  name: string; // e.g., "Jan 2025"
  successRate: number;
}

interface CompanyMonthlySuccessRateChartProps {
  data: CompanyMonthlyStats[];
  lineColor?: string;
  gridColor?: string;
  textColor?: string;
}

const CompanyMonthlySuccessRateChart: React.FC<
  CompanyMonthlySuccessRateChartProps
> = ({
  data,
  lineColor = "#82ca9d", // A different default color for distinction
  gridColor = "#4a4a4a",
  textColor = "#E0E0E0",
}) => {
  const formatChartData = (
    monthlyStats: CompanyMonthlyStats[],
  ): ChartDataPoint[] => {
    // Sort data by year and then by month to ensure correct chronological order
    const sortedStats = [...monthlyStats].sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return a.month - b.month;
    });

    return sortedStats.map((stat) => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthName = monthNames[stat.month - 1]; // month is 1-indexed
      return {
        name: `${monthName} ${stat.year}`,
        successRate: stat.successRate * 100, // Convert to percentage
      };
    });
  };

  const chartData = formatChartData(data);

  return (
    <div className="w-full h-64 p-2 bg-gray-900 rounded-lg shadow-inner border border-gray-700">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} tickLine={false} />
          <YAxis
            stroke={textColor}
            tickLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333333",
              borderColor: "#666666",
              color: textColor,
            }}
            itemStyle={{ color: textColor }}
            formatter={(value: number) => [
              `${value.toFixed(1)}%`,
              "Success Rate",
            ]}
          />
          <Line
            type="monotone"
            dataKey="successRate"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 4, fill: lineColor, stroke: "#FFFFFF", strokeWidth: 2 }}
            activeDot={{
              r: 6,
              fill: "#FFFFFF",
              stroke: lineColor,
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompanyMonthlySuccessRateChart;
