import React, { useCallback, useEffect, useState } from "react";
import { Loader2, Download } from "lucide-react";

import LeaveTabs from "../../Components/HR/Leave/LeaveTabs";
import LeaveGrid from "../../Components/HR/Leave/LeaveGrid";
import LeaveTable from "../../Components/HR/Leave/LeaveTable";
import TeamCalendar from "../../Components/HR/Leave/TeamCalendar";
import LeavePolicy from "../../Components/HR/Leave/LeavePolicy";
import { leaveApi } from "../../api";
import { exportToCsv } from "../../Utils/exportToCsv";

/** HR's Leave Management — scoped to their own team (managerId = current HR). */
const LeaveManagement = ({ data }) => {
  const hrId = data?.id;
  const [activeTab, setActiveTab] = useState("pending");

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!hrId) return;
    setLoading(true);
    setError("");
    try {
      const result = await leaveApi.getAll({ managerId: hrId });
      setLeaves(result || []);
    } catch (err) {
      setError(err.message || "Couldn't load leave requests for your team.");
    } finally {
      setLoading(false);
    }
  }, [hrId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, [load]);

  const pending = leaves.filter((l) => l.status === "PENDING");
  const approved = leaves.filter((l) => l.status === "APPROVED");
  const rejected = leaves.filter((l) => l.status === "REJECTED");

  const handleApprove = async (leaveId) => {
    await leaveApi.decide(leaveId, "APPROVED");
    await load();
  };

  const handleReject = async (leaveId) => {
    await leaveApi.decide(leaveId, "REJECTED");
    await load();
  };

  const handleExport = () => {
    exportToCsv(
      `leave-requests-${new Date().toISOString().slice(0, 10)}`,
      [
        { key: "employeeName", label: "Employee" },
        { key: "type", label: "Type" },
        { key: "fromDate", label: "From" },
        { key: "toDate", label: "To" },
        { key: "status", label: "Status" },
        { key: "reason", label: "Reason" },
        { key: "decidedByName", label: "Decided By" },
      ],
      leaves
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center gap-2 py-16 text-gray-400 text-sm">
          <Loader2 size={16} className="animate-spin" /> Loading your team's leave requests…
        </div>
      );
    }
    if (error) {
      return <div className="py-10 text-center text-red-400 text-sm">{error}</div>;
    }

    switch (activeTab) {
      case "pending":
        return <LeaveGrid leaves={pending} onApprove={handleApprove} onReject={handleReject} />;
      case "approved":
        return <LeaveGrid leaves={approved} onApprove={handleApprove} onReject={handleReject} />;
      case "rejected":
        return <LeaveGrid leaves={rejected} onApprove={handleApprove} onReject={handleReject} />;
      case "all":
        return <LeaveTable leaves={leaves} onApprove={handleApprove} onReject={handleReject} />;
      case "calendar":
        return <TeamCalendar managerId={hrId} />;
      case "policy":
        return <LeavePolicy />;
      default:
        return <LeaveGrid leaves={pending} onApprove={handleApprove} onReject={handleReject} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <LeaveTabs activeTab={activeTab} setActiveTab={setActiveTab} pendingCount={pending.length} />
        <button
          onClick={handleExport}
          disabled={leaves.length === 0}
          className="flex items-center gap-2 bg-[#14151c] hover:bg-[#1b1d24] border border-[#272727] text-gray-300 text-sm font-medium px-4 py-2 rounded-xl transition-all disabled:opacity-40"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default LeaveManagement;
