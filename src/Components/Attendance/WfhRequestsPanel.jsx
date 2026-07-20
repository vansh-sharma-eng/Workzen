import { useCallback, useEffect, useState } from "react";
import { Home, Check, X as XIcon } from "lucide-react";
import wfhApi from "../../api/wfhApi";

/** Pending WFH-request approval panel, shared by Admin and HR attendance pages.
 * @param {{ managerId?: number }} props - HR passes their own id to scope to just their team; Admin omits it. */
const WfhRequestsPanel = ({ managerId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [decidingId, setDecidingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await wfhApi.getPending(managerId ? { managerId } : undefined);
      setRequests(result || []);
    } catch (err) {
      setError(err.message || "Couldn't load WFH requests.");
    } finally {
      setLoading(false);
    }
  }, [managerId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, [load]);

  const handleDecide = async (id, status) => {
    setDecidingId(id);
    try {
      await wfhApi.decide(id, status);
      await load();
    } catch (err) {
      setError(err.message || "Couldn't update this request.");
    } finally {
      setDecidingId(null);
    }
  };

  if (!loading && requests.length === 0 && !error) return null;

  return (
    <div className="bg-[#10111C] border border-[#1E2235] rounded-md p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Home size={16} className="text-indigo-400" />
        <h2 className="text-lg font-semibold">Pending WFH Requests</h2>
        {requests.length > 0 && (
          <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-2 py-0.5 rounded-full">
            {requests.length}
          </span>
        )}
      </div>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : (
        <div className="space-y-2">
          {requests.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between bg-[#131827] rounded-md px-4 py-3"
            >
              <div>
                <p className="text-white text-sm font-medium">
                  {r.employeeName} <span className="text-slate-500 font-normal">— {r.date}</span>
                </p>
                {r.reason && <p className="text-slate-500 text-xs mt-0.5">{r.reason}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecide(r.id, "APPROVED")}
                  disabled={decidingId === r.id}
                  className="flex items-center gap-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 px-3 py-1.5 rounded-md transition disabled:opacity-50"
                >
                  <Check size={13} /> Approve
                </button>
                <button
                  onClick={() => handleDecide(r.id, "REJECTED")}
                  disabled={decidingId === r.id}
                  className="flex items-center gap-1 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 px-3 py-1.5 rounded-md transition disabled:opacity-50"
                >
                  <XIcon size={13} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WfhRequestsPanel;
