import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: localStorage.getItem("profileName") || "Guest User",
    email: localStorage.getItem("profileEmail") || "guest@example.com",
  });
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ✅ Auto-update when localStorage changes (after reset/save)
  useEffect(() => {
    const updateProfile = () => {
      setProfile({
        name: localStorage.getItem("profileName") || "Guest User",
        email: localStorage.getItem("profileEmail") || "guest@example.com",
      });
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", updateProfile);
    updateProfile(); // Initial load
    return () => window.removeEventListener("storage", updateProfile);
  }, []);

  return (
    <motion.div
      className="px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Profile</h2>
        <p className="text-gray-600 dark:text-gray-400">
          View your profile and preferences
        </p>
      </header>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow max-w-lg mx-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
              profile.name
            )}`}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border border-gray-300 dark:border-gray-700 mb-3"
          />
          <h3 className="text-xl font-semibold dark:text-gray-100">
            {profile.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Full Name</span>
            <span className="text-gray-800 dark:text-gray-200">
              {profile.name}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Email</span>
            <span className="text-gray-800 dark:text-gray-200">
              {profile.email}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Theme Preference</span>
            <span className="text-gray-800 dark:text-gray-200 capitalize">
              {theme}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
