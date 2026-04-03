import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie,
  Cell, Legend,
} from "recharts";
import SummaryCard from "../components/SummaryCard";
import { getSummary, getMonthlyData, getCategoryData, formatCurrency } from "../utils/helpers";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Dashboard() {
  const transactions = useSelector((state) => state.transactions.items);
  const summary = getSummary(transactions);
  const monthlyData = getMonthlyData(transactions);
  const categoryData = getCategoryData(transactions);

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <motion.div {...fadeUp}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Good day! 👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Here's your financial overview at a glance.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Balance" amount={summary.balance} icon="💰" color="blue" index={0} />
        <SummaryCard title="Total Income" amount={summary.income} icon="📈" color="green" index={1} />
        <SummaryCard title="Total Expenses" amount={summary.expenses} icon="📉" color="red" index={2} />
        <SummaryCard title="Transactions" amount={summary.transactionCount} icon="🔄" color="purple" index={3} isCurrency={false} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Area Chart */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
              Income vs Expenses
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              Monthly
            </span>
          </div>
          {monthlyData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#colorIncome)" strokeWidth={2.5} name="Income" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#colorExpenses)" strokeWidth={2.5} name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
              Spending Breakdown
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              By Category
            </span>
          </div>
          {categoryData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            Recent Transactions
          </h2>
          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            Last 5
          </span>
        </div>
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-400 text-sm">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 5).map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    t.type === "income"
                      ? "bg-emerald-50 dark:bg-emerald-900/20"
                      : "bg-rose-50 dark:bg-rose-900/20"
                  }`}>
                    {t.type === "income" ? "💚" : "🔴"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{t.description}</p>
                    <p className="text-xs text-gray-400">{t.date} · {t.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${
                    t.type === "income" ? "text-emerald-600" : "text-rose-500"
                  }`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

    </div>
  );
}