// AdminHeader.jsx
import { UserPlus,MessageSquare, Plus, EllipsisVertical, LogOut } from "lucide-react";
import { useState } from "react";

const AdminHeader = ({ setOpenTaskForm, setOpenEmployeeForm, changeuser, data }) => {
  const [showMenu, setShowMenu] = useState(false);

  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleLogout = () => {
    localStorage.setItem("loggedInUser", "");
    changeuser("");
  };

  return (
    <div className="flex justify-between items-center p-5 w-[85%] ml-57 border-b border-[#1e2333]">
      <div>
        <h1 className="text-3xl font-bold text-[#f1f5f9]">
          Hello,{" "}
          <span className="text-[#60a5fa]">{data.Name}</span>
        </h1>
        <p className="text-[13px] mt-0.5 text-[#64748b] font-medium">
          {`${day}, ${date}`}
        </p>
      </div>



      <div className="flex items-center gap-3">
       


        <button
          onClick={() => setOpenEmployeeForm(true)}
          className="flex p-2 items-center justify-center rounded-xl bg-[#151822] border border-[#1e2333] text-[#60a5fa] hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/30 transition-all"
        >
          <UserPlus size={20} strokeWidth={2} />
        </button>

        <button
          onClick={() => setOpenTaskForm(true)}
          className="flex items-center gap-2 rounded-xl bg-[#3b82f6] hover:bg-[#60a5fa] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all"
        >
          <Plus size={16} />
          Assign Task
        </button>

        <div className="relative mr-10">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-xl bg-[#151822] border border-[#1e2333] text-[#64748b] hover:text-[#f1f5f9] transition-all"
          >
            <EllipsisVertical size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-[#151822] border border-[#1e2333] rounded-xl shadow-xl p-1.5 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-[#64748b] hover:bg-[#1e2333] hover:text-[#f1f5f9] transition-all"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;