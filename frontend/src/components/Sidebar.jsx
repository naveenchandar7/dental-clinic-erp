import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const menus = {
  ADMIN: [
    { section: "OVERVIEW", items: [{ label: "Dashboard", path: "/admin", icon: "▦", end: true }] },
    { section: "CLINIC OPERATIONS", items: [
      { label: "Patients", path: "/admin/patients", icon: "♙" },
      { label: "Appointments", path: "/admin/appointments", icon: "▣" },
      { label: "Doctors & Staff", path: "/admin/staff", icon: "♧" },
      { label: "Treatments", path: "/admin/treatments", icon: "✚" }
    ]},
    { section: "FINANCE", items: [
      { label: "Billing & Invoices", path: "/admin/billing", icon: "₹" },
      { label: "Payment History", path: "/admin/payments", icon: "↔" },
      { label: "Outstanding Payments", path: "/admin/outstanding", icon: "◷" }
    ]},
    { section: "ADMINISTRATION", items: [
      { label: "Reports & Analytics", path: "/admin/reports", icon: "▤" },
      { label: "User Management", path: "/admin/users", icon: "♙" },
      { label: "Audit Logs", path: "/admin/audit-logs", icon: "☷" },
      { label: "Settings", path: "/admin/settings", icon: "⚙" }
    ]}
  ],
  RECEPTIONIST: [
    { section: "WORKSPACE", items: [
      { label: "Dashboard", path: "/reception", icon: "▦", end: true },
      { label: "Patients", path: "/reception/patients", icon: "♙" },
      { label: "Appointments", path: "/reception/appointments", icon: "▣" },
      { label: "Billing & Payments", path: "/reception/billing", icon: "₹" },
      { label: "Payment History", path: "/reception/payments", icon: "↔" }
    ]}
  ],
  DOCTOR: [
    { section: "CLINICAL WORKSPACE", items: [
      { label: "Dashboard", path: "/doctor", icon: "▦", end: true },
      { label: "My Appointments", path: "/doctor/appointments", icon: "▣" },
      { label: "My Patients", path: "/doctor/patients", icon: "♙" },
      { label: "Treatment Records", path: "/doctor/treatments", icon: "✚" },
      { label: "Follow-ups", path: "/doctor/follow-ups", icon: "◷" }
    ]}
  ]
};

function Sidebar({ collapsed }) {
  const { auth } = useAuth();
  const sections = menus[auth?.role] || [];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {sections.map((section) => (
        <div className="sidebar-section" key={section.section}>
          {!collapsed && <h3>{section.section}</h3>}
          <nav>
            {section.items.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.end}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;