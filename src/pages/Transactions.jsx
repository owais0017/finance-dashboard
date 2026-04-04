import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteTransaction,
  setFilterType,
  setFilterCategory,
  setSearchQuery,
  setSortBy,
  setSortOrder,
} from "../store/slices/transactionsSlice";
import { ROLES, categories } from "../data/mockData";
import { formatCurrency, exportToCSV, exportToJSON } from "../utils/helpers";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const dispatch = useDispatch();
  const { items, filterType, filterCategory, searchQuery, sortBy, sortOrder } =
    useSelector((state) => state.transactions);
  const { role } = useSelector((state) => state.auth);
  const isAdmin = role === ROLES.ADMIN;

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  let filtered = items.filter((t) => {
    const matchType = filterType === "all" || t.type === filterType;
    const matchCategory = filterCategory === "all" || t.category === filterCategory;
    const matchSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchCategory && matchSearch;
  });

  filtered = [...filtered].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === "amount") {
      valA = Math.abs(a.amount);
      valB = Math.abs(b.amount);
    }
    if (sortBy === "date") {
      valA = new Date(a.date);
      valB = new Date(b.date);
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  const categoryIcons = {
    Income: "💚",
    Food: "🍔",
    Housing: "🏠",
    Utilities: "⚡",
    Entertainment: "🎬",
    Health: "❤️",
    Shopping: "🛍️",
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {filtered.length} of {items.length} transactions
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => exportToCSV(filtered)}
            className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            📥 CSV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => exportToJSON(filtered)}
            className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            📥 JSON
          </motion.button>
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900 transition-shadow"
            >
              <span className="text-lg">+</span> Add Transaction
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-wrap gap-3"
      >
        <div className="flex-1 min-w-48 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => dispatch(setFilterType(e.target.value))}
          className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => dispatch(setFilterCategory(e.target.value))}
          className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="description">Sort by Name</option>
        </select>
        <button
          onClick={() =>
            dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))
          }
          className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
          <div className="col-span-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Description
          </div>
          <div className="col-span-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Date
          </div>
          <div className="col-span-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Category
          </div>
          <div className="col-span-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Type
          </div>
          <div className="col-span-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Amount
          </div>
          {isAdmin && (
            <div className="col-span-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Actions
            </div>
          )}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No transactions found
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: index * 0.03 }}
                className="grid grid-cols-12 gap-4 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors items-center"
              >
                {/* Description */}
                <div className="col-span-4 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${
                      t.type === "income"
                        ? "bg-emerald-50 dark:bg-emerald-900/20"
                        : "bg-rose-50 dark:bg-rose-900/20"
                    }`}
                  >
                    {categoryIcons[t.category] || "💸"}
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                    {t.description}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                  {t.date}
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {t.category}
                  </span>
                </div>

                {/* Type */}
                <div className="col-span-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      t.type === "income"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                    }`}
                  >
                    {t.type === "income" ? "↑ Income" : "↓ Expense"}
                  </span>
                </div>

                {/* Amount */}
                <div
                  className={`col-span-1 text-sm font-bold ${
                    t.type === "income" ? "text-emerald-600" : "text-rose-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </div>

                {/* Actions */}
                {isAdmin && (
                  <div className="col-span-1 flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(t)}
                      className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center justify-center text-xs"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors flex items-center justify-center text-xs"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <TransactionModal
            onClose={handleCloseModal}
            editingTransaction={editingTransaction}
          />
        )}
      </AnimatePresence>
    </div>
  );
}