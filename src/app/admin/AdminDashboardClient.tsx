"use client";

import { Briefcase, LineChart, Users, type LucideProps } from "lucide-react";
import React from "react";

interface AdminDashboardClientProps {
  totalUsers: number;
  newUsers: number;
  totalJobs: number;
  recentActivities: {
    name: string | null;
    role: string | null;
    createdAt: Date;
  }[];
}

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<LucideProps>;
}) => (
  <div className="glass-card p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-4xl font-bold text-white">{value}</p>
        <p className="text-base text-[rgba(224,224,224,0.6)] mt-1">{title}</p>
      </div>
      <div className="icon-wrapper">
        <Icon className="h-6 w-6 text-[#9f54ff]" />
      </div>
    </div>
  </div>
);

export default function AdminDashboardClient({
  totalUsers,
  newUsers,
  totalJobs,
  recentActivities,
}: AdminDashboardClientProps) {
  return (
    <div className="min-h-screen bg-[#101018] text-white p-4 sm:p-6 lg:p-8">
      <style jsx global>{`
        .glass-card {
          background-color: rgba(26, 26, 46, 0.5);
          border: 1px solid rgba(159, 84, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(159, 84, 255, 0.1);
        }
        .icon-wrapper {
          border: 1px solid rgba(159, 84, 255, 0.3);
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(159, 84, 255, 0.2);
        }
        .primary-btn {
          background-color: #9f54ff;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(159, 84, 255, 0.5);
        }
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(159, 84, 255, 0.8);
        }
        .secondary-btn {
          background-color: transparent;
          color: #9f54ff;
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid #9f54ff;
          transition: all 0.3s ease;
        }
        .secondary-btn:hover {
          background-color: rgba(159, 84, 255, 0.1);
        }
      `}</style>
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-[#E0E0E0]">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:col-span-3">
            <StatCard title="Total Users" value={totalUsers} icon={Users} />
            <StatCard
              title="New Users (24h)"
              value={newUsers}
              icon={LineChart}
            />
            <StatCard title="Total Jobs" value={totalJobs} icon={Briefcase} />
          </div>

          <div className="glass-card p-6 lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-[#E0E0E0]">
              Recent Activity
            </h2>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 border-b border-[rgba(159,84,255,0.2)] pb-4"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#9f54ff] bg-[rgba(159,84,255,0.1)]">
                    <span className="text-lg font-bold text-[#E0E0E0]">
                      {activity.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#E0E0E0]">
                      New user{" "}
                      <span className="font-bold">{activity.name}</span> (
                      {activity.role}) was created.
                    </p>
                    <p className="mt-1 text-xs text-[rgba(224,224,224,0.6)]">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card flex flex-col p-6 lg:col-span-1">
            <h2 className="mb-4 text-xl font-semibold text-[#E0E0E0]">
              Quick Actions
            </h2>
            <div className="flex flex-col space-y-4">
              <button className="primary-btn">Manage Job Posts</button>
              <button className="secondary-btn">View Approvals</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
