const API_URL = "http://localhost:8080";

export async function loginRequest(username, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.trim(),
      password,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Invalid username or password");
  }

  return data;
}

export function getAuthHeaders() {
  const stored = sessionStorage.getItem("dentalcare_auth");
  const auth = stored ? JSON.parse(stored) : null;

  return auth?.token
    ? { Authorization: `Bearer ${auth.token}` }
    : {};
}
