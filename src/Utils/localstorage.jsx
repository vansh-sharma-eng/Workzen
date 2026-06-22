// Utils/localstorage.jsx

const employeeData = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@example.com",
    password: "123",
    role: "employee",
    tasks: [],
    taskNumber: {
      total: 0,
      completed: 0,
      inProgress: 0,
      failed: 0,
      newTask: 0,
    },
  },
  {
    id: 2,
    name: "Aman",
    email: "aman@example.com",
    password: "123",
    role: "employee",
    tasks: [],
    taskNumber: {
      total: 0,
      completed: 0,
      inProgress: 0,
      failed: 0,
      newTask: 0,
    },
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
  }
};

export const getlocalstorage = () => {
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
};