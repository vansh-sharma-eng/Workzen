# WorkZen

A role-based employee and task management web application built with React. Admins can manage employees and assign tasks. Employees can track and update their own tasks — all from a single login page.

---

## Features

### Admin
- View dashboard with total employees, tasks, completion rate and in-progress count
- Add and manage employees
- Create and assign tasks to employees
- Monitor team performance across all employees

### Employee
- View personal task dashboard
- Accept or reject new tasks
- Mark tasks as completed or failed
- Reopen tasks when needed
- Real-time task counters (new, in-progress, completed, failed)

---

## Tech Stack

| Technology | Usage |
|---|---|
| React | Frontend UI |
| Tailwind CSS | Styling |
| LocalStorage | Data persistence |
| React Router | Page navigation |
| Context API | Global auth state |

---

## Project Structure

```
src/
├── Components/
│   ├── Auth/
│   │   └── Login.jsx
│   ├── Dashboard/
│   │   ├── AdminDashboard.jsx
│   │   └── EmployeeDashboard.jsx
│   ├── layout/
│   │   ├── AdminHeader.jsx
│   │   ├── AdminSidebar.jsx
│   │   ├── EmployeeHeader.jsx
│   │   └── EmployeeSidebar.jsx
│   ├── employees/
│   │   ├── AdminCards.jsx
│   │   ├── AdminTeamPerformance.jsx
│   │   ├── AdminEmployeeMessages.jsx
│   │   └── CreateEmployee.jsx
│   ├── tasks/
│   │   ├── CreateTask.jsx
│   │   ├── FilterTask.jsx
│   │   ├── EmployeeTask.jsx
│   │   ├── EmployeeAllTask.jsx
│   │   └── TaskNumber.jsx
│   └── Context/
│       └── AuthProvider.jsx
├── Pages/
│   ├── LoginPage.jsx
│   ├── AdminOverviewPage.jsx
│   ├── AdminEmployeesPage.jsx
│   ├── AdminTasksPage.jsx
│   └── EmployeeDashboardPage.jsx
├── utils/
│   └── localstorage.js
├── App.jsx
├── App.css
└── index.css
```

---

## Getting Started

### Prerequisites
- Node.js v18 or above
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/workzen.git

# Go into the project folder
cd workzen

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## How Login Works

Both admin and employee use the **same login page**. The app checks the entered email and password against stored data and redirects based on role.

```
Admin    → enters admin email + password → goes to Admin Dashboard
Employee → enters their email + password → goes to Employee Dashboard
```

No separate login pages. Role is detected automatically.

---

## Data Storage

This project uses **LocalStorage** for data persistence — no backend or database required.

| Key | What it stores |
|---|---|
| `employeeData` | All employee records and their tasks |
| `loggedInUser` | Currently logged in user and their role |

> Note: Data is stored in the browser. Clearing browser data will reset the app.

---

## Current Status

> 🚧 Project is almost complete. Some features may still be in development.

- [x] Admin login
- [x] Employee login
- [x] Admin dashboard with stats
- [x] Create and assign tasks
- [x] Add employees
- [x] Employee task management (accept, reject, complete, fail, reopen)
- [x] Team performance view
- [ ] Employee messages (coming soon)
- [ ] Analytics page (coming soon)

---

## Screenshots

> Coming soon

---

## Author

**Your Name**
- GitHub: [@vansh-sharma-eng](https://github.com/vansh-sharma-eng)

---

## License

This project is open source and available under the [MIT License](LICENSE).
