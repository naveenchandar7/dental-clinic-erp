import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // JWT is stateless; logout removes the token from this browser tab.
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="dashboard-header">
      <div className="brand">
        <div className="brand-icon">✚</div>
        <span>DentalCare ERP</span>
      </div>

      <div className="navbar-user">
        <span>{auth?.username} ({auth?.role})</span>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
