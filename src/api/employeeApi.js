// ============================================================
// employeeApi
// ------------------------------------------------------------
// Maps directly to EmployeeController on the backend.
// ============================================================

import http from "./httpClient";

const employeeApi = {
  /**
   * @param {"ADMIN"|"HR"|"EMPLOYEE"} [role]
   * @param {{ managerId?: number }} [opts] - managerId scopes results to one HR's team
   */
  async getAll(role, opts) {
    const query = { ...(role ? { role } : {}), ...(opts?.managerId ? { managerId: opts.managerId } : {}) };
    return http.get("/employees", Object.keys(query).length ? query : undefined);
  },

  /** Employees belonging to a given HR's team. */
  async getByManager(managerId) {
    return http.get("/employees", { managerId });
  },

  async getById(id) {
    return http.get(`/employees/${id}`);
  },

  /**
   * Admin-only endpoint. @param {{ name, email, password, role, department, position, salary?, managerId? }} data
   * Salary and managerId (team assignment) only take effect when the caller is ADMIN.
   */
  async create(data) {
    return http.post("/employees", data);
  },

  /** @param {{ name?, department?, position?, active?, salary?, managerId? }} data */
  async update(id, data) {
    return http.put(`/employees/${id}`, data);
  },

  /** Admin-only. @param {"ADMIN"|"HR"|"EMPLOYEE"} role */
  async updateRole(id, role) {
    return http.patch(`/employees/${id}/role`, { role });
  },

  /** Admin/HR-only. Returns { temporaryPassword } — shown once, never stored client-side either. */
  async resetPassword(id) {
    return http.post(`/employees/${id}/reset-password`);
  },

  async remove(id) {
    return http.delete(`/employees/${id}`);
  },
};

export default employeeApi;
