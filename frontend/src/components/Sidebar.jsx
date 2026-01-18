import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  IndianRupee,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/admin-dashboard" },
  { name: "Employees", icon: Users, path: "/admin-dashboard/employees" },
  { name: "Departments", icon: Building2, path: "/admin-dashboard/departments" },
  { name: "Leaves", icon: CalendarDays, path: "/admin-dashboard/leaves" },
  { name: "Salary", icon: IndianRupee, path: "/admin-dashboard/salary" },
  { name: "Setting", icon: Settings, path: "/admin-dashboard/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 flex flex-col">

      {/* 🔥 Interactive Title */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer mb-10 group"
      >
        <h1 className="text-xl font-bold leading-tight group-hover:text-violet-400 transition">
          Employee Management
          <br />
          System (EMS)
        </h1>
        <div className="h-1 w-0 group-hover:w-full bg-violet-500 transition-all duration-300 mt-2 rounded"></div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-violet-700 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
