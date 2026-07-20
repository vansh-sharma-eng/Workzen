// ============================================================
// leaveApi
// ------------------------------------------------------------
// Maps directly to LeaveController on the backend.
// ============================================================

import http from "./httpClient";

const leaveApi = {
  /** @param {{ managerId?: number }} [opts] - HR passes their own id to scope to just their team */
  async getAll(opts) {
    return http.get("/leaves", opts?.managerId ? { managerId: opts.managerId } : undefined);
  },

  /** @param {{ managerId?: number }} [opts] */
  async getPending(opts) {
    return http.get("/leaves/pending", opts?.managerId ? { managerId: opts.managerId } : undefined);
  },

  async getForEmployee(employeeId) {
    return http.get(`/leaves/employee/${employeeId}`);
  },

  /** This calendar year's balance (allocated/used/remaining) per leave type. */
  async getBalances(employeeId) {
    return http.get(`/leaves/employee/${employeeId}/balance`);
  },

  /** @param {{ type, fromDate, toDate, reason? }} data */
  async apply(employeeId, data) {
    return http.post(`/leaves/employee/${employeeId}`, data);
  },

  /** @param {"APPROVED"|"REJECTED"} status */
  async decide(leaveId, status) {
    return http.patch(`/leaves/${leaveId}/decision`, { status });
  },

  /** Withdraw your own still-pending request. */
  async cancel(leaveId) {
    return http.patch(`/leaves/${leaveId}/cancel`);
  },

  /** Admin-only: permanently remove a leave record. */
  async remove(leaveId) {
    return http.delete(`/leaves/${leaveId}`);
  },
};

export default leaveApi;
