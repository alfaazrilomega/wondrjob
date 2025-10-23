"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/create-user", label: "User Management" },
    { href: "/admin/job-postings", label: "Job Postings" },
    { href: "/admin/company", label: "Company Profiles" },
  ];

  const simulationItems = [
    { href: "/admin/simulate/hrd", label: "Simulate: HRD View" },
    { href: "/admin/simulate/company", label: "Simulate: Company View" },
    { href: "/admin/simulate/society", label: "Simulate: Society View" },
  ];

  const settingsItem = { href: "/admin/settings", label: "Settings" };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">WondrJob Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin/company"
                  ? pathname.startsWith(item.href)
                  : pathname === item.href;
              return (
                <li
                  key={item.label}
                  className={`nav-item ${isActive ? "active" : ""}`}
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              );
            })}
            <li className="nav-separator"></li>
            {simulationItems.map((item) => (
              <li key={item.label} className="nav-item">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li className="nav-separator"></li>
            <li
              className={`nav-item ${pathname === settingsItem.href ? "active" : ""}`}
            >
              <Link href={settingsItem.href}>{settingsItem.label}</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
