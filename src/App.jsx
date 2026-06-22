<<<<<<< HEAD
=======
// App.jsx
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
import React, { useContext, useEffect, useState } from "react";
import Login from "./Components/Auth/login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import { AuthContext } from "./Components/Context/AuthProvider";
import { setlocalstorage, getlocalstorage } from "./Utils/localstorage";
<<<<<<< HEAD
import AdminEmployeesPage from "./Pages/AdminPages/AdminEmployeesPage";
import HRDashboard from "./Components/Dashboard/HRDashboard";
=======
import AdminEmployeesPage from "./Pages/AdminEmployeesPage";
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
<<<<<<< HEAD
const [currentPage, setCurrentPage] = useState("dashboard");
=======

>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
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
<<<<<<< HEAD
if (role === "hr") {
  setUser("hr");
  setLoggedInUser(data);
  return;
}
=======

>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
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

<<<<<<< HEAD
 function handlelogin(email, password) {
  const { employeesData, adminData, hrData } =
    getlocalstorage();

  // Admin Login
  const adminMatch = adminData.find(
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

  // HR Login
  const hrMatch = hrData.find(
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

  // Employee Login
  const employeeMatch = employeesData.find(
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
}
=======
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

>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setLoggedInUser(null);
  }

<<<<<<< HEAD
 
    return (
  <>
    {!user && <Login handlelogin={handlelogin} />}

    {user === "admin" &&
      currentPage === "dashboard" && (
=======
  return (
    <>
     {!user && <Login handlelogin={handlelogin} />}
      {user === "admin" && (
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
        <AdminDashboard
          changeuser={setUser}
          data={loggedInUser}
          handleLogout={handleLogout}
<<<<<<< HEAD
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
    
  {user === "hr" && loggedInUser && (
    <HRDashboard
    changeuser={setUser}
      data={loggedInUser}
      handleLogout={handleLogout}
    />
  )}
    
  </>

=======
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
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
  );
};

export default App;