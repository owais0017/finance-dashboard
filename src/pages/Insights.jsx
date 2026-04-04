import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, Radar, Legend,
} from "recharts";
import { getSummary, getMonthlyData, getCategoryData, formatCurrency } from "../utils/helpers";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function Insights() {
  const transactions = useSelector((state) => state.transactions.items);
  const summary = getSummary(transactions);
  const monthlyData = getMonthlyData(transactions);
  const categoryData = getCategoryData(transactions);

  // Highest spending category
  const highestCategory = categoryData.reduce(
    (max, cat) => (cat.value > (max?.value || 0) ? cat : max),
    null
  );

  // Lowest spending category
  const lowestCategory = categoryData.reduce(
    (min, cat) => (cat.value < (min?.value || Infinity) ? cat : min),
    null
  );

  // Savings rate
  const savingsRate = summary.income > 0
    ? (((summary.income - summary.expenses) / summary.income) * 100).toFixed(1)
    : 0;

  // Average monthly expense
  const avgMonthlyExpense = monthlyData.length > 0
    ? monthlyData.reduce((sum, m) => sum + m.expenses, 0) / monthlyData.length
    : 0;

  // Average monthly income
  const avgMonthlyIncome = monthlyData.length > 0
    ? monthlyData.reduce((sum, m) => sum + m.income, 0) / monthlyData.length
    : 0;

  // Monthly net savings
  const monthlySavings = monthlyData.map((m) => ({
    month: m.month,
    savings: m.income - m.expenses,
    income: m.income,
    expenses: m.expenses,
  }));

  // Radar data for category spending
  const radarData = categoryData.map((c) => ({
    category: c.name,
    amount: c.value,
    average: avgMonthlyExpense / categoryData.length,
  }));

  const insightCards = [
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      icon: "💰",
      color: "from-emerald-500 to-emerald-600",
      desc: savingsRate >= 20
        ? "Great job! You're saving well."
        : "Try to save at least 20% of income.",
    },
    {
      title: "Highest Spending",
      value: highestCategory?.name || "N/A",
      icon: "📊",
      color: "from-rose-500 to-rose-600",
      desc: highestCategory
        ? `You spent ${formatCurrency(highestCategory.value)} on ${highestCategory.name}`
        : "No expense data",
    },
    {
      title: "Avg Monthly Income",
      value: formatCurrency(avgMonthlyIncome),
      icon: "📈",
      color: "from-blue-500 to-blue-600",
      desc: "Average income per month",
    },
    {
      title: "Avg Monthly Expense",
      value: formatCurrency(avgMonthlyExpense),
      icon: "📉",
      color: "from-violet-500 to-violet-600",
      desc: "Average spending per month",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Insights</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Smart observations from your financial data.
        </p>
      </motion.div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card, index) => (
          <motion.div
            key={card.title}
            {...fadeUp(index * 0.1)}
            whileHover={{ scale: 1.03 }}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 shadow-lg text-white`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                Insight
              </span>
            </div>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wide">
              {card.title}
            </p>
            <p className="text-xl font-bold mt-1">{card.value}</p>
            <p className="text-xs text-white/70 mt-2">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Monthly Savings Bar Chart */}
        <motion.div
          {...fadeUp(0.2)}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
              Monthly Savings
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              Net per month
            </span>
          </div>
          {monthlySavings.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlySavings}>
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
                <Bar dataKey="savings" name="Net Savings" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          {...fadeUp(0.3)}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
              Spending Pattern
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              By Category
            </span>
          </div>
          {radarData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                <Radar
                  name="Your Spending"
                  dataKey="amount"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
                <Legend />
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Monthly Comparison Table */}
      <motion.div
        {...fadeUp(0.4)}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            Monthly Comparison
          </h2>
          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            All months
          </span>
        </div>
        {monthlyData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-400 text-sm">No data available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide pb-3">Month</th>
                  <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide pb-3">Income</th>
                  <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide pb-3">Expenses</th>
                  <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide pb-3">Net Savings</th>
                  <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide pb-3">Savings Rate</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((m, index) => {
                  const net = m.income - m.expenses;
                  const rate = m.income > 0 ? ((net / m.income) * 100).toFixed(1) : 0;
                  return (
                    <motion.tr
                      key={m.month}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 text-sm font-semibold text-gray-800 dark:text-white">{m.month}</td>
                      <td className="py-3 text-sm text-right text-emerald-600 font-medium">{formatCurrency(m.income)}</td>
                      <td className="py-3 text-sm text-right text-rose-500 font-medium">{formatCurrency(m.expenses)}</td>
                      <td className={`py-3 text-sm text-right font-bold ${net >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                        {net >= 0 ? "+" : ""}{formatCurrency(net)}
                      </td>
                      <td className="py-3 text-right">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          Number(rate) >= 20
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}>
                          {rate}%
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Observations */}
      <motion.div
        {...fadeUp(0.5)}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
          💡 Smart Observations
        </h2>
        <div className="space-y-3">
          {[
            {
              icon: "🏆",
              color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
              text: highestCategory
                ? `Your highest spending category is ${highestCategory.name} at ${formatCurrency(highestCategory.value)}.`
                : "No expense data available.",
            },
            {
              icon: "💡",
              color: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
              text: lowestCategory
                ? `Your lowest spending category is ${lowestCategory.name} at ${formatCurrency(lowestCategory.value)}.`
                : "No expense data available.",
            },
            {
              icon: "📊",
              color: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400",
              text: `Your overall savings rate is ${savingsRate}%. ${
                Number(savingsRate) >= 20
                  ? "You're on track with healthy savings!"
                  : "Consider reducing expenses to improve your savings rate."
              }`,
            },
            {
              icon: "📅",
              color: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
              text: `You average ${formatCurrency(avgMonthlyExpense)} in expenses and ${formatCurrency(avgMonthlyIncome)} in income per month.`,
            },
          ].map((obs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`flex items-start gap-3 p-3 rounded-xl ${obs.color}`}
            >
              <span className="text-lg flex-shrink-0">{obs.icon}</span>
              <p className="text-sm font-medium">{obs.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}