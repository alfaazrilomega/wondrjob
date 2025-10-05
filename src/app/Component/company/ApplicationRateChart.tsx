// src/app/Component/company/ApplicationRateChart.tsx
"use client";

import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface ApplicationRateChartProps {
  successRate: number;
}

const ApplicationRateChart = ({ successRate }: ApplicationRateChartProps) => {
  const data = [{ name: "Success Rate", value: successRate }];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        innerRadius="70%"
        outerRadius="100%"
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          dataKey="value"
          cornerRadius={10}
          fill="#3b82f6" // Blue color for the bar
          background={{ fill: "#1f2937" }} // Darker gray for background
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold fill-white"
        >
          {`${successRate.toFixed(0)}%`}
        </text>
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-gray-400"
        >
          Success
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default ApplicationRateChart;
