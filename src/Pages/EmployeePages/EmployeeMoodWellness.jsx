import React, { useState } from "react";

const moods = [
  { id: 1, emoji: "😄", label: "Great" },
  { id: 2, emoji: "🙂", label: "Good" },
  { id: 3, emoji: "😐", label: "Okay" },
  { id: 4, emoji: "😟", label: "Stressed" },
  { id: 5, emoji: "😞", label: "Burned Out" },
];

const EmployeeMoodWellness = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) {
      alert("Please select your mood.");
      return;
    }

    const data = {
      mood: selectedMood.label,
      feedback: message,
    };

    console.log(data);

    alert("Wellness response submitted successfully!");
  };

  return (
    <div className="h-screen  flex justify-center items-center px-4 py-2 overflow-y-hidden">
      <div className="w-120 h-120  bg-[#0B1020] border border-gray-800 -mt-10 rounded-md p-10 shadow-2xl">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-white text-xl font-bold">
            How are you feeling today, John Doe?
          </h1>

          <p className="text-gray-400 mt-1 text-md">
            Your wellbeing matters to us
          </p>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-1">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood)}
              className={`bg-[#121827] rounded-md py-2 mt-5 flex flex-col items-center justify-center transition-all duration-300 border
              ${
                selectedMood?.id === mood.id
                  ? "border-indigo-500 scale-105 shadow-lg shadow-indigo-500/20"
                  : "border-transparent hover:border-indigo-400"
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>

              <span className="text-white font-semibold text-xs mt-2">
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {/* Textarea */}
        <div className="mt-5">
          <label className="text-white font-semibold text-md block mb-4">
            Want to share more? (optional, anonymous)
          </label>

          <textarea
            rows="3"
            placeholder="Tell us how you're feeling..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#121827] border border-gray-700 rounded-xl px-5 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-5 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-semibold py-2 rounded-xl text-md"
        >
          Submit
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-4 text-xs">
          Your response is private. HR only sees team-level trends.
        </p>
      </div>
    </div>
  );
};

export default EmployeeMoodWellness;