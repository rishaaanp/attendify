import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Reports = () => {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [
    { id: 1, name: "Artificial Intelligence", attended: 12, total: 15 },
    { id: 2, name: "Data Structures", attended: 10, total: 12 },
    { id: 3, name: "Machine Learning", attended: 8, total: 10 },
  ];

  const COLORS = ["#3B82F6", "#22C55E", "#FACC15", "#EF4444"];

  const overallPercentage = () => {
    const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
    const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
    return totalClasses === 0
      ? 0
      : Math.round((totalAttended / totalClasses) * 100);
  };

  const chartData = subjects.map((s) => ({
    name: s.name,
    percentage: s.total === 0 ? 0 : Math.round((s.attended / s.total) * 100),
  }));

  const overallData = [
    { name: "Attended", value: overallPercentage() },
    { name: "Missed", value: 100 - overallPercentage() },
  ];

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Reports & Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {new Date().toDateString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Overall Attendance
          </p>
          <h3 className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">
            {overallPercentage()}%
          </h3>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Subjects
          </p>
          <h3 className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">
            {subjects.length}
          </h3>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Synced
          </p>
          <h3 className="text-lg font-medium mt-2">
            {new Date().toLocaleTimeString()}
          </h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-medium mb-4">
            Attendance by Subject (%)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barSize={40}>
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  background: "#1F2937",
                  border: "none",
                  color: "white",
                }}
              />
              <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-medium mb-4">Overall Attendance Split</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={overallData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {overallData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1F2937",
                  border: "none",
                  color: "white",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reports;
