import React from 'react'
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import TrafficSource from "../components/TrafficSource";
import { Users, Building2 } from "lucide-react";

const AdminDashboard = () => {
  const location = useLocation();
  const isDashboardIndex = location.pathname === '/admin-dashboard';

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header />

        {isDashboardIndex && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Employees" value="24" icon={Users} />
              <StatCard title="Total Departments" value="5" icon={Building2} />
              <StatCard title="Task Progress" value="75.5%" progress />
              <StatCard title="Total Profit" value="$15k" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SalesChart />
              <TrafficSource />
            </div>
          </>
        )}
        <Outlet />
      </ main>
    </div>
  );
};

export default AdminDashboard
