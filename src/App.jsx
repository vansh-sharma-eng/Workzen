import React, { useEffect, useState } from "react";
import Login from "./Components/Auth/login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import HRDashboard from "./Components/Dashboard/HRDashboard";
import { setlocalstorage, getlocalstorage } from "./Utils/localstorage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

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

    if (role === "hr") {
      setUser("hr");
      setLoggedInUser(data);
      return;
    }

    if (role === "employee") {
      const { employeesData } = getlocalstorage();

      const freshEmployee = employeesData?.find(
        (emp) => emp.email === data.email
      );

      if (freshEmployee) {
        setUser("employee");
        setLoggedInUser(freshEmployee);

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            role: "employee",
            data: freshEmployee,
          })
        );
      }
    }
  }, []);

  const handlelogin = (email, password) => {
    const { employeesData, adminData, hrData } = getlocalstorage();

    const adminMatch = adminData?.find(
      (admin) =>
        admin.email === email &&
        admin.password === password
    );

    if (adminMatch) {
      setUser("admin");
      setLoggedInUser(adminMatch);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: "admin",
          data: adminMatch,
        })
      );
      return;
    }

    const hrMatch = hrData?.find(
      (hr) =>
        hr.email === email &&
        hr.password === password
    );

    if (hrMatch) {
      setUser("hr");
      setLoggedInUser(hrMatch);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: "hr",
          data: hrMatch,
        })
      );
      return;
    }

    const employeeMatch = employeesData?.find(
      (employee) =>
        employee.email === email &&
        employee.password === password
    );

    if (employeeMatch) {
      setUser("employee");
      setLoggedInUser(employeeMatch);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: "employee",
          data: employeeMatch,
        })
      );
      return;
    }

    alert("Invalid Email or Password");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setLoggedInUser(null);
  };

  return (
    <>
      {!user && (
        <Login handlelogin={handlelogin} />
      )}

      {user === "admin" && (
        <AdminDashboard
          changeuser={setUser}
          data={loggedInUser}
          handleLogout={handleLogout}
          setCurrentPage={setCurrentPage}
        />
      )}

      {user === "hr" && loggedInUser && (
        <HRDashboard
          changeuser={setUser}
          data={loggedInUser}
          handleLogout={handleLogout}
          setCurrentPage={setCurrentPage}
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