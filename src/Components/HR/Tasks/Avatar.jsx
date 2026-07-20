import React from "react";

const Avatar = ({
  initials,
  color = "bg-blue-500",
  small = false,
}) => {
  return (
    <div
      className={`
        ${
          small
            ? "w-9 h-9 text-xs"
            : "w-8 h-8 text-xs"
        }
        ${color}
        rounded-full
        flex
        items-center
        justify-center
        font-bold
        text-white
        border
        border-white/10
        shadow-lg
        select-none
      `}
    >
      {initials}
    </div>
  );
};

export default Avatar;