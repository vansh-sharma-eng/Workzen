// AdminOverviewPage.jsx
import AdminSidebar from "../Components/layout/AdminSidebar";
import AdminHeader from "../Components/layout/AdminHeader";
import AdminDashboard from "../Components/Dashboard/AdminDashboard";

const AdminOverviewPage = () => {
  return (
    <div className="app-shell bg-[#0d0f14]">
      <AdminSidebar />
      <div className="main-content">
        <AdminHeader />
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminOverviewPage;