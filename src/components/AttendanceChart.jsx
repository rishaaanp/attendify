import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const AttendanceChart = ({ data }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 🌓 Watch for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };
    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  // Custom tooltip with proper colors
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const textColor = theme === "dark" ? "#f5f5f5" : "#111827";
      const bgColor = theme === "dark" ? "#1f2937" : "#ffffff";
      const borderColor = theme === "dark" ? "#374151" : "#e5e7eb";

      return (
        <div
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: "8px",
            padding: "8px 10px",
            color: textColor,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <p className="text-sm font-semibold" style={{ color: textColor }}>
            {label}
          </p>
          <p className="text-sm" style={{ color: textColor }}>
            Attendance: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Transform data for chart
  const chartData = data.map((subject) => ({
    name: subject.name,
    attendance:
      subject.total > 0 ? Math.round((subject.attended / subject.total) * 100) : 0,
  }));

  return (
    <div className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Attendance Overview
      </h3>
      {chartData.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No data to display yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: theme === "dark" ? "#d1d5db" : "#374151" }}
            />
            <YAxis
              tick={{ fill: theme === "dark" ? "#d1d5db" : "#374151" }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="attendance"
              radius={[8, 8, 0, 0]}
              fill={theme === "dark" ? "#60a5fa" : "#2563eb"}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AttendanceChart;
