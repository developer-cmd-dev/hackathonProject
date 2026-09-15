export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "google";
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
  message?: string;
};

const apiBase = "http://localhost:8080";

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const body = (await response.json()) as T & { message?: string };
  if (!response.ok) throw new Error(body.message ?? "Request failed");
  return body;
}

export function loginWithGoogle(idToken: string) {
  return request<AuthResponse>("/api/auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken }),
  });
}
