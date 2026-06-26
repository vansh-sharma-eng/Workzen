import React from "react";

const ProfileInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
    
      <label className="text-sm font-semibold text-white">
        {label}
      </label>


      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          bg-[#262b36]
          border border-[#343948]
          rounded-xl
          px-5
          py-2
          text-white
          placeholder:text-gray-500
          outline-none
          transition-all
          duration-300
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-500/20
        "
      />
    </div>
  );
};

export default ProfileInput;