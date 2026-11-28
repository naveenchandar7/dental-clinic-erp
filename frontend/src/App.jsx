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
          <Route index element={<DashboardHome />} />
          {["patients","appointments","staff","treatments","billing","payments","outstanding","reports","users","audit-logs","settings"].map((path) => (
            <Route key={path} path={path} element={<ModulePage title={path.replaceAll("-", " ").replace(/\\b\\w/g, (letter) => letter.toUpperCase())} />} />
          ))}
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["RECEPTIONIST"]} />}>
        <Route path="/reception" element={<ReceptionDashboard />}>
          <Route index element={<DashboardHome />} />
          {["patients","appointments","billing","payments"].map((path) => (
            <Route key={path} path={path} element={<ModulePage title={path.replaceAll("-", " ").replace(/\\b\\w/g, (letter) => letter.toUpperCase())} />} />
          ))}
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
        <Route path="/doctor" element={<DoctorDashboard />}>
          <Route index element={<DashboardHome />} />
          {["appointments","patients","treatments","follow-ups"].map((path) => (
            <Route key={path} path={path} element={<ModulePage title={path.replaceAll("-", " ").replace(/\\b\\w/g, (letter) => letter.toUpperCase())} />} />
          ))}
        </Route>
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
