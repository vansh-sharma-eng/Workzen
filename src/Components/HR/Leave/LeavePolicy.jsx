import React, { useEffect, useState } from "react";
import {
  FileText,
  Clock3,
  ShieldCheck,
  CalendarDays,
  CircleCheck,
} from "lucide-react";

import settingsApi from "../../../api/settingsApi";
import LeaveAllocationCard from "./LeaveAllocationCard";
import HolidayCard from "./HolidayCard";

// No external data-file import here on purpose — this component previously broke a few times
// because that file's relative path drifted/went stale across edits. Everything it needs is
// either fetched live from the backend (leave allocations) or defined right here (holidays,
// policy rules), so there's nothing left to go stale or point at a missing file.

const LEAVE_TYPE_LABEL = { SICK: "Sick Leave", CASUAL: "Casual Leave", PAID: "Paid Leave" };

// India's fixed national holidays plus the most widely-observed festivals for 2026. Exact dates for
// moon/tithi-based festivals (Holi, Eid, Diwali, etc.) are set by official notification each year —
// these reflect the dates most Indian corporate calendars are using as of mid-2026.
const HOLIDAYS_2026 = [
  { id: 1, date: "Jan 1", title: "New Year's Day" },
  { id: 2, date: "Jan 26", title: "Republic Day" },
  { id: 3, date: "Mar 4", title: "Holi" },
  { id: 4, date: "Apr 3", title: "Good Friday" },
  { id: 5, date: "Aug 15", title: "Independence Day" },
  { id: 6, date: "Oct 2", title: "Gandhi Jayanti" },
  { id: 7, date: "Oct 20", title: "Dussehra" },
  { id: 8, date: "Nov 8", title: "Diwali" },
  { id: 9, date: "Dec 25", title: "Christmas Day" },
];

const policyRules = [
  {
    id: 1,
    title: "Apply Leave in Advance",
    description:
      "Casual and Paid Leave should be applied at least 3 working days before the start date.",
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
      "All leave requests require reporting manager (HR) approval before becoming active.",
  },
  {
    id: 4,
    title: "Unpaid Leave",
    description:
      "Unpaid Leave has no fixed annual cap and is granted at HR/Admin discretion.",
  },
];

const LeavePolicy = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsApi.getLeaveAllocations()
      .then((result) => {
        // Backend shape: [{ leaveType: "CASUAL", annualDays: 12 }, ...] — mapped to what
        // LeaveAllocationCard expects, and always reflects whatever Admin actually configured
        // in Settings → Leave Policy, instead of a separate hardcoded number going stale.
        const mapped = (result || [])
          .filter((a) => LEAVE_TYPE_LABEL[a.leaveType])
          .map((a) => ({
            id: a.leaveType,
            type: LEAVE_TYPE_LABEL[a.leaveType],
            days: a.annualDays,
            unit: "days/yr",
          }));
        setAllocations(mapped);
      })
      .catch(() => setAllocations([]))
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {allocations.map((item) => (
              <LeaveAllocationCard
                key={item.id}
                allocation={item}
              />
            ))}
          </div>
        )}
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
            Company Holidays 2026
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {HOLIDAYS_2026.map((holiday) => (
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
