// ============================================================
// wfhApi
// ------------------------------------------------------------
// Maps directly to WfhRequestController on the backend.
// ============================================================

import http from "./httpClient";

const wfhApi = {
  /** @param {{ managerId?: number }} [opts] - HR passes their own id to scope to just their team */
  async getAll(opts) {
    return http.get("/wfh-requests", opts?.managerId ? { managerId: opts.managerId } : undefined);
  },

  /** @param {{ managerId?: number }} [opts] */
  async getPending(opts) {
    return http.get("/wfh-requests/pending", opts?.managerId ? { managerId: opts.managerId } : undefined);
  },

  async getForEmployee(employeeId) {
    return http.get(`/wfh-requests/employee/${employeeId}`);
  },

  /** @param {{ date, reason? }} data */
  async apply(employeeId, data) {
    return http.post(`/wfh-requests/employee/${employeeId}`, data);
  },

  /** @param {"APPROVED"|"REJECTED"} status */
  async decide(requestId, status) {
    return http.patch(`/wfh-requests/${requestId}/decision`, { status });
  },
};

export default wfhApi;
