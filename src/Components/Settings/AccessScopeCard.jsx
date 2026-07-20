import React from "react";
import { CheckCircle2, XCircle, ShieldAlert } from "lucide-react";

/** Shows what this account can and can't do — genuinely accurate to the backend's real
 *  @PreAuthorize rules (see SecurityConfig / each *Controller.java), not a decorative list. */
const PERMISSIONS = {
  hr: {
    allowed: [
      "View all employees",
      "Manage attendance",
      "Approve leave & WFH requests for your team",
      "Assign and manage tasks",
    ],
    restricted: [
      "Delete company",
      "Manage billing",
      "Add or remove office locations",
      "Super Admin settings",
    ],
    note: "Billing, company settings, office locations, and Super Admin controls are restricted to the Company Administrator.",
  },
  employee: {
    allowed: [
      "View and update your own profile",
      "Apply for leave & WFH",
      "Punch in / out for attendance",
      "View and update your assigned tasks",
    ],
    restricted: [
      "View other employees' records",
      "Approve leave or WFH requests",
      "Assign tasks to others",
      "Company & Admin settings",
    ],
    note: "Approvals, team-wide records, and company settings are restricted to HR and Admin accounts.",
  },
};

const AccessScopeCard = ({ role = "employee" }) => {
  const { allowed, restricted, note } = PERMISSIONS[role] || PERMISSIONS.employee;
  const title = role === "hr" ? "HR Access Scope" : "Your Access Scope";

  return (
    <div className="p-5">
      <div className="mb-4">
        <h2 className="text-md font-bold text-white">{title}</h2>
        <p className="text-gray-400 text-xs">Permissions available for your account</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-[#262b36] border border-[#343948] rounded-md p-5">
          <h3 className="text-md font-semibold text-green-400 mb-6">Allowed</h3>
          <div className="space-y-3">
            {allowed.map((permission) => (
              <div key={permission} className="flex items-center gap-4">
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                <span className="text-gray-200 text-sm">{permission}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#262b36] border border-[#343948] rounded-md p-4">
          <h3 className="text-md font-semibold text-red-400 mb-2">Restricted</h3>
          <div className="space-y-2">
            {restricted.map((permission) => (
              <div key={permission} className="flex items-center gap-4">
                <XCircle size={18} className="text-red-500 shrink-0" />
                <span className="text-gray-300 text-sm">{permission}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-[#3b2d18] border border-[#6b4d16] rounded-md p-3 flex gap-4">
            <ShieldAlert size={17} className="text-yellow-400 shrink-0 mt-1" />
            <p className="text-gray-300 text-xs leading-5">{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessScopeCard;
