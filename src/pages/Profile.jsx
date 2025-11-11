import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, User } from "lucide-react";

const Profile = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [name, setName] = useState(localStorage.getItem("name") || "Rishan");
  const [email, setEmail] = useState(localStorage.getItem("email") || "student@cusat.ac.in");

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    alert("Profile updated ✅");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <User size={28} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-semibold">Profile</h2>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
              name
            )}`}
            alt="Avatar"
            className="w-20 h-20 rounded-full border border-gray-300 dark:border-gray-600"
          />
          <div>
            <h3 className="text-xl font-semibold dark:text-gray-100">{name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{email}</p>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Theme Section */}
        <div className="flex items-center justify-between border-t pt-4 dark:border-gray-700">
          <div>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">Theme Preference</h4>
            <p className="text-lg font-medium">{theme === "dark" ? "Dark" : "Light"}</p>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
