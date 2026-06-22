import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const NewOKRModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    department: "HR",
    startDate: "",
    dueDate: "",
    priority: "Medium",
    status: "Not Started",
  });

  const [keyResults, setKeyResults] = useState([
    {
      text: "",
      progress: 0,
    },
  ]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addKeyResult = () => {
    setKeyResults([
      ...keyResults,
      {
        text: "",
        progress: 0,
      },
    ]);
  };

  const updateKeyResult = (index, value) => {
    const updated = [...keyResults];
    updated[index].text = value;
    setKeyResults(updated);
  };

  const handleSubmit = () => {
    const newOKR = {
      id: Date.now(),
      title: formData.title,
      owner: formData.owner,
      department: formData.department,
      progress: 0,
      dueDate: formData.dueDate,
      status: formData.status,
      statusColor:
        formData.status === "At Risk"
          ? "amber"
          : "emerald",
      objectives: keyResults.filter(
        (item) => item.text.trim() !== ""
      ),
    };

    onCreate(newOKR);

    onClose();

    setFormData({
      title: "",
      owner: "",
      department: "HR",
      startDate: "",
      dueDate: "",
      priority: "Medium",
      status: "Not Started",
    });

    setKeyResults([{ text: "", progress: 0 }]);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center  p-4">
      <div className="w-full max-w-md h-auto bg-[#0B1023] border border-[#1A2138] rounded-2xl p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-sm font-bold text-white">
            Create New OKR
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400" size={15}  />
          </button>
        </div>

        <div className="space-y-2">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Objective Title"
            className="w-full bg-[#121A33] border border-[#222B45] rounded-md p-2 text-xs text-white"
          />

          <input
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            placeholder="Owner Name"
            className="w-full bg-[#121A33] border border-[#222B45] rounded-md p-2 text-xs text-white"
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full bg-[#121A33] border border-[#222B45] rounded-xl p-2 text-xs text-white"
          >
            <option>HR</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>

          <div className=" flex  gap-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="bg-[#121A33] border border-[#222B45] rounded-md p-2 w-50 text-xs text-white"
            />

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="bg-[#121A33] border border-[#222B45] rounded-md p-2 w-50 text-xs text-white"
            />
          </div>

        <div className="flex gap-2">
            <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-[#121A33] border border-[#222B45] rounded-md p-2  text-xs text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-[#121A33] border border-[#222B45] rounded-md p-2 text-xs text-white"
          >
            <option>Not Started</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Completed</option>
          </select>

        </div>

          <div>
            <h3 className="text-white text-md mb-4">
              Key Results
            </h3>

            {keyResults.map((kr, index) => (
              <input
                key={index}
                value={kr.text}
                onChange={(e) =>
                  updateKeyResult(
                    index,
                    e.target.value
                  )
                }
                placeholder={`Key Result ${index + 1}`}
                className="min-w-[30%] bg-[#121A33] border border-[#222B45] rounded-md p-2 text-xs 
                 text-white mr-2 mb-3"
              />
            ))}

            <button
              onClick={addKeyResult}
              className="flex items-center gap-2 text-indigo-400"
            >
              <Plus size={18} />
              Add Key Result
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-xs border border-[#2A314D] text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-xs bg-indigo-500 hover:bg-indigo-600 text-white font-semibold"
          >
            Create OKR
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOKRModal;