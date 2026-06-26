export const tasks = [
  {
    id: 1,
    title: "Complete Q4 performance review for Engineering team",
    description:
      "Review all 6 engineering employees and submit evaluations via the HR portal before end of month.",

    status: "In Progress",
    priority: "High",
    category: "Performance",

    assignee: "SM",
    assigneeColor: "bg-emerald-500",

    dueDate: "Jan 20, 2024",

    createdAt: "over 2 years ago",
    completed: false,
  },

  {
    id: 2,
    title: "Update employee handbook with new WFH policy",
    description:
      "Reflect the updated WFH entitlement (24 days/yr) and revised remote work guidelines.",

    status: "To Do",
    priority: "Medium",
    category: "Policy",

    assignee: "SM",
    assigneeColor: "bg-emerald-500",

    dueDate: "Jan 31, 2024",

    createdAt: "over 2 years ago",
    completed: false,
  },

  {
    id: 3,
    title: "Schedule probation review for Luca Ricci",
    description:
      "Probation period ends Jan 16. Schedule 1:1 and prepare evaluation form.",

    status: "To Do",
    priority: "Urgent",
    category: "Onboarding",

    assignee: "LR",
    assigneeColor: "bg-orange-500",

    dueDate: "Jan 15, 2024",

    createdAt: "over 2 years ago",
    completed: false,
  },

  {
    id: 4,
    title: "Send onboarding kit to Elena Volkov",
    description:
      "Share laptop details, HR documents and welcome package before joining.",

    status: "Done",
    priority: "High",
    category: "Onboarding",

    assignee: "EV",
    assigneeColor: "bg-red-500",

    dueDate: "Jan 10, 2024",

    createdAt: "over 2 years ago",
    completed: true,
  },

  {
    id: 5,
    title: "Prepare monthly HR metrics report",
    description:
      "Compile attendance, leave, mood and turnover data for January. Share with leadership by Feb 1.",

    status: "To Do",
    priority: "Medium",
    category: "Reporting",

    assignee: "SM",
    assigneeColor: "bg-emerald-500",

    dueDate: "Feb 1, 2024",

    createdAt: "over 2 years ago",
    completed: false,
  },

  {
    id: 6,
    title: "Coordinate team-building event for Q1",
    description:
      "Research venues and activities for a half-day offsite event in March. Budget: $2,000.",

    status: "In Progress",
    priority: "Low",
    category: "Culture",

    assignee: "JO",
    assigneeColor: "bg-pink-500",

    dueDate: "Feb 15, 2024",

    createdAt: "over 2 years ago",
    completed: false,
  },

  {
    id: 7,
    title: "Follow up on Felix Huang wellness concern",
    description:
      "Felix has been flagged in the wellness system. Schedule anonymous check-in.",

    status: "In Review",
    priority: "Urgent",
    category: "Wellness",

    assignee: "FH",
    assigneeColor: "bg-blue-600",

    dueDate: "Jan 14, 2024",

    createdAt: "over 2 years ago",
    completed: false,
  },
];

export const statusTabs = [
  "All",
  "To Do",
  "In Progress",
  "In Review",
  "Done",
];

export const priorities = [
  "All Priorities",
  "Low",
  "Medium",
  "High",
  "Urgent",
];

export const categories = [
  "All",
  "Performance",
  "Policy",
  "Onboarding",
  "Reporting",
  "Culture",
  "Wellness",
  "Compliance",
];