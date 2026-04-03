import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/transactions", label: "Transactions", icon: "💳" },
  { path: "/insights", label: "Insights", icon: "💡" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col py-6 px-3 z-40">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom info */}
      <div className="mt-auto px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">FinanceIQ v1.0</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Personal Finance Tracker</p>
      </div>
    </aside>
  );
}