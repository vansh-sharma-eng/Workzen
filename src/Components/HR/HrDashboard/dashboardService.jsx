// Temporary service layer
// Later replace with axios API calls

import {
  statsCards,
  attendanceData,
  departmentStrength,
  pendingActions,
  recentActivities,
} from "../data/hrDashboardData";

const dashboardService = {
  getStats() {
    return Promise.resolve(statsCards);
  },

  getAttendance() {
    return Promise.resolve(attendanceData);
  },

  getDepartments() {
    return Promise.resolve(departmentStrength);
  },

  getPendingActions() {
    return Promise.resolve(pendingActions);
  },

  getRecentActivities() {
    return Promise.resolve(recentActivities);
  },
};

export default dashboardService;