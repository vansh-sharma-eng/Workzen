import React, { useState } from "react";
import { KeyRound, Check, Copy, AlertCircle, Loader2 } from "lucide-react";

/** Shared by Admin and HR employee management — two steps: confirm the reset, then show the
 *  generated temp password exactly once. @param onConfirm should resolve to the plaintext password. */
const ResetPasswordModal = ({ employee, onClose, onConfirm }) => {
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState("");
  const [tempPassword, setTempPassword] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleConfirm = async () => {
    setResetting(true);
    setError("");
    try {
      const password = await onConfirm(employee);
      setTempPassword(password);
    } catch (err) {
      setError(err.message || "Couldn't reset this password.");
    } finally {
      setResetting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[420px] bg-[#151822] border border-[#1e2333] rounded-2xl px-6 sm:px-8 py-7">
        <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
          <KeyRound size={20} className="text-indigo-400" />
        </div>

        {tempPassword ? (
          <>
            <h2 className="text-[#f1f5f9] text-lg font-semibold mb-1">Password Reset</h2>
            <p className="text-[#64748b] text-sm mb-4">
              Share this temporary password with <span className="text-[#f1f5f9] font-medium">{employee.name}</span> directly —
              it won't be shown again. They should change it after logging in.
            </p>
            <div className="flex items-center gap-2 bg-[#0B0C14] border border-[#1e2333] rounded-xl px-4 py-3 mb-6">
              <code className="flex-1 text-white font-mono text-sm tracking-wide">{tempPassword}</code>
              <button
                onClick={handleCopy}
                className="text-[#94a3b8] hover:text-white transition-all shrink-0"
                title="Copy"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-sm bg-indigo-600 text-white hover:bg-indigo-500 transition-all font-medium"
            >
              Done
            </button>
          </>
        ) : (
          <>
            <h2 className="text-[#f1f5f9] text-lg font-semibold mb-1">Reset Password</h2>
            <p className="text-[#64748b] text-sm mb-6">
              Generate a new temporary password for <span className="text-[#f1f5f9] font-medium">{employee.name}</span>?
              Their current password will stop working immediately.
            </p>
            {error && (
              <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-2.5 text-sm">
                <AlertCircle size={14} className="shrink-0" /> {error}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={resetting}
                className="flex-1 py-2.5 rounded-xl text-sm border border-[#1e2333] text-[#94a3b8] hover:bg-[#1e2333] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={resetting}
                className="flex-1 py-2.5 rounded-xl text-sm bg-indigo-600 text-white hover:bg-indigo-500 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {resetting && <Loader2 size={14} className="animate-spin" />}
                {resetting ? "Resetting…" : "Reset Password"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;
