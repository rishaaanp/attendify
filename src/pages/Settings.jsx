import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [username, setUsername] = useState(
    localStorage.getItem("profileName") || ""
  );
  const [email, setEmail] = useState(
    localStorage.getItem("profileEmail") || ""
  );

  // Sync theme with DOM
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Function to trigger live sync with Navbar
  const triggerNavbarUpdate = () => {
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Save profile instantly + sync Navbar
  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("profileName", username);
    localStorage.setItem("profileEmail", email);
    triggerNavbarUpdate(); // Tell Navbar to refresh
    alert("✅ Profile updated successfully!");
  };

  // ✅ Reset attendance only
  const handleResetAttendance = () => {
    if (confirm("Are you sure you want to reset all attendance data?")) {
      localStorage.removeItem("subjects");
      localStorage.removeItem("attendanceHistory");
      window.location.reload();
    }
  };

  // ✅ Reset full profile + update Navbar immediately
  const handleResetProfile = () => {
    if (confirm("Reset your entire profile and preferences?")) {
      localStorage.clear();
      setUsername("");
      setEmail("");
      triggerNavbarUpdate();
      window.location.reload();
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <header className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile and preferences
        </p>
      </header>

      {/* Profile Section */}
      <motion.section
        className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-medium mb-4">Profile</h3>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
        </form>
      </motion.section>

      {/* Theme Section */}
      <motion.section
        className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium mb-4">Theme</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 rounded-lg border ${
              theme === "light"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded-lg border ${
              theme === "dark"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            Dark
          </button>
        </div>
      </motion.section>

      {/* Data Reset Section */}
      <motion.section
        className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-medium mb-4">Data Management</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleResetAttendance}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Reset Attendance Data
          </button>
          <button
            onClick={handleResetProfile}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Reset Profile
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Settings;
