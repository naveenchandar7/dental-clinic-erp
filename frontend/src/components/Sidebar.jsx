import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const menus = {
  ADMIN: [
    { label: "Dashboard", path: "/admin", end: true },
    { label: "Patients", path: "/admin/patients" },
    { label: "Appointments", path: "/admin/appointments" },
    { label: "Billing", path: "/admin/billing" },
    { label: "User Management", path: "/admin/users" },
  ],
  RECEPTIONIST: [
    { label: "Dashboard", path: "/reception", end: true },
    { label: "Patients", path: "/reception/patients" },
    { label: "Appointments", path: "/reception/appointments" },
    { label: "Billing", path: "/reception/billing" },
  ],
  DOCTOR: [
    { label: "Dashboard", path: "/doctor", end: true },
    { label: "My Appointments", path: "/doctor/appointments" },
    { label: "Patient Records", path: "/doctor/patients" },
    { label: "Treatments", path: "/doctor/treatments" },
  ],
};

function Sidebar() {
  const { auth } = useAuth();
  const role = auth?.role;
  const roleMenus = menus[role] || [];

  return (
    <aside className="sidebar">
      <h3>{role} MENU</h3>
      <nav>
        {roleMenus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
