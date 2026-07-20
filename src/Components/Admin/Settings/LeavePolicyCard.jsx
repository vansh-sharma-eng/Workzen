import React, { useEffect, useState } from "react";
import { CalendarRange, Check } from "lucide-react";
import settingsApi from "../../../api/settingsApi";

const LABELS = { SICK: "Sick Leave", CASUAL: "Casual Leave", PAID: "Paid / Vacation" };

const LeavePolicyCard = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingType, setSavingType] = useState(null);
  const [savedType, setSavedType] = useState(null);
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    settingsApi.getLeaveAllocations()
      .then((res) => {
        setAllocations(res || []);
        setDrafts(Object.fromEntries((res || []).map((a) => [a.leaveType, a.annualDays])));
      })
      .catch((err) => setError(err.message || "Couldn't load leave policy."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (type) => {
    setSavingType(type);
    setError("");
    try {
      const updated = await settingsApi.updateLeaveAllocation(type, Number(drafts[type]));
      setAllocations((prev) => prev.map((a) => (a.leaveType === type ? updated : a)));
      setSavedType(type);
      setTimeout(() => setSavedType(null), 2000);
    } catch (err) {
      setError(err.message || "Couldn't save this allocation.");
    } finally {
      setSavingType(null);
    }
  };

  return (
    <div className="border border-[#1E2235] bg-[#10111C] rounded-md overflow-hidden">
      <div className="flex items-center gap-4 p-2 border-b border-[#1A2138]">
        <div className="w-8 h-8 rounded-md bg-indigo-950 flex items-center justify-center">
          <CalendarRange className="text-indigo-500" size={14} />
        </div>
        <div>
          <h3 className="text-white text-sm font-bold">Leave Policy</h3>
          <p className="text-[11px] text-slate-500">
            Annual day allocation per leave type. Unpaid leave is uncapped and not shown here.
          </p>
        </div>
      </div>

      <div className="p-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-md p-3 mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allocations.map((a) => (
              <div key={a.leaveType} className="bg-[#1b1d24] border border-[#272727] rounded-md p-4">
                <label className="text-slate-400 text-xs block mb-2">{LABELS[a.leaveType] || a.leaveType}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={drafts[a.leaveType] ?? a.annualDays}
                    onChange={(e) => setDrafts((d) => ({ ...d, [a.leaveType]: e.target.value }))}
                    className="w-full bg-[#0B0C14] border border-[#1E2235] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
                  />
                  <span className="text-slate-500 text-xs whitespace-nowrap">days/yr</span>
                </div>
                <button
                  onClick={() => handleSave(a.leaveType)}
                  disabled={savingType === a.leaveType || Number(drafts[a.leaveType]) === a.annualDays}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition disabled:opacity-40"
                >
                  {savedType === a.leaveType ? (<><Check size={12} /> Saved</>) : savingType === a.leaveType ? "Saving…" : "Save"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeavePolicyCard;
