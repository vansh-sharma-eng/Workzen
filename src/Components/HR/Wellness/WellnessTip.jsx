import React, { useState } from "react";
import { Send, Heart, Coffee, Dumbbell, Moon, Smile, CheckCircle2 } from "lucide-react";

const templates = [
  {
    id: 1,
    icon: Heart,
    title: "Mental Health",
    message: "Take a few minutes today to relax and recharge. Your well-being matters.",
  },
  {
    id: 2,
    icon: Coffee,
    title: "Break Reminder",
    message: "Remember to take a short break every 90 minutes to stay productive.",
  },
  {
    id: 3,
    icon: Dumbbell,
    title: "Stay Active",
    message: "A quick walk or stretching session can improve your focus and energy.",
  },
  {
    id: 4,
    icon: Moon,
    title: "Healthy Sleep",
    message: "Aim for at least 7–8 hours of sleep to improve your overall wellness.",
  },
];

const DEFAULT_MESSAGE =
  "Hi Team 👋\n\nRemember to take regular breaks, stay hydrated, and don't hesitate to reach out if you're feeling overwhelmed.\n\nYour health comes first! 💙";

const WellnessTip = () => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [activeId, setActiveId] = useState(null);
  const [sent, setSent] = useState(false);

  const handleTemplate = (tip) => {
    setMessage(tip.message);
    setActiveId(tip.id);
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="bg-[#151822] border border-[#1e2333] rounded-2xl p-4 flex flex-col gap-6 h-155">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-blue-500/15 flex items-center justify-center shrink-0">
          <Smile className="text-blue-400" size={17} />
        </div>
        <div>
          <h2 className="text-md font-semibold text-white leading-tight">Send Wellness Tip</h2>
          <p className="text-[10px] text-gray-400 mt-0.5">Encourage healthy habits across your team</p>
        </div>
      </div>

      {/* Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {templates.map((tip) => {
          const Icon = tip.icon;
          const isActive = activeId === tip.id;
          return (
            <button
              key={tip.id}
              onClick={() => handleTemplate(tip)}
              className={`flex items-center gap-3 rounded-xl border p-2 text-left transition-all duration-150
                ${isActive
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-[#1e2333] bg-[#10141f] hover:border-blue-500/50"
                }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 
                ${isActive ? "bg-blue-500/25" : "bg-blue-500/10"}`}>
                <Icon size={14} className="text-blue-400" />
              </div>
              <div className="min-w-0">
                <h3 className={`text-xs font-medium ${isActive ? "text-blue-300" : "text-white"}`}>
                  {tip.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{tip.message}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Textarea */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Message
          </label>
          <span className="text-xs text-gray-600">{message.length} chars</span>
        </div>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => { setMessage(e.target.value); setActiveId(null); }}
          placeholder="Write your wellness tip here..."
          className="w-full rounded-xl border border-[#1e2333] bg-[#10141f] p-4 text-sm text-white placeholder-gray-600 outline-none resize-none focus:border-blue-500 transition-colors leading-relaxed"
        />
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => { setMessage(DEFAULT_MESSAGE); setActiveId(null); }}
          className="flex-1 rounded-xl border border-[#1e2333] bg-[#10141f] py-2.5 text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleSend}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white transition-all duration-200
            ${sent ? "bg-green-600 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {sent ? (
            <><CheckCircle2 size={16} /> Sent!</>
          ) : (
            <><Send size={15} /> Send Tip</>
          )}
        </button>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/8 px-4 py-3">
        <span className="text-base leading-none mt-0.5">💡</span>
        <p className="text-xs text-green-400 leading-relaxed">
          Tips are delivered via email and the employee dashboard notification center.
        </p>
      </div>

    </div>
  );
};

export default WellnessTip;