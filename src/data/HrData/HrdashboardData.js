// ================================
// Dashboard Statistics
// ================================

export const statsCards = [
  {
    id: 1,
    title: "Total Employees",
    value: 20,
    subtitle: "+1 this month",
    color: "#6366F1",
    icon: "Users",
    border: "border-[#1A2035]",
  },
  {
    id: 2,
    title: "Pending Leave Requests",
    value: 7,
    subtitle: "Needs your action",
    color: "#F59E0B",
    icon: "CalendarClock",
    border: "border-orange-500/60",
  },
  {
    id: 3,
    title: "Wellness Alerts",
    value: 3,
    subtitle: "Require follow-up",
    color: "#EF4444",
    icon: "HeartPulse",
    border: "border-red-500/60",
  },
  {
    id: 4,
    title: "Open Positions",
    value: 4,
    subtitle: "Roles to fill",
    color: "#A855F7",
    icon: "BriefcaseBusiness",
    border: "border-[#1A2035]",
  },
];


// ================================
// Attendance Chart
// ================================

export const attendanceData = [
  {
    name: "Present",
    value: 10,
    color: "#10B981",
  },
  {
    name: "Late",
    value: 3,
    color: "#F59E0B",
  },
  {
    name: "Absent",
    value: 3,
    color: "#EF4444",
  },
  {
    name: "WFH",
    value: 4,
    color: "#6366F1",
  },
];


// ================================
// Department Strength
// ================================

export const departmentStrength = [
  {
    department: "Engineering",
    employees: 7,
    color: "#4F46E5",
  },
  {
    department: "Design",
    employees: 3,
    color: "#8B5CF6",
  },
  {
    department: "Marketing",
    employees: 3,
    color: "#EC4899",
  },
  {
    department: "Sales",
    employees: 2,
    color: "#F59E0B",
  },
  {
    department: "Operations",
    employees: 2,
    color: "#6366F1",
  },
  {
    department: "Product",
    employees: 1,
    color: "#F97316",
  },
  {
    department: "Finance",
    employees: 1,
    color: "#10B981",
  },
  {
    department: "HR",
    employees: 1,
    color: "#06B6D4",
  },
];


// ================================
// Pending Actions
// ================================

export const pendingActions = [
  {
    id: 1,
    employee: "Luca Ricci",
    title: "Casual Leave",
    date: "Jan 22, 2024",
    duration: "2d",
    type: "leave",
  },
  {
    id: 2,
    employee: "Isabelle Dupont",
    title: "Annual Leave",
    date: "Jan 29, 2024",
    duration: "5d",
    type: "leave",
  },
  {
    id: 3,
    employee: "James O'Brien",
    title: "WFH Request",
    date: "Today",
    duration: "1d",
    type: "leave",
  },
  {
    id: 4,
    employee: "Zara Ahmed",
    title: "Wellness Alert",
    description: "Stressed 3+ consecutive days",
    type: "alert",
  },
  {
    id: 5,
    employee: "Naomi Okafor",
    title: "Wellness Alert",
    description: "Stressed 3+ consecutive days",
    type: "alert",
  },
  {
    id: 6,
    employee: "Luca Ricci",
    title: "Probation Ending",
    date: "Jan 16, 2024",
    type: "probation",
  },
  {
    id: 7,
    employee: "Isabelle Dupont",
    title: "Probation Ending",
    date: "Jan 20, 2024",
    type: "probation",
  },
];


// ================================
// Recent Activities
// ================================

export const recentActivities = [
  {
    id: 1,
    color: "#FBBF24",
    title: "Approved Mei Lin's Sick Leave request",
    time: "2 years ago",
  },
  {
    id: 2,
    color: "#14B8A6",
    title: "Added Elena Volkov as Intern – Engineering",
    time: "2 years ago",
  },
  {
    id: 3,
    color: "#818CF8",
    title: "Generated Increment Letter for Priya Kapoor",
    time: "2 years ago",
  },
  {
    id: 4,
    color: "#C084FC",
    title: "Assigned OKR 'ML Rollout' to Priya Kapoor",
    time: "2 years ago",
  },
  {
    id: 5,
    color: "#FBBF24",
    title: "Rejected Raj Patel's Sick Leave",
    time: "2 years ago",
  },
  {
    id: 6,
    color: "#818CF8",
    title: "Generated Salary Certificate for Raj Patel",
    time: "2 years ago",
  },
  {
    id: 7,
    color: "#60A5FA",
    title: "Updated Leave Policy – WFH limit raised to 24 days",
    time: "2 years ago",
  },
];