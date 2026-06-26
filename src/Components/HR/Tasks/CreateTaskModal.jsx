import React, { useState } from "react";
import { X } from "lucide-react";

const CreateTaskModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    category: "Performance",
    dueDate: "",
    assignee: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5">
      <div className="w-full max-w-2xl bg-[#14151c] border border-[#272727] rounded-3xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center border-b border-[#272727] px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Create New Task
            </h2>

            <p className="text-gray-400 mt-1">
              Assign a new HR task.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-[#1b1d24] border border-[#272727] flex items-center justify-center hover:border-gray-500"
          >
            <X className="text-gray-400" />
          </button>
        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          {/* Title */}

          <div>
            <label className="text-gray-400 block mb-2">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}

          <div>
            <label className="text-gray-400 block mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Task description..."
              className="w-full resize-none bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="text-gray-400 block mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-3 text-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 block mb-2">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-3 text-white"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>In Review</option>
                <option>Done</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 block mb-2">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-3 text-white"
              >
                <option>Performance</option>
                <option>Policy</option>
                <option>Onboarding</option>
                <option>Culture</option>
                <option>Reporting</option>
                <option>Wellness</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 block mb-2">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-3 text-white"
              />
            </div>

          </div>

          {/* Assignee */}

          <div>
            <label className="text-gray-400 block mb-2">
              Assignee
            </label>

            <input
              type="text"
              name="assignee"
              value={form.assignee}
              onChange={handleChange}
              placeholder="Employee name"
              className="w-full bg-[#1b1d24] border border-[#272727] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 pt-4 border-t border-[#272727]">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-[#272727] text-gray-300 hover:border-gray-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Create Task
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;