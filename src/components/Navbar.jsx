import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/slices/themeSlice";
import { setRole } from "../store/slices/authSlice";
import { ROLES } from "../data/mockData";
import { motion } from "framer-motion";

export default function Navbar() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const { role } = useSelector((state) => state.auth);

  return (
    <nav className="h-16 px-6 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          FinanceIQ
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">

        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Role:</span>
          <select
            value={role}
            onChange={(e) => dispatch(setRole(e.target.value))}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.VIEWER}>Viewer</option>
          </select>
        </div>

        {/* Role Badge */}
        <motion.span
          key={role}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:block ${
            role === ROLES.ADMIN
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {role === ROLES.ADMIN ? "⚡ Admin" : "👁 Viewer"}
        </motion.span>

        {/* Dark Mode Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(toggleDarkMode())}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <motion.span
            key={darkMode ? "dark" : "light"}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className="text-lg"
          >
            {darkMode ? "☀️" : "🌙"}
          </motion.span>
        </motion.button>
      </div>
    </nav>
  );
}