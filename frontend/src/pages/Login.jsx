import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

const rolePaths = {
  ADMIN: "/admin",
  RECEPTIONIST: "/reception",
  DOCTOR: "/doctor",
};

function Login() {
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (auth?.token && rolePaths[auth.role]) {
    return <Navigate to={rolePaths[auth.role]} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(username, password);
      setPassword("");

      // Frontend role-based navigation after the single login API call.
      if (user.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else if (user.role === "RECEPTIONIST") {
        navigate("/reception", { replace: true });
      } else if (user.role === "DOCTOR") {
        navigate("/doctor", { replace: true });
      } else {
        setError("Your account does not have a supported role.");
      }
    } catch (err) {
      setError(err.message || "Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand">
          <div className="brand-icon">✚</div>
          <span>DentalCare ERP</span>
        </div>

        <div className="welcome-content">
          <span className="welcome-tag">CLINIC MANAGEMENT SYSTEM</span>
          <h1>Smarter Care.<br />Better Smiles.</h1>
          <p>Manage patients, appointments, treatments and billing — all in one place.</p>
        </div>

        <div className="left-footer">Secure Clinic Management Platform</div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="mobile-brand">
            <div className="brand-icon">✚</div>
            DentalCare ERP
          </div>

          <h2>Welcome Back!</h2>
          <p className="login-subtitle">Please login to your account</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

            {error && <p className="form-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="forgot-note">Forgot password? Contact your administrator.</p>
          <p className="security-note">🔒 Your account is protected with secure authentication.</p>
          <div className="login-footer">© 2026 DentalCare ERP. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
