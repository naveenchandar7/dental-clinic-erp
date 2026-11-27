import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ReceptionDashboard from "./pages/reception/ReceptionDashboard.jsx";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";

import DashboardHome from "./pages/DashboardHome.jsx";
import ModulePage from "./pages/ModulePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<DashboardHome title="Admin Dashboard" />} />
          <Route path="patients" element={<ModulePage title="Patient Management" />} />
          <Route path="appointments" element={<ModulePage title="Appointments" />} />
          <Route path="billing" element={<ModulePage title="Billing" />} />
          <Route path="users" element={<ModulePage title="User Management" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["RECEPTIONIST"]} />}>
        <Route path="/reception" element={<ReceptionDashboard />}>
          <Route index element={<DashboardHome title="Reception Dashboard" />} />
          <Route path="patients" element={<ModulePage title="Patient Registration" />} />
          <Route path="appointments" element={<ModulePage title="Appointments" />} />
          <Route path="billing" element={<ModulePage title="Billing" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
        <Route path="/doctor" element={<DoctorDashboard />}>
          <Route index element={<DashboardHome title="Doctor Dashboard" />} />
          <Route path="appointments" element={<ModulePage title="My Appointments" />} />
          <Route path="patients" element={<ModulePage title="Patient Records" />} />
          <Route path="treatments" element={<ModulePage title="Treatments" />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
