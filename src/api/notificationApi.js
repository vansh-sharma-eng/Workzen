// ============================================================
// notificationApi
// ------------------------------------------------------------
// Maps directly to NotificationController on the backend.
// ============================================================

import http from "./httpClient";

const notificationApi = {
  async getAll() {
    return http.get("/notifications");
  },

  async getUnreadCount() {
    return http.get("/notifications/unread-count");
  },

  async markRead(id) {
    return http.patch(`/notifications/${id}/read`);
  },

  async markAllRead() {
    return http.patch("/notifications/read-all");
  },
};

export default notificationApi;
