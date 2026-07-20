import { useEffect, useState } from "react";
import { User, Lock, Save, CheckCircle2 } from "lucide-react";
import profileApi from "../api/profileApi";

/**
 * Shared Profile page for Admin/HR/Employee dashboards.
 * View + edit personal info, and change password — both backed by the
 * real /api/users/me endpoints.
 *
 * @param {{ data: object, onUpdate?: (updatedUser: object) => void }} props
 */
const ProfilePage = ({ data, onUpdate }) => {
  const [profile, setProfile] = useState(data || null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", department: "", position: "" });

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileErr, setProfileErr] = useState(null);

  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [savingPw, setSavingPw] = useState(false);
  const [pwMsg, setPwMsg] = useState(null);
  const [pwErr, setPwErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const fresh = await profileApi.getProfile();
        setProfile(fresh);
        setForm({
          name: fresh.name || "",
          department: fresh.department || "",
          position: fresh.position || "",
        });
      } catch {
        // Fall back to whatever the app already has cached for this user.
        if (data) {
          setForm({ name: data.name || "", department: data.department || "", position: data.position || "" });
        }
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileErr(null);
    if (!form.name.trim()) {
      setProfileErr("Name can't be empty.");
      return;
    }
    setSavingProfile(true);
    try {
      const updated = await profileApi.updateProfile(form);
      setProfile(updated);
      onUpdate?.({ ...profile, ...updated });
      setProfileMsg("Profile updated.");
    } catch (err) {
      setProfileErr(err.message || "Couldn't update your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMsg(null);
    setPwErr(null);
    if (pwForm.newPassword.length < 6) {
      setPwErr("New password must be at least 6 characters.");
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwErr("New password and confirmation don't match.");
      return;
    }
    setSavingPw(true);
    try {
      await profileApi.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      setPwMsg("Password changed.");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwErr(err.message || "Couldn't change your password.");
    } finally {
      setSavingPw(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-400">Loading profile…</div>;
  }

  const canEditRole = profile?.role !== "EMPLOYEE";

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-white text-xl font-bold">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">View and update your personal information.</p>
      </div>

      <div className="bg-[#10111C] border border-[#1E2235] rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <User size={26} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-white font-semibold">{profile?.name}</p>
            <p className="text-gray-500 text-sm">{profile?.email} • {profile?.role}</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400">Full name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full bg-[#0B0C14] border border-[#1E2235] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Email (fixed)</label>
              <input
                value={profile?.email || ""}
                disabled
                className="mt-1 w-full bg-[#0B0C14]/60 border border-[#1E2235] rounded-md px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">
                Department {!canEditRole && <span className="text-gray-600">(set by HR)</span>}
              </label>
              <input
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                disabled={!canEditRole}
                className={`mt-1 w-full border border-[#1E2235] rounded-md px-3 py-2 text-sm outline-none focus:border-indigo-500 ${
                  canEditRole ? "bg-[#0B0C14] text-white" : "bg-[#0B0C14]/60 text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">
                Position {!canEditRole && <span className="text-gray-600">(set by HR)</span>}
              </label>
              <input
                value={form.position}
                onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                disabled={!canEditRole}
                className={`mt-1 w-full border border-[#1E2235] rounded-md px-3 py-2 text-sm outline-none focus:border-indigo-500 ${
                  canEditRole ? "bg-[#0B0C14] text-white" : "bg-[#0B0C14]/60 text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          {profileErr && <p className="text-red-300 text-sm">{profileErr}</p>}
          {profileMsg && (
            <p className="text-emerald-400 text-sm flex items-center gap-1"><CheckCircle2 size={14} /> {profileMsg}</p>
          )}

          <button
            type="submit"
            disabled={savingProfile}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
          >
            <Save size={15} />
            {savingProfile ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>

      <div className="bg-[#10111C] border border-[#1E2235] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Lock size={18} className="text-amber-400" />
          </div>
          <div>
            <p className="text-white font-semibold">Change password</p>
            <p className="text-gray-500 text-xs">Choose a new password with at least 6 characters.</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400">Current password</label>
            <input
              type="password"
              value={pwForm.currentPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))}
              className="mt-1 w-full bg-[#0B0C14] border border-[#1E2235] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400">New password</label>
              <input
                type="password"
                value={pwForm.newPassword}
                onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
                className="mt-1 w-full bg-[#0B0C14] border border-[#1E2235] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Confirm new password</label>
              <input
                type="password"
                value={pwForm.confirmPassword}
                onChange={(e) => setPwForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                className="mt-1 w-full bg-[#0B0C14] border border-[#1E2235] rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {pwErr && <p className="text-red-300 text-sm">{pwErr}</p>}
          {pwMsg && (
            <p className="text-emerald-400 text-sm flex items-center gap-1"><CheckCircle2 size={14} /> {pwMsg}</p>
          )}

          <button
            type="submit"
            disabled={savingPw}
            className="inline-flex items-center gap-2 bg-[#1b1c23] hover:bg-[#22232c] border border-[#2A314D] disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
          >
            <Lock size={15} />
            {savingPw ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
