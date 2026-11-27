import "./App.css";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check existing login session
  const checkSession = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again.");
    } finally {
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", username.trim());
      formData.append("password", password);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Invalid username or password.");
        return;
      }

      // Fetch authenticated user details
      const userResponse = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!userResponse.ok) {
        setError("Login succeeded, but user details could not be loaded.");
        return;
      }

      const userData = await userResponse.json();

      setUser(userData);
      setPassword("");
      setSuccess("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    setError("");
    setSuccess("");

    try {
      const csrfResponse = await fetch(`${API_URL}/api/auth/csrf`, {
        credentials: "include",
      });

      if (!csrfResponse.ok) {
        throw new Error("Unable to get security token");
      }

      const csrfData = await csrfResponse.json();

      const logoutResponse = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          [csrfData.headerName]: csrfData.token,
        },
      });

      if (!logoutResponse.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
      setUsername("");
      setPassword("");
      setSuccess("Logged out successfully.");
    } catch (err) {
      console.error("Logout error:", err);
      setError("Unable to logout. Please try again.");
    }
  };

  if (checkingSession) {
    return <div className="loading-screen">Checking session...</div>;
  }

  // Dashboard
  if (user) {
    const role = user.role?.replace("ROLE_", "");

    const roleNames = {
      ADMIN: "Administrator",
      RECEPTIONIST: "Receptionist",
      DOCTOR: "Doctor",
    };

    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="brand">
            <div className="brand-icon">✚</div>
            <span>DentalCare ERP</span>
          </div>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </header>

        <main className="dashboard-content">
          <h1>Welcome, {user.username}!</h1>

          <p>
            You are logged in as <strong>{roleNames[role] || role}</strong>.
          </p>

          <div className="dashboard-card">
            <h2>{roleNames[role] || "User"} Dashboard</h2>
            <p>Authentication successful.</p>
            <p>
              Role: <strong>{user.role}</strong>
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Login page
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand">
          <div className="brand-icon">✚</div>
          <span>DentalCare ERP</span>
        </div>

        <div className="welcome-content">
          <span className="welcome-tag">CLINIC MANAGEMENT SYSTEM</span>

          <h1>
            Smarter Care.
            <br />
            Better Smiles.
          </h1>

          <p>
            Manage patients, appointments, treatments and billing — all in one
            place.
          </p>
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

          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />

            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="21"
                    height="21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 5.2A10.7 10.7 0 0112 5c5 0 9 4 10 7-0.4 1.3-1.3 2.5-2.5 3.5" />
                    <path d="M6.6 6.6C4.2 7.8 2.5 9.6 2 12c1 3 5 7 10 7 1.2 0 2.3-.2 3.3-.6" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="21"
                    height="21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {error && <p className="form-error">{error}</p>}

            {success && <p className="form-success">{success}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="forgot-note">
            Forgot password? Contact your administrator.
          </p>

          <p className="security-note">
            🔒 Your account is protected with secure authentication.
          </p>

          <div className="login-footer">
            © 2026 DentalCare ERP. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
