// ============================================================
// settingsApi
// ------------------------------------------------------------
// Maps directly to OfficeLocationController on the backend.
// ============================================================

import http from "./httpClient";

const settingsApi = {
  async getOfficeLocations() {
    return http.get("/settings/office-locations");
  },

  /** Admin-only. @param {{ name, latitude, longitude, radiusMeters }} data */
  async createOfficeLocation(data) {
    return http.post("/settings/office-locations", data);
  },

  /** Admin-only. @param {{ name, latitude, longitude, radiusMeters }} data */
  async updateOfficeLocation(id, data) {
    return http.put(`/settings/office-locations/${id}`, data);
  },

  /** Admin-only. */
  async deleteOfficeLocation(id) {
    return http.delete(`/settings/office-locations/${id}`);
  },

  async getLeaveAllocations() {
    return http.get("/settings/leave-allocations");
  },

  /** Admin-only. @param {"SICK"|"CASUAL"|"PAID"} leaveType */
  async updateLeaveAllocation(leaveType, annualDays) {
    return http.put(`/settings/leave-allocations/${leaveType}`, { annualDays });
  },
};

export default settingsApi;
