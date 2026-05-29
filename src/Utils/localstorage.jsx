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
  }
};

export const getlocalstorage = () => {
  const employeesData = JSON.parse(localStorage.getItem("employeeData"));
  const adminData = JSON.parse(localStorage.getItem("adminData"));
  return { employeesData, adminData };
};