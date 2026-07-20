// CreateTask.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { taskApi } from "../../api";
import { X, FileText, AlignLeft, Tag, User, Calendar, ChevronDown, Check } from "lucide-react";

const CreateTask = ({ setOpenTaskForm }) => {
  const { userData, refreshData } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [assignTo, setAssignTo] = useState(""); // employee id
  const [assignToName, setAssignToName] = useState("");
  const [date, setDate] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Frontend", "Backend", "Design", "DevOps", "Testing"];

  async function submitHandler(e) {
    e.preventDefault();
    if (!title || !description || !category || !assignTo || !date) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    try {
      // NOTE: the backend Task entity doesn't have a "category" field yet —
      // it's folded into the description for now so it isn't silently lost.
      await taskApi.create({
        title,
        description: `[${category}] ${description}`,
        assignedToId: assignTo,
        dueDate: date,
      });

      setSubmitted(true);
      await refreshData();

      setTimeout(() => {
        setTitle(""); setDescription(""); setCategory("");
        setAssignTo(""); setAssignToName(""); setDate("");
        setSubmitted(false); setOpenTaskForm(false);
      }, 1200);
    } catch (err) {
      setError(err.message || "Failed to assign task.");
    }
  }

  const inputClass =
    "w-full bg-[#0d0f14] border border-[#1e2333] rounded-lg py-2.5 pl-9 pr-4 text-sm text-[#f1f5f9] placeholder-[#2a3244] outline-none focus:border-[#3b82f6] transition-colors";

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-6">
      <div className="w-[460px] bg-[#151822] border border-[#1e2333] rounded-2xl px-8 py-7 relative">
        <button
          onClick={() => setOpenTaskForm(false)}
          className="absolute top-4 right-4 text-[#64748b] hover:text-[#f1f5f9] transition-all"
        >
          <X size={18} />
        </button>

        <form onSubmit={submitHandler} autoComplete="off">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 rounded-lg bg-[#3b82f6] flex items-center justify-center font-bold text-xs text-white">
              W
            </div>
            <span className="text-[#f1f5f9] text-sm font-semibold">
              Work<span className="text-[#60a5fa]">Zen</span>
            </span>
          </div>

          <h2 className="text-lg font-semibold text-[#f1f5f9] mb-1">
            Assign new{" "}
            <span className="text-[#60a5fa] font-normal italic">task</span>
          </h2>
          <p className="text-[11px] text-[#64748b] mb-5">
            Fill in the details to assign a task to a team member.
          </p>

          <div className="flex flex-col gap-1.5 mb-3">
            <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
              Task title
            </label>
            <div className="relative">
              <FileText
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244]"
              />
              <input
                value={title}
                onChange={(e) => { setTitle(e.target.value); setError(""); }}
                type="text"
                placeholder="Task title"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-3">
            <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
              Description
            </label>
            <div className="relative">
              <AlignLeft
                size={13}
                className="absolute left-3.5 top-3 text-[#2a3244]"
              />
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); setError(""); }}
                rows={3}
                placeholder="Task description"
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
                Category
              </label>
              <div className="relative">
                <Tag
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244] pointer-events-none"
                />
                <button
                  type="button"
                  onClick={() => { setCategoryOpen(!categoryOpen); setAssignOpen(false); }}
                  className={`w-full bg-[#0d0f14] border rounded-lg py-2.5 pl-9 pr-3 text-sm text-left flex items-center justify-between outline-none transition-colors
                    ${categoryOpen ? "border-[#3b82f6]" : "border-[#1e2333]"}
                    ${category ? "text-[#f1f5f9]" : "text-[#2a3244]"}`}
                >
                  <span>{category || "Select"}</span>
                  <ChevronDown
                    size={13}
                    className={`text-[#64748b] transition-transform  ${categoryOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {categoryOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-xl overflow-auto h-25">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => { setCategory(cat); setCategoryOpen(false); setError(""); }}
                        className={`flex items-center justify-between px-4 py-2.5 text-xs cursor-pointer transition-all
                          ${category === cat
                            ? "text-[#60a5fa] bg-[#1e2333]"
                            : "text-[#64748b] hover:bg-[#1e2333] hover:text-[#f1f5f9]"
                          }`}
                      >
                        <span>{cat}</span>
                        {category === cat && <Check size={12} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
                Assign to
              </label>
              <div className="relative">
                <User
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244] pointer-events-none"
                />
                <button
                  type="button"
                  onClick={() => { setAssignOpen(!assignOpen); setCategoryOpen(false); }}
                  className={`w-full bg-[#0d0f14] border rounded-lg py-2.5 pl-9 pr-3 text-sm text-left flex items-center justify-between outline-none transition-colors
                    ${assignOpen ? "border-[#3b82f6]" : "border-[#1e2333]"}
                    ${assignTo ? "text-[#f1f5f9]" : "text-[#2a3244]"}`}
                >
                  <span className="truncate">{assignToName || "Select"}</span>
                  <ChevronDown
                    size={13}
                    className={`text-[#64748b] transition-transform ${assignOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {assignOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#151822] border border-[#1e2333] rounded-xl z-50 shadow-xl max-h-36 overflow-y-auto">
                    {userData?.employeesData?.map((emp) => (
                      <div
                        key={emp.id}
                        onClick={() => { setAssignTo(emp.id); setAssignToName(emp.name); setAssignOpen(false); setError(""); }}
                        className={`flex items-center justify-between px-4 py-2.5 text-xs cursor-pointer transition-all
                          ${assignTo === emp.id
                            ? "text-[#60a5fa] bg-[#1e2333]"
                            : "text-[#64748b] hover:bg-[#1e2333] hover:text-[#f1f5f9]"
                          }`}
                      >
                        <span>{emp.name}</span>
                        {assignTo === emp.id && <Check size={12} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-[10.5px] font-medium tracking-widest uppercase text-[#64748b]">
              Due date
            </label>
            <div className="relative">
              <Calendar
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2a3244] pointer-events-none"
              />
              <input
                value={date}
                onChange={(e) => { setDate(e.target.value); setError(""); }}
                type="date"
                className="w-full bg-[#0d0f14] border border-[#1e2333] rounded-lg py-2.5 pl-9 pr-4 text-sm text-[#f1f5f9] outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitted}
            className={`w-full py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all
              ${submitted
                ? "bg-[#3b82f6] opacity-80"
                : "bg-[#3b82f6] hover:bg-[#60a5fa]"
              }`}
          >
            {submitted ? (
              <><Check size={15} /><span>Task assigned!</span></>
            ) : (
              <span>Assign task</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;