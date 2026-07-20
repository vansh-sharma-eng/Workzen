import React, { useContext, useEffect, useState } from "react";
import Login from "./Components/Auth/Login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import HRDashboard from "./Components/Dashboard/HRDashboard";
import { authApi } from "./api";
import { getToken, setToken } from "./api/httpClient";
import { AuthContext } from "./Components/Context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null); // "admin" | "hr" | "employee" | null
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [, setCurrentPage] = useState("dashboard");
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginError, setLoginError] = useState("");
  const { refreshData } = useContext(AuthContext);

  // On app load, if a token is already stored, validate it against the
  // backend and restore the session instead of trusting localStorage data.
  useEffect(() => {
    const restoreSession = async () => {
      if (!getToken()) {
        setCheckingSession(false);
        return;
      }

      try {
        const profile = await authApi.me();
        setUser(profile.role.toLowerCase());
        setLoggedInUser(profile);
        refreshData();
      } catch {
        // Token invalid/expired — clear it and fall back to the login screen.
        setToken(null);
      } finally {
        setCheckingSession(false);
      }
    };

    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlelogin = async (email, password) => {
    setLoginError("");
    try {
      const profile = await authApi.login(email, password);
      setUser(profile.role.toLowerCase());
      setLoggedInUser(profile);
      refreshData();
    } catch (err) {
      setLoginError(err.message || "Invalid Email or Password");
    }
  };

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    setLoggedInUser(null);
  };

  if (checkingSession) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0d0f14] text-[#93c5fd] text-sm">
        Loading Workzen…
      </div>
    );
  }

  return (
    <>
      {!user && <Login handlelogin={handlelogin} loginError={loginError} />}

      {user === "admin" && (
        <AdminDashboard
          changeuser={setUser}
          data={loggedInUser}
          handleLogout={handleLogout}
          setCurrentPage={setCurrentPage}
          onUserUpdate={setLoggedInUser}
        />
      )}

      {user === "hr" && loggedInUser && (
        <HRDashboard
          changeuser={setUser}
          data={loggedInUser}
          handleLogout={handleLogout}
          setCurrentPage={setCurrentPage}
          onUserUpdate={setLoggedInUser}
        />
      )}

      {user === "employee" && loggedInUser && (
        <EmployeeDashboard
          changeuser={setUser}
          data={loggedInUser}
          handleLogout={handleLogout}
          onUserUpdate={setLoggedInUser}
        />
      )}
    </>
  );
};

export default App;
