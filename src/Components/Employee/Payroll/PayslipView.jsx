import React from "react";
import { Download } from "lucide-react";
import { payrollData } from "./payrollData";

const PayslipView = () => {
  const gross = payrollData.earnings.reduce(
    (a, b) => a + b.amount,
    0
  );

  const deduction = payrollData.deductions.reduce(
    (a, b) => a + b.amount,
    0
  );

  const net = gross - deduction;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-[#10111C] border border-[#1E2235] rounded-2xl p-10">
        <h1 className="text-center text-3xl font-bold text-white">
          WorkZen
        </h1>

        <p className="text-center text-gray-400 mt-2">
          AI-Powered Employee Management System
        </p>

        <div className="border-t border-slate-800 my-8"></div>

        <div className="grid md:grid-cols-2 gap-8 text-white">
          <div>
            <p className="text-gray-400">Employee Name</p>
            <p>{payrollData.employee.name}</p>
          </div>

          <div>
            <p className="text-gray-400">Employee ID</p>
            <p>{payrollData.employee.id}</p>
          </div>

          <div>
            <p className="text-gray-400">Department</p>
            <p>{payrollData.employee.department}</p>
          </div>

          <div>
            <p className="text-gray-400">Pay Period</p>
            <p>{payrollData.employee.period}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Earnings
            </h3>

            {payrollData.earnings.map((item) => (
              <div
                key={item.name}
                className="flex justify-between text-white mb-3"
              >
                <span>{item.name}</span>
                <span>₹{item.amount.toLocaleString()}</span>
              </div>
            ))}

            <div className="flex justify-between border-t border-slate-700 pt-4 mt-4 text-white font-bold">
              <span>Gross Total</span>
              <span>₹{gross.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Deductions
            </h3>

            {payrollData.deductions.map((item) => (
              <div
                key={item.name}
                className="flex justify-between text-white mb-3"
              >
                <span>{item.name}</span>
                <span>₹{item.amount.toLocaleString()}</span>
              </div>
            ))}

            <div className="flex justify-between border-t border-slate-700 pt-4 mt-4 text-white font-bold">
              <span>Total Deductions</span>
              <span>₹{deduction.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-[#191b2c] border border-[#1E2235] rounded-xl p-5 flex justify-between items-center">
          <h3 className="text-2xl text-white font-semibold">
            Net Pay
          </h3>

          <span className="text-4xl font-bold text-indigo-500">
            ₹{net.toLocaleString()}
          </span>
        </div>

        <button className="mt-10 flex items-center gap-2 mx-auto text-white hover:text-indigo-400">
          <Download size={18} />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PayslipView;