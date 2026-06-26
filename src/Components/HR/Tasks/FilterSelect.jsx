import React from "react";
import { ChevronDown } from "lucide-react";

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-400">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            appearance-none
            bg-[#14151c]
            border
            border-[#272727]
            rounded-xl
            px-4
            py-3
            pr-10
            text-white
            outline-none
            transition-all
            duration-300
            hover:border-gray-500
            focus:border-blue-500
            cursor-pointer
          "
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#14151c]"
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default FilterSelect;