import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-8xl mb-4">💸</p>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          404
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Oops! This page doesn't exist.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-500 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
        >
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}