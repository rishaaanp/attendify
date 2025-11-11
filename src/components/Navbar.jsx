import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Attendify
        </div>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Dashboard
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Reports
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Settings
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-600" />
            )}
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <img
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
                  "rishan"
                )}`}
                alt="User avatar"
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
              />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Rishan
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      student@cusat.ac.in
                    </p>
                  </div>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    <User size={16} /> Profile
                  </button>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {menuOpen ? (
            <X size={22} className="text-gray-700 dark:text-gray-200" />
          ) : (
            <Menu size={22} className="text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-3 space-y-3"
          >
            <a
              href="#"
              className="block hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              Reports
            </a>
            <a
              href="#"
              className="block hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </a>
            <button
              onClick={() => {
                toggleTheme();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} className="text-yellow-400" /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} className="text-gray-600" /> Dark Mode
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
