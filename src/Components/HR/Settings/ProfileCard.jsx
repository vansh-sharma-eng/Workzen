import React, { useState } from "react";
import { Check } from "lucide-react";
import ProfileInput from "./ProfileInput";

const ProfileCard = () => {
  const [form, setForm] = useState({
    fullName: "Priya Sharma",
    email: "priya.hr@workzen.co",
    phone: "+1 555-0000",
    department: "Human Resources",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
          PS
        </div>

        <div>
          <h3 className="text-md font-bold text-white">
            Priya Sharma
          </h3>

          <p className="text-gray-300 text-sm mt-0.5">
            HR Manager
          </p>

          <p className="text-gray-400 text-md">
            priya.hr@workzen.co
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
        />

        <ProfileInput
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
        />

      </div>

      {/* Button */}

      <div className="flex justify-end mt-8">

        <button className="flex items-center gap-3 bg-white text-black px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-200 transition">

          <Check size={20} />

          Save Changes

        </button>

      </div>
    </div>
  );
};

export default ProfileCard;