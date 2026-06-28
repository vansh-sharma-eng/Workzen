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

WorkZen/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── custom.md
│   │
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   └── lint.yml
│   │
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── manifest.json
│   ├── robots.txt
│   │
│   ├── images/
│   │   ├── avatars/
│   │   ├── backgrounds/
│   │   ├── illustrations/
│   │   └── logos/
│   │
│   └── icons/
│
├── src/
│
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   ├── videos/
│   │   └── animations/
│   │
│   ├── components/
│   │
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Breadcrumb.jsx
│   │   │
│   │   ├── forms/
│   │   ├── cards/
│   │   ├── tables/
│   │   ├── charts/
│   │   ├── modals/
│   │   ├── loaders/
│   │   ├── notifications/
│   │   └── profile/
│   │
│   ├── features/
│   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── hr/
│   │   │   ├── employee/
│   │   │   └── shared/
│   │   │
│   │   ├── employees/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   │
│   │   ├── attendance/
│   │   ├── leave/
│   │   ├── payroll/
│   │   ├── recruitment/
│   │   ├── departments/
│   │   ├── announcements/
│   │   ├── reports/
│   │   ├── profile/
│   │   └── settings/
│   │
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── LandingLayout.jsx
│   │   └── ErrorLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── Terms.jsx
│   │   ├── NotFound.jsx
│   │   └── ServerError.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── PublicRoute.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   ├── HRRoute.jsx
│   │   └── EmployeeRoute.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── axios.js
│   │   ├── auth.service.js
│   │   ├── employee.service.js
│   │   ├── attendance.service.js
│   │   ├── payroll.service.js
│   │   ├── leave.service.js
│   │   └── report.service.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   ├── useDebounce.js
│   │   ├── useTheme.js
│   │   ├── usePagination.js
│   │   └── useLocalStorage.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── SidebarContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── store/
│   │   ├── index.js
│   │   ├── authSlice.js
│   │   ├── employeeSlice.js
│   │   ├── attendanceSlice.js
│   │   ├── leaveSlice.js
│   │   ├── payrollSlice.js
│   │   └── reportSlice.js
│   │
│   ├── constants/
│   │   ├── roles.js
│   │   ├── permissions.js
│   │   ├── routes.js
│   │   ├── api.js
│   │   └── status.js
│   │
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── validator.js
│   │   ├── formatter.js
│   │   ├── storage.js
│   │   ├── date.js
│   │   └── export.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   ├── utilities.css
│   │   ├── animations.css
│   │   └── themes/
│   │
│   ├── config/
│   │   ├── env.js
│   │   ├── navigation.js
│   │   ├── sidebar.js
│   │   └── theme.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── docs/
│   ├── API.md
│   ├── CONTRIBUTING.md
│   ├── PROJECT_STRUCTURE.md
│   ├── DEPLOYMENT.md
│   └── CHANGELOG.md
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env
├── .env.example
├── .editorconfig
├── .gitignore
├── .prettierrc
├── .eslintrc.cjs
├── eslint.config.js
├── jsconfig.json
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
├── LICENSE
└── CONTRIBUTING.md

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
