import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Laptop2, Trash2, RefreshCcw, Info } from "lucide-react";

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme changes
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Reset attendance data
  const resetAttendance = () => {
    if (confirm("Are you sure you want to reset all attendance data?")) {
      localStorage.removeItem("subjects");
      alert("✅ All attendance data has been cleared!");
      window.location.reload();
    }
  };

  // Reset profile
  const resetProfile = () => {
    if (confirm("Are you sure you want to reset your profile information?")) {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      alert("✅ Profile information has been reset!");
      window.location.reload();
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      {/* Theme Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Theme Preference</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              theme === "light"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <Sun size={18} /> Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              theme === "dark"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <Moon size={18} /> Dark
          </button>
          <button
            onClick={() => {
              const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;
              setTheme(prefersDark ? "dark" : "light");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Laptop2 size={18} /> System Default
          </button>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Data Management</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetAttendance}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            <Trash2 size={18} /> Reset Attendance Data
          </button>
          <button
            onClick={resetProfile}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
          >
            <RefreshCcw size={18} /> Reset Profile
          </button>
        </div>
      </div>

      {/* App Info Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-lg font-medium mb-3">About Attendify</h3>
        <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
          <Info size={18} className="mt-1" />
          <p>
            Attendify is a smart attendance tracking app built using{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              React, Tailwind, and Recharts
            </span>
            . Manage your subjects, visualize progress, and stay organized.
          </p>
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
          Version 1.0.0 © {new Date().getFullYear()} Rishan
        </p>
      </div>
    </motion.div>
  );
};

export default Settings;
