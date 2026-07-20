// ============================================================
// profileApi
// ------------------------------------------------------------
// Maps directly to ProfileController (/api/users/me) on the backend.
// ============================================================

import http from "./httpClient";

const profileApi = {
  async getProfile() {
    return http.get("/users/me");
  },

  /** @param {{ name?, department?, position? }} data */
  async updateProfile(data) {
    return http.put("/users/me", data);
  },

  /** @param {{ currentPassword, newPassword }} data */
  async changePassword(data) {
    return http.put("/users/me/password", data);
  },
};

export default profileApi;
