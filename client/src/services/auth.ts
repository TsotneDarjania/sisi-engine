// services/auth.ts

export async function userRegister(
  email: string,
  username: string,
  password: string
) {
  const res = await fetch("http://localhost:9001/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔔 Important: include credentials for cookies
    body: JSON.stringify({ email, username, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

export async function userLogin(email: string, password: string) {
  const res = await fetch("http://localhost:9001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔔 Important: include credentials for cookies
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function userLogout() {
  const res = await fetch("http://localhost:9001/api/auth/logout", {
    method: "POST",
    credentials: "include", // Ensure cookies are sent so server can clear them
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Logout failed");
  }

  window.location.reload();
}
