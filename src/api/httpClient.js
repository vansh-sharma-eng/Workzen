// ============================================================
// httpClient
// ------------------------------------------------------------
// Single fetch() wrapper every API module goes through. Adds the
// backend base URL, JSON headers, the JWT auth header, and turns
// non-2xx responses into thrown errors with the backend's own
// error message (see GlobalExceptionHandler on the backend).
//
// Uses native fetch — no extra dependency needed.
// ============================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const TOKEN_STORAGE_KEY = "workzen_token";

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

/**
 * @param {string} path - e.g. "/employees", "/tasks/employee/3"
 * @param {RequestInit & { query?: Record<string, string|number|undefined> }} [options]
 */
export async function apiRequest(path, options = {}) {
  const { query, headers, body, ...rest } = options;

  let url = `${API_BASE_URL}${path}`;
  if (query) {
    const params = new URLSearchParams(
      Object.entries(query).filter(([, v]) => v !== undefined && v !== null)
    );
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
  }

  const token = getToken();
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const finalHeaders = {
    ...(body && !isFormData ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  let response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: finalHeaders,
      body,
    });
  } catch {
    throw new Error(
      "Couldn't reach the Workzen backend. Is it running at " + API_BASE_URL + "?"
    );
  }

  if (response.status === 204) return null;

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = payload?.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const http = {
  get: (path, query) => apiRequest(path, { method: "GET", query }),
  post: (path, body) => apiRequest(path, { method: "POST", body: body !== undefined ? JSON.stringify(body) : undefined }),
  /** For file uploads: pass a FormData instance directly, no JSON.stringify. */
  postForm: (path, formData) => apiRequest(path, { method: "POST", body: formData }),
  put: (path, body) => apiRequest(path, { method: "PUT", body: body !== undefined ? JSON.stringify(body) : undefined }),
  patch: (path, body) => apiRequest(path, { method: "PATCH", body: body !== undefined ? JSON.stringify(body) : undefined }),
  delete: (path) => apiRequest(path, { method: "DELETE" }),
};

export default http;
