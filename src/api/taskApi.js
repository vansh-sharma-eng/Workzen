// ============================================================
// taskApi
// ------------------------------------------------------------
// Maps directly to TaskController on the backend.
// ============================================================

import http from "./httpClient";

const taskApi = {
  /** @param {{ managerId?: number }} [opts] - HR passes their own id to scope to just their team */
  async getAll(opts) {
    return http.get("/tasks", opts?.managerId ? { managerId: opts.managerId } : undefined);
  },

  async getForEmployee(employeeId) {
    return http.get(`/tasks/employee/${employeeId}`);
  },

  async getById(id) {
    return http.get(`/tasks/${id}`);
  },

  /** @param {{ title, description?, assignedToId, priority?, dueDate? }} data */
  async create(data) {
    return http.post("/tasks", data);
  },

  /** @param {{ title?, description?, status?, priority?, dueDate? }} data */
  async update(id, data) {
    return http.put(`/tasks/${id}`, data);
  },

  async remove(id) {
    return http.delete(`/tasks/${id}`);
  },
};

export default taskApi;
