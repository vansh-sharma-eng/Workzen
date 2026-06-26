import React from "react";
import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
} from "lucide-react";

const AccessScopeCard = () => {
  const allowedPermissions = [
    "View all employees",
    "Manage attendance",
    "Approve leave requests",
    "View payroll reports",
  ];

  const restrictedPermissions = [
    "Delete company",
    "Manage billing",
    "Super Admin settings",
  ];

  return (
    <div className=" p-5">

     

      <div className="mb-4">
        <h2 className="text-md font-bold text-white">
          HR Access Scope
        </h2>

        <p className="text-gray-400  text-xs">
          Permissions available for your HR account
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">

       

        <div className="bg-[#262b36] border border-[#343948] rounded-md h-60 p-5">

          <h3 className="text-md font-semibold text-green-400 mb-6">
            Allowed Permissions
          </h3>

          <div className="space-y-3">

            {allowedPermissions.map((permission) => (
              <div
                key={permission}
                className="flex items-center gap-4"
              >
                <CheckCircle2
                  size={18}
                  className="text-green-500 shrink-0"
                />

                <span className="text-gray-200 text-sm">
                  {permission}
                </span>
              </div>
            ))}

          </div>
        </div>

        

        <div className="bg-[#262b36] border border-[#343948] rounded-md p-4">

          <h3 className="text-md font-semibold text-red-400 mb-2">
            Restricted Permissions
          </h3>

          <div className="space-y-2">

            {restrictedPermissions.map((permission) => (
              <div
                key={permission}
                className="flex items-center gap-4"
              >
                <XCircle
                  size={18}
                  className="text-red-500 shrink-0"
                />

                <span className="text-gray-300 text-sm">
                  {permission}
                </span>
              </div>
            ))}

          </div>

    
          <div className="mt-4  bg-[#3b2d18] border border-[#6b4d16] rounded-md h-18 p-2 flex gap-4">

            <ShieldAlert
              size={17}
              className="text-yellow-400 shrink-0 mt-1"
            />

            <div>
              <h4 className="text-yellow-300 text-xs font-semibold">
                Admin Only
              </h4>

              <p className="text-gray-300 text-xs  leading-5">
                Billing, company settings, user roles, and
                Super Admin controls are restricted to the
                Company Administrator.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AccessScopeCard;