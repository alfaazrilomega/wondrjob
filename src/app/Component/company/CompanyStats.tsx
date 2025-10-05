"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface CompanyStat {
  companyName: string;
  totalApplications: number;
  successfulApplications: number;
  successRate: number;
}

export function CompanyStats() {
  const [stats, setStats] = useState<CompanyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/application-stats?companyId=all");
        if (!response.ok) {
          throw new Error("Failed to fetch application stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">
        Company Application Statistics
      </h2>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Total Applications</TableHead>
              <TableHead className="text-right">
                Successful Applications
              </TableHead>
              <TableHead className="text-right">Success Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.companyName}>
                <TableCell className="font-medium">
                  {stat.companyName}
                </TableCell>
                <TableCell className="text-right">
                  {stat.totalApplications}
                </TableCell>
                <TableCell className="text-right">
                  {stat.successfulApplications}
                </TableCell>
                <TableCell className="text-right">
                  {stat.successRate.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
