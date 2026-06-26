import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { leaveRequests } from "../../../data/HrData/leaveData";

const LeaveTable = () => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return leaveRequests.filter((leave) => {
      return (
        leave.name.toLowerCase().includes(search.toLowerCase()) ||
        leave.department.toLowerCase().includes(search.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search]);

  return (
    <div className="rounded-2xl border border-[#262626] bg-[#0F111A] overflow-hidden">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-[#262626]">

        <div>
          <h2 className="text-xl font-semibold text-white">
            All Leave Requests
          </h2>

          <p className="text-gray-400 text-xs">
            View and manage all employee leave requests.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* Search */}

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1b1b1b] border border-[#2d2d2d] rounded-md pl-10 pr-4 py-1 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button className="h-9 w-9 rounded-md bg-[#1b1b1b] flex items-center justify-center hover:bg-[#252525]">
            <Filter size={18} />
          </button>

          <button className="h-9 w-9 rounded-md bg-[#1b1b1b] flex items-center justify-center hover:bg-[#252525]">
            <Download size={18} />
          </button>

        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="  bg-[#0F111A]">

            <tr className="text-left">

              <th className="px-6 py-4 text-gray-400 font-medium">
                Employee
              </th>

              <th className="px-6 py-4 text-gray-400 font-medium">
                Department
              </th>

              <th className="px-6 py-4 text-gray-400 font-medium">
                Leave Type
              </th>

              <th className="px-6 py-4 text-gray-400 font-medium">
                Duration
              </th>

              <th className="px-6 py-4 text-gray-400 font-medium">
                Applied
              </th>

              <th className="px-6 py-4 text-gray-400 font-medium">
                Status
              </th>

              <th className="px-6 py-4 text-gray-400 font-medium"></th>

            </tr>

          </thead>

          <tbody>

            {filteredData.map((leave) => (

              <tr
                key={leave.id}
                className="border-t border-[#222] hover:bg-[#181818]"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
                      style={{
                        background: leave.avatarColor,
                      }}
                    >
                      {leave.initials}
                    </div>

                    <div>

                      <p className="font-medium text-white">
                        {leave.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {leave.reason}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5 text-gray-300">
                  {leave.department}
                </td>

                <td className="px-6 py-5 text-gray-300">
                  {leave.leaveType}
                </td>

                <td className="px-6 py-5">

                  <div>

                    <p className="text-white">
                      {leave.startDate}
                    </p>

                    <p className="text-sm text-gray-500">
                      {leave.endDate}
                    </p>

                  </div>

                </td>

                <td className="px-6 py-5 text-gray-300">
                  {leave.appliedDate}
                </td>

                <td className="px-6 py-5">

                  <StatusBadge
                    status={leave.status}
                  />

                </td>

                <td className="px-6 py-5">

                  <button className="w-9 h-9 rounded-lg hover:bg-[#252525] flex items-center justify-center">

                    <MoreHorizontal size={18} />

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LeaveTable;