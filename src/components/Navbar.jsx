import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Apply theme class to <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Attendify</h1>
      <button
        onClick={toggleTheme}
        className="px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
