import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("attendanceHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const clearHistory = () => {
    if (confirm("Clear all attendance history?")) {
      localStorage.removeItem("attendanceHistory");
      setHistory([]);
    }
  };

  const formatTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Attendance History</h2>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-gray-600 dark:text-gray-400">
          No attendance history yet.
        </div>
      ) : (
        <div className="space-y-3">
          {history
            .slice()
            .reverse()
            .map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  
                  {/* Left side */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {formatTime(r.timestamp)}
                    </p>

                    <p className="text-lg font-semibold dark:text-gray-100">
                      {r.subjectName}
                    </p>

                    <p
                      className={`text-sm font-medium mt-1 ${
                        r.status === "present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {r.status.toUpperCase()} • {r.hours} hr
                      {r.hours > 1 ? "s" : ""}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
        </div>
      )}
    </motion.div>
  );
};

export default History;
