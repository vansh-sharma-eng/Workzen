import React from "react";
import {
  FileText,
  Clock3,
  ShieldCheck,
  CalendarDays,
  CircleCheck,
} from "lucide-react";

import { leaveAllocations, holidays2024 } from "../../../data/HrData/policyData";
import LeaveAllocationCard from "./LeaveAllocationCard";
import HolidayCard from "./HolidayCard";

const policyRules = [
  {
    id: 1,
    title: "Apply Leave in Advance",
    description:
      "Annual and Casual Leave should be applied at least 3 working days before the start date.",
  },
  {
    id: 2,
    title: "Sick Leave",
    description:
      "Medical certificate is required for Sick Leave longer than 2 consecutive days.",
  },
  {
    id: 3,
    title: "Approval Workflow",
    description:
      "All leave requests require reporting manager approval before becoming active.",
  },
  {
    id: 4,
    title: "Carry Forward",
    description:
      "Maximum 5 unused Annual Leave days can be carried forward to the next year.",
  },
];

const LeavePolicy = () => {
  return (
    <div className="space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Leave Policy
          </h2>

          <p className="text-xs text-gray-400">
            Company leave allocation, holidays and policy guidelines.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-md bg-white px-2 py-1 font-medium text-black transition hover:bg-gray-200">
          <FileText size={15}/>
          Download Policy
        </button>
      </div>

      {/* Leave Allocation */}

      <section>
        <h3 className="mb-5 text-md font-semibold text-white">
          Leave Allocation
        </h3>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {leaveAllocations.map((item) => (
            <LeaveAllocationCard
              key={item.id}
              allocation={item}
            />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#262626] bg-[#141414] p-5">
        <div className="mb-5 flex items-center gap-3">
          <ShieldCheck
            size={20}
            className="text-blue-400"
          />

          <h3 className="text-md font-semibold text-white">
            Leave Rules & Guidelines
          </h3>
        </div>

        <div className="space-y-5">
          {policyRules.map((rule) => (
            <div
              key={rule.id}
              className="flex items-start gap-2 rounded-md border border-[#202020] bg-[#181818] p-3"
            >
              <CircleCheck
                size={18}
                className="mt-1 text-emerald-400"
              />

              <div>
                <h4 className="font-semibold text-white">
                  {rule.title}
                </h4>

                <p className="text-xs leading-7 text-gray-400">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Holidays */}

      <section>
        <div className="mb-5 flex items-center gap-3">
          <CalendarDays
            size={18}
            className="text-orange-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Company Holidays 2024
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {holidays2024.map((holiday) => (
            <HolidayCard
              key={holiday.id}
              holiday={holiday}
            />
          ))}
        </div>
      </section>

      {/* Footer */}

      <section className="rounded-md border border-blue-500/20 bg-blue-500/10 px-5 py-3">
        <div className="flex items-start gap-4">
          <Clock3
            className="mt-2 text-blue-400"
            size={18}
          />

          <div>
            <h3 className="text-md font-semibold text-white">
              Need Help?
            </h3>

            <p className=" text-gray-300 text-xs">
              Contact the HR department if you have questions regarding
              leave balance, leave approval, carry forward policy or
              holiday calendar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeavePolicy;