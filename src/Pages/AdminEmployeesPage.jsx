import EmployeeFilter from "../Components/Employees/EmployeeFilter";
import StatsCards from "../Components/Employees/StatsCards";
import Members from "../Components/Employees/Members";
import { useState } from "react";
import AdminHeader from "../Components/layout/AdminHeader";

const AdminEmployeesPage = ({data}) => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="h-screen w-full bg-[#0d0f14] select-none">
    <div className="-ml-58 -mt-6 w-screen">
       <AdminHeader data = {data}/>
    </div>
      <EmployeeFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <StatsCards />
      <Members activeFilter={activeFilter} />
    </div>
  );
};

export default AdminEmployeesPage;