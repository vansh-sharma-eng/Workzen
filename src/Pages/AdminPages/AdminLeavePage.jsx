import { useContext } from "react";
import { AuthContext } from "../../Components/Context/AuthProvider";
import {
  Check,
  X,
  CalendarDays,
  Clock,
} from "lucide-react";

const AdminLeavePage = ({sidebarCollapsed}) => {
  const { userData, setUserData } = useContext(AuthContext);

  const employees = userData?.employeesData || [];

  const allRequests = employees
    .flatMap((emp) =>
      (emp.leaveRequests || []).map((req) => ({
        ...req,
        employeeName: emp.Name,
        employeeId: emp.id,
        department: emp.department,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.appliedOn || b.startDate) -
        new Date(a.appliedOn || a.startDate)
    );

  const pendingRequests = allRequests.filter(
    (req) => req.status === "pending"
  );

  const approvedRequests = allRequests.filter(
    (req) => req.status === "approved"
  );

  const rejectedRequests = allRequests.filter(
    (req) => req.status === "rejected"
  );

  const updateLeave = (employeeId, leaveId, status) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id !== employeeId) return emp;

      const updatedRequests = (emp.leaveRequests || []).map((leave) =>
        leave.id === leaveId
          ? {
              ...leave,
              status,
            }
          : leave
      );

      const notification = {
        id: Date.now(),
        type:
          status === "approved"
            ? "leave_approved"
            : "leave_rejected",
        message:
          status === "approved"
            ? "Your leave request has been approved by admin."
            : "Your leave request has been rejected by admin.",
        date: new Date().toISOString(),
        read: false,
      };

      return {
        ...emp,
        leaveRequests: updatedRequests,
        notifications: [
          ...(emp.notifications || []),
          notification,
        ],
      };
    });

    localStorage.setItem(
      "employeeData",
      JSON.stringify(updatedEmployees)
    );

    setUserData({
      ...userData,
      employeesData: updatedEmployees,
    });
  };

  const totalDays = (start, end) => {
    return (
      Math.ceil(
        (new Date(end) - new Date(start)) /
          (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

return (
  <div
    className={`
      mt-16 
      transition-all duration-300
      ${
        sidebarCollapsed
          ? "ml-16 w-[calc(100%-4rem)]"
          : "ml-56 w-[calc(100%-14rem)]"
      }
    `}
  >
    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
      <div className="bg-[#0F1324] border border-[#20263A] rounded-md h-20 w-full p-3">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-amber-500/10 flex items-center justify-center">
            <Clock size={18} className="text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {pendingRequests.length}
            </h2>
            <p className="text-[#94A3B8]">Pending Requests</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0F1324] border border-[#20263A] rounded-md h-20 w-full p-3">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-emerald-500/10 flex items-center justify-center">
            <Check size={20} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {approvedRequests.length}
            </h2>
            <p className="text-[#94A3B8]">Approved This Month</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0F1324] border border-[#20263A] rounded-md h-20 w-full p-3">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center">
            <X size={22} className="text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {rejectedRequests.length}
            </h2>
            <p className="text-[#94A3B8]">Rejected This Month</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0F1324] border border-[#20263A] rounded-md h-20 w-full p-3">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-indigo-500/10 flex items-center justify-center">
            <CalendarDays size={22} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {approvedRequests.length}
            </h2>
            <p className="text-[#94A3B8]">On Leave Today</p>
          </div>
        </div>
      </div>
    </div>

    {/* Leave Requests */}
    <div className="w-full bg-[#0F1324] border border-[#20263A] rounded-md overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-[#20263A]">
        <h2 className="text-md font-semibold text-white">
          Leave Requests
        </h2>
      </div>

      {allRequests.length === 0 && (
        <div className="py-14 text-center">
          <CalendarDays
            size={40}
            className="mx-auto text-slate-600"
          />
          <h3 className="text-white text-md mt-4">
            No Leave Requests
          </h3>
          <p className="text-slate-400">
            Employee leave requests will appear here
          </p>
        </div>
      )}

      {allRequests.map((req) => (
        <div
          key={req.id}
          className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-6 py-6 border-b border-[#20263A]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
              {req.employeeName
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div>
              <h3 className="text-white text-md font-semibold">
                {req.employeeName}
              </h3>

              <p className="text-[#94A3B8]">
                {req.reason}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300">
              {req.leaveType}
            </span>

            <span className="text-slate-300 text-sm">
              {new Date(req.startDate).toLocaleDateString()}
              {" → "}
              {new Date(req.endDate).toLocaleDateString()}
            </span>

            <span className="text-white text-sm font-semibold">
              {totalDays(req.startDate, req.endDate)}d
            </span>

            {req.status === "pending" && (
              <>
                <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 flex items-center gap-2">
                  <Clock size={14} />
                  Pending
                </span>

                <button
                  onClick={() =>
                    updateLeave(
                      req.employeeId,
                      req.id,
                      "approved"
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 flex items-center gap-2"
                >
                  <Check size={15} />
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateLeave(
                      req.employeeId,
                      req.id,
                      "rejected"
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center gap-2"
                >
                  <X size={15} />
                  Reject
                </button>
              </>
            )}

            {req.status === "approved" && (
              <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center gap-2">
                <Check size={14} />
                Approved
              </span>
            )}

            {req.status === "rejected" && (
              <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 flex items-center gap-2">
                <X size={14} />
                Rejected
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default AdminLeavePage;