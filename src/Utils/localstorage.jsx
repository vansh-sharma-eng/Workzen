<<<<<<< HEAD
// Utils/localstorage.js

const employeeData = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@example.com",
    password: "123",
    role: "employee",
  },
  {
    id: 2,
    name: "Aman",
    email: "aman@example.com",
    password: "123",
    role: "employee",
  },
];

const adminData = [
  {
    id: 100,
    name: "Admin",
    email: "admin@example.com",
    password: "123",
    role: "admin",
  },
];

const hrData = [
  {
    id: 200,
    name: "HR Manager",
    email: "hr@example.com",
    password: "123",
    role: "hr",
  },
];

export const setlocalstorage = () => {
  if (!localStorage.getItem("employeeData")) {
    localStorage.setItem(
      "employeeData",
      JSON.stringify(employeeData)
    );
  }

  if (!localStorage.getItem("adminData")) {
    localStorage.setItem(
      "adminData",
      JSON.stringify(adminData)
    );
  }

  if (!localStorage.getItem("hrData")) {
    localStorage.setItem(
      "hrData",
      JSON.stringify(hrData)
    );
=======
const employeeData = []

const admin = [
  {
    id: 100,
    Name: "Admin",
    email: "admin@example.com",
    password: "123"
  }
];

export const setlocalstorage = () => {

  if (!localStorage.getItem("employeeData")) {
    localStorage.setItem("employeeData", JSON.stringify(employeeData));
  }
  if (!localStorage.getItem("adminData")) {
    localStorage.setItem("adminData", JSON.stringify(admin));
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
  }
};

export const getlocalstorage = () => {
<<<<<<< HEAD
  const employeesData =
    JSON.parse(localStorage.getItem("employeeData")) || [];

  const adminData =
    JSON.parse(localStorage.getItem("adminData")) || [];

  const hrData =
    JSON.parse(localStorage.getItem("hrData")) || [];

  return {
    employeesData,
    adminData,
    hrData,
  };
=======
  const employeesData = JSON.parse(localStorage.getItem("employeeData"));
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  return { employeesData, adminData };
>>>>>>> 4c0bb986ca9169755b79d0cb8e8ae4cda7dd1b6a
};