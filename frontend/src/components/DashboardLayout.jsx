import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-container">
      <Navbar onToggleSidebar={() => setCollapsed((current) => !current)} />
      <div className={`app-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
        <Sidebar collapsed={collapsed} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;