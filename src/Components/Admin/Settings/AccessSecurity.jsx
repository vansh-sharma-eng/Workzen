// src/Components/Settings/AccessSecurity.jsx

import { useState } from "react";
import { Shield, Lock, CheckCircle2 } from "lucide-react";
import profileApi from "../../../api/profileApi";

const AccessSecurity = ({ data }) => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const rows = [
    ["Authentication", "JWT + Spring Security"],
    ["Session Timeout", "24 hours"],
    ["Two-Factor Auth", "Not enabled"],
    [
      "Last Login",
      data?.lastLoginAt
        ? new Date(data.lastLoginAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
        : "This session",
    ],
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    if (form.newPassword.length < 6) {
      setErr("New password must be at least 6 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setErr("New password and confirmation don't match.");
      return;
    }
    setSaving(true);
    try {
      await profileApi.changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setMsg("Password changed.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setErr(error.message || "Couldn't change your password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-[#1E2235] bg-[#10111C] rounded-md overflow-hidden">
      <div className="flex items-center gap-4 p-3 border-b border-[#1A2138]">
        <div className="w-8 h-8 rounded-md bg-red-950 flex items-center justify-center">
          <Shield className="text-red-400" size={14} />
        </div>
        <h2 className="text-white text-md font-bold">Access &amp; Security</h2>
      </div>

      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-2 p-2 border-b border-[#1A2138]">
          <span className="text-gray-400 text-sm px-3">{label}</span>
          <span className="text-white text-right font-mono text-md mr-4">{value}</span>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <Lock size={14} /> Change password
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <input
            type="password"
            placeholder="Current password"
            value={form.currentPassword}
            onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))}
            className="bg-[#0B0C14] border border-[#1E2235] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={form.newPassword}
            onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
            className="bg-[#0B0C14] border border-[#1E2235] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={form.confirmPassword}
            onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
            className="bg-[#0B0C14] border border-[#1E2235] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
            required
          />
        </div>

        {err && <p className="text-red-400 text-sm">{err}</p>}
        {msg && <p className="text-emerald-400 text-sm flex items-center gap-1"><CheckCircle2 size={14} /> {msg}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
        >
          {saving ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default AccessSecurity;
