// ============================================================
// authApi
// ------------------------------------------------------------
// Maps directly to AuthController on the backend.
// ============================================================

import http, { setToken } from "./httpClient";

const authApi = {
  /** @param {string} email @param {string} password */
  async login(email, password) {
    const response = await http.post("/auth/login", { email, password });
    setToken(response.token);
    return response.user; // { id, name, email, role, department, position, active, createdAt }
  },

  /** Restores a session using the token already stored in localStorage. */
  async me() {
    return http.get("/auth/me");
  },

  logout() {
    setToken(null);
  },
};

export default authApi;
