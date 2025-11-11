import { motion } from "framer-motion";

const History = () => {
  const history = JSON.parse(localStorage.getItem("attendanceHistory")) || [];

  const clearHistory = () => {
    if (confirm("Clear all attendance history?")) {
      localStorage.removeItem("attendanceHistory");
      // simple reload to refresh UI
      window.location.reload();
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Attendance History</h2>
        <button
          onClick={clearHistory}
          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Clear History
        </button>
      </div>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-gray-600 dark:text-gray-400">
          No attendance history yet. Mark some attendance to see records here.
        </div>
      ) : (
        <div className="space-y-3">
          {history
            .slice()
            .reverse()
            .map((r) => (
              <div
                key={r.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center justify-between"
              >
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(r.timestamp).toLocaleString()}
                  </div>
                  <div className="font-medium dark:text-gray-100">
                    {r.subjectName}
                  </div>
                  <div className={`text-sm mt-1 ${r.status === "present" ? "text-green-600" : "text-red-600"}`}>
                    {r.status.toUpperCase()}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.id}</div>
              </div>
            ))}
        </div>
      )}
    </motion.div>
  );
};

export default History;
