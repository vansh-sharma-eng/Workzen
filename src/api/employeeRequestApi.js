// ============================================================
// employeeRequestApi
// ------------------------------------------------------------
// Maps directly to EmployeeRequestController on the backend.
// HR submits "add employee" requests; admin approves/rejects them.
// ============================================================

import http from "./httpClient";

const employeeRequestApi = {
  /** HR only. @param {{ name, email, password, department, position }} data */
  async submit(data) {
    return http.post("/employee-requests", data);
  },

  /** Admin only. @param {"PENDING"|"APPROVED"|"REJECTED"} [status] */
  async getAll(status) {
    return http.get("/employee-requests", status ? { status } : undefined);
  },

  /** HR only — the requests they've personally submitted. */
  async getMine() {
    return http.get("/employee-requests/mine");
  },

  /** Admin only. @param {number} id @param {{ salary?: number }} [data] */
  async approve(id, data) {
    return http.post(`/employee-requests/${id}/approve`, data || {});
  },

  /** Admin only. @param {number} id @param {{ reason?: string }} [data] */
  async reject(id, data) {
    return http.post(`/employee-requests/${id}/reject`, data || {});
  },
};

export default employeeRequestApi;
