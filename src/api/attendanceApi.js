// ============================================================
// attendanceApi
// ------------------------------------------------------------
// Maps directly to AttendanceController on the backend.
// ============================================================

import http from "./httpClient";

const attendanceApi = {
  async getForEmployee(employeeId) {
    return http.get(`/attendance/employee/${employeeId}`);
  },

  /** @param {string} date - "YYYY-MM-DD" @param {{ managerId?: number }} [opts] - HR passes their own id to scope to just their team */
  async getForDate(date, opts) {
    return http.get("/attendance", opts?.managerId ? { date, managerId: opts.managerId } : { date });
  },

  /** @param {string} date - "YYYY-MM-DD" @param {{ managerId?: number }} [opts] */
  async getStats(date, opts) {
    return http.get("/attendance/stats", opts?.managerId ? { date, managerId: opts.managerId } : { date });
  },

  /** @param {{ employeeId, date, status, checkIn?, checkOut? }} data */
  async mark(data) {
    return http.post("/attendance/mark", data);
  },

  /** @param {{ latitude, longitude, officeLocationId }} [data] - omit entirely when punching in on an approved WFH day. */
  async punchIn(data) {
    return http.post("/attendance/punch-in", data || {});
  },

  async punchOut() {
    return http.post("/attendance/punch-out", {});
  },
};

export default attendanceApi;
