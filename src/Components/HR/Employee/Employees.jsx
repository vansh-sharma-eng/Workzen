import React from "react";

import WelcomeBanner from "../HrDashboard/WelcomeBanner";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeTable from "./EmployeeTable";

import { ChevronLeft, ChevronRight } from "lucide-react";

const Employees = () => {
  return (
    <div className="min-h-screen w-[100%] bg-[#0F111A] text-white">


      <main >

       

        <div className="mt-2">
          <EmployeeFilters />
        </div>

        
        <div className="mt-6">
          <EmployeeTable />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">

          <p className="text-xs text-gray-400">
            Showing <span className="text-white font-semibold">1</span> –
            <span className="text-white font-semibold"> 8 </span>
            of
            <span className="text-white font-semibold"> 20 </span>
            employees
          </p>

          <div className="flex items-center gap-2 text-xs">

            <button className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035] flex items-center justify-center">
              <ChevronLeft size={13} />
            </button>

            <button className="w-9 h-9 rounded-lg bg-indigo-600">
              1
            </button>

            <button className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035]">
              2
            </button>

            <button className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035]">
              3
            </button>

            <button className="w-9 h-9 rounded-lg border border-[#1A2035] bg-[#13141F] hover:bg-[#1A2035] flex items-center justify-center">
              <ChevronRight size={13} />
            </button>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Employees;