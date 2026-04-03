import { motion } from "framer-motion";
import { formatCurrency } from "../utils/helpers";

export default function SummaryCard({ title, amount, icon, color, isCurrency = true, index = 0 }) {
  const colorMap = {
    blue: {
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      light: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      text: "text-blue-100",
      subtext: "text-blue-200",
    },
    green: {
      bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      light: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
      text: "text-emerald-100",
      subtext: "text-emerald-200",
    },
    red: {
      bg: "bg-gradient-to-br from-rose-500 to-rose-600",
      light: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
      text: "text-rose-100",
      subtext: "text-rose-200",
    },
    purple: {
      bg: "bg-gradient-to-br from-violet-500 to-violet-600",
      light: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
      text: "text-violet-100",
      subtext: "text-violet-200",
    },
  };

  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className={`${c.bg} rounded-2xl p-5 shadow-lg flex items-center gap-4 cursor-default`}
    >
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div>
        <p className={`text-sm font-medium ${c.subtext}`}>{title}</p>
        <p className={`text-2xl font-bold ${c.text} mt-0.5`}>
          {isCurrency ? formatCurrency(amount) : amount}
        </p>
      </div>
    </motion.div>
  );
}