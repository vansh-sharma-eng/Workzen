import React from "react";
import { Check } from "lucide-react";
import ProfileInput from "./ProfileInput";
import { useUserSettings } from "../../../Utils/useUserSettings";

const ProfileCard = ({ data }) => {
  const { value: form, update, save, saved } = useUserSettings(data?.email || data?.id, {
    fullName: data?.name || "HR User",
    email: data?.email || "",
    phone: "",
    department: data?.department || "Human Resources",
  });

  const handleChange = (e) => update({ [e.target.name]: e.target.value });

  const initials = (form.fullName || "HR")
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="p-5">

    
      <div className="mb-8">
        <h2 className="text-md font-bold text-white">
          HR Profile
        </h2>

        <p className="text-gray-400 text-sm">
          Your account information
        </p>
      </div>


      <div className="flex items-center gap-6 mb-7">

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-sm font-bold">
          {initials}
        </div>

        <div>
          <h3 className="text-md font-bold text-white">
            {form.fullName}
          </h3>

          <p className="text-gray-300 text-sm mt-0.5">
            {data?.position || "HR Manager"}
          </p>

          <p className="text-gray-400 text-md">
            {form.email}
          </p>
        </div>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <ProfileInput
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />

        <ProfileInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <ProfileInput
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 555-0000"
        />

        <ProfileInput
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
        />

      </div>

      {/* Button */}

      <div className="flex justify-end items-center gap-3 mt-8">
        {saved && <span className="text-emerald-400 text-xs">Saved ✓</span>}

        <button
          onClick={save}
          className="flex items-center gap-3 bg-white text-black px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-200 transition"
        >
          <Check size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
