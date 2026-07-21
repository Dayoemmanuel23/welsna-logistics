import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Mail,
  Users,
  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Shipments",
    icon: Package,
    path: "/admin/shipments",
  },
  {
    title: "Quotes",
    icon: FileText,
    path: "/admin/quotes",
  },
  {
    title: "Contacts",
    icon: Mail,
    path: "/admin/contacts",
  },
  {
    title: "Users",
    icon: Users,
    path: "/admin/users",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          Welsna Admin
        </h1>

        <p className="text-sm text-slate-400">
          Logistics Management
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-cyan-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {menu.title}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-2 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}