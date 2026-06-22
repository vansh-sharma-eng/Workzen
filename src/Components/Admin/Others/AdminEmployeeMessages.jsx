// AdminEmployeeMessages.jsx
import { MessageSquare, Lock } from "lucide-react";

const AdminEmployeeMessages = () => {
  return (
    <div className="bg-[#151822] border border-[#1e2333] rounded-2xl p-6 flex-1 text-[#f1f5f9] shadow-lg flex flex-col items-center justify-center gap-4 min-h-[300px]">
      <div className="w-12 h-12 rounded-2xl bg-[#0d0f14] border border-[#1e2333] flex items-center justify-center">
        <MessageSquare
          size={20}
          className="text-[#64748b]"
          strokeWidth={1.5}
        />
      </div>

      <div className="text-center">
        <h2 className="text-sm font-semibold text-[#64748b]">
          Employee Messages
        </h2>
        <p className="text-[#3b4a5e] text-xs mt-1">Not available yet</p>
      </div>

      <div className="flex items-center gap-1.5 bg-[#0d0f14] border border-[#1e2333] rounded-full px-3 py-1.5">
        <Lock size={9} className="text-[#64748b]" />
        <span className="text-[9px] text-[#64748b] tracking-widest uppercase">
          Coming in future update
        </span>
      </div>
    </div>
  );
};

export default AdminEmployeeMessages;