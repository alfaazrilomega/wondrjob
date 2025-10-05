"use client";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">WondrJob Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active">
              <a href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="#">User Management</a>
            </li>
            <li className="nav-item">
              <a href="#">Job Postings</a>
            </li>
            <li className="nav-item">
              <a href="#">Company Profiles</a>
            </li>
            <li className="nav-separator"></li>
            <li className="nav-item">
              <a href="#">Simulate: HRD View</a>
            </li>
            <li className="nav-item">
              <a href="#">Simulate: Company View</a>
            </li>
            <li className="nav-item">
              <a href="#">Simulate: Society View</a>
            </li>
            <li className="nav-separator"></li>
            <li className="nav-item">
              <a href="#">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <div className="bento-grid">
          <div className="card create-user-card">
            <h3>Make User</h3>
            <form>
              <input type="text" placeholder="User Name / Email" />
              <input type="password" placeholder="Temporary Password" />
              <select>
                <option>Admin</option>
                <option>HRD</option>
                <option>Company</option>
                <option>Society</option>
              </select>
              <button type="submit">Create User</button>
            </form>
          </div>
          <div className="card system-overview-card">
            <div className="overview-widget">
              <span className="overview-number">1,482</span>
              <span className="overview-label">Total Users</span>
            </div>
            <div className="overview-widget">
              <span className="overview-number">75</span>
              <span className="overview-label">New Users (24h)</span>
            </div>
            <div className="overview-widget">
              <span className="overview-number">3,201</span>
              <span className="overview-label">Total Jobs</span>
            </div>
          </div>
          <div className="card recent-activity-card">
            <h3>Recent Activity</h3>
            <ul>
              <li>New user `&apos;`John Doe`&apos;` (HRD) was created.</li>
              <li>
                Job posting `&apos;`Senior Developer`&apos;` was approved.
              </li>
              <li>Company `&apos;`TechCorp`&apos;` updated their profile.</li>
            </ul>
          </div>
          <div className="card quick-actions-card">
            <h3>Quick Actions</h3>
            <button>Manage Job Posts</button>
            <button>View Approvals</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
