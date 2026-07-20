import React, { createContext, useCallback, useEffect, useState } from "react";
import { employeeApi } from "../../api";
import { getToken } from "../../api/httpClient";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

/**
 * Normalizes a backend UserDto ({ id, name, email, role, department,
 * position, active, createdAt }) into the shape older components expect
 * ({ isActive }, plus a `leaveStatus` placeholder). Real per-employee leave
 * status now lives in the Leave resource (see api/leaveApi.js) rather than
 * being embedded on the user record — cross-referencing that is a
 * follow-up if precise "on leave today" counts are needed everywhere.
 */
const normalizeEmployee = (user) => ({
  ...user,
  isActive: user.active,
  leaveStatus: "none",
  tasks: [],
});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    employeesData: [],
    adminData: [],
    hrData: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshData = useCallback(async () => {
    // These endpoints require an authenticated ADMIN/HR token. If nobody is
    // logged in yet (or the current user is an employee without list
    // access), just leave the lists empty instead of throwing.
    if (!getToken()) return;

    setLoading(true);
    setError(null);
    try {
      const [employees, admins, hr] = await Promise.all([
        employeeApi.getAll("EMPLOYEE").catch(() => []),
        employeeApi.getAll("ADMIN").catch(() => []),
        employeeApi.getAll("HR").catch(() => []),
      ]);

      setUserData({
        employeesData: employees.map(normalizeEmployee),
        adminData: admins,
        hrData: hr,
      });
    } catch (err) {
      setError(err.message || "Failed to load employee data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Intentional fetch-on-mount: refreshData is also exposed for manual use
    // (e.g. after login, or after creating/updating an employee).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshData();
  }, [refreshData]);

  return (
    <AuthContext.Provider value={{ userData, setUserData, refreshData, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
