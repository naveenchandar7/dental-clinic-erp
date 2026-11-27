import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest } from "../services/authService.js";

const AuthContext = createContext(null);
const STORAGE_KEY = "dentalcare_auth";

function readStoredAuth() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);

  const login = async (username, password) => {
    const data = await loginRequest(username, password);

    if (!data.token || !data.username || !data.role) {
      throw new Error("Invalid login response from server");
    }

    const normalizedRole = data.role.replace("ROLE_", "");
    const authData = {
      token: data.token,
      username: data.username,
      role: normalizedRole,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
    setAuth(authData);
    return authData;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  };

  const value = useMemo(
    () => ({ auth, login, logout, isAuthenticated: Boolean(auth?.token) }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
