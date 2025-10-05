// src/app/company/ApplicationSuccessLineChart.tsx
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

// Data structure for the chart props
interface ChartDataPoint {
  month: string;
  successRate: number; // Percentage
}

interface ApplicationSuccessLineChartProps {
  data: ChartDataPoint[]; // Array of data points to plot
  // Optional: You could pass theme colors as props for more flexibility
  lineColor?: string;
  gridColor?: string;
  textColor?: string;
}

const ApplicationSuccessLineChart: React.FC<
  ApplicationSuccessLineChartProps
> = ({
  data,
  lineColor = "#8884d8", // A default vibrant color for the line (e.g., a blue/purple)
  gridColor = "#4a4a4a", // Darker color for grid lines for dark theme
  textColor = "#E0E0E0", // Light text for labels and tooltips in dark theme
}) => {
  // Dummy Data for demonstration if actual data isn't passed or is empty
  const defaultData: ChartDataPoint[] = [
    { month: "Jan", successRate: 65 },
    { month: "Feb", successRate: 70 },
    { month: "Mar", successRate: 68 },
    { month: "Apr", successRate: 75 },
    { month: "May", successRate: 72 },
    { month: "Jun", successRate: 80 },
    { month: "Jul", successRate: 78 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="w-full h-64 p-2 bg-gray-900 rounded-lg shadow-inner border border-gray-700">
      {" "}
      {/* Dark background for the chart container */}
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
          <XAxis dataKey="month" stroke={textColor} tickLine={false} />
          <YAxis
            stroke={textColor}
            tickLine={false}
            domain={[0, 100]} // Assuming success rate is 0-100%
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333333", // Dark background for tooltip
              borderColor: "#666666", // Border color for tooltip
              color: textColor,
            }}
            itemStyle={{ color: textColor }}
            formatter={(value: number) => [
              `${value.toFixed(1)}%`,
              "Success Rate",
            ]}
          />
          <Line
            type="monotone" // Smooth line
            dataKey="successRate"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 4, fill: lineColor, stroke: "#FFFFFF", strokeWidth: 2 }} // Dots on line
            activeDot={{
              r: 6,
              fill: "#FFFFFF",
              stroke: lineColor,
              strokeWidth: 2,
            }} // Active dot on hover
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationSuccessLineChart;
