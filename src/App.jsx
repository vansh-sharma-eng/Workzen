// App.jsx
import React, { useContext, useEffect, useState } from "react";
import Login from "./Components/Auth/login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import { AuthContext } from "./Components/Context/AuthProvider";
import { setlocalstorage, getlocalstorage } from "./Utils/localstorage";
import AdminEmployeesPage from "./Pages/AdminEmployeesPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setlocalstorage();
    const storedSession = localStorage.getItem("loggedInUser");
    if (!storedSession) return;

    const { role, data } = JSON.parse(storedSession);

    if (role === "admin") {
      setUser("admin");
      setLoggedInUser(data);
      return;
    }

    if (role === "employee") {
      const { employeesData } = getlocalstorage();
      const freshEmployee = employeesData?.find((e) => e.email === data.email);

      if (freshEmployee) {
        setUser("employee");
        setLoggedInUser(freshEmployee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: freshEmployee })
        );
      } else {
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  function handlelogin(email, password) {
    const { employeesData, adminData } = getlocalstorage();
    const adminMatch = adminData?.find(
      (a) => a.email === email && a.password === password
    );

    if (adminMatch) {
      setUser("admin");
      setLoggedInUser(adminMatch);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "admin", data: adminMatch })
      );
      return;
    }

    const employeeMatch = employeesData?.find(
      (e) => e.email === email && e.password === password
    );

    if (employeeMatch) {
      setUser("employee");
      setLoggedInUser(employeeMatch);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "employee", data: employeeMatch })
      );
      return;
    }

    alert("Invalid email or password");
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setLoggedInUser(null);
  }

  return (
    <>
     {!user && <Login handlelogin={handlelogin} />}
      {user === "admin" && (
        <AdminDashboard
          changeuser={setUser}
          data={loggedInUser}
          handleLogout={handleLogout}
        />
      )}
      {user === "employee" && loggedInUser && (
        <EmployeeDashboard
          changeuser={setUser}
          data={loggedInUser}
          handleLogout={handleLogout}
        />
      )} 
    </>
  );
};

export default App;