import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar({ onToggleSidebar }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const displayName = auth?.fullName || auth?.username || "User";

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>
        <div className="brand">
          <div className="brand-icon">✚</div>
          <span>DentalCare ERP</span>
        </div>
      </div>
      <div className="navbar-user">
        <div className="user-avatar">{displayName.charAt(0).toUpperCase()}</div>
        <div className="user-details">
          <strong>{displayName}</strong>
          <span>{auth?.role}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </header>
  );
}

export default Navbar;