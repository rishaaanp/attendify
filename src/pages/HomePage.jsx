import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Calendar, BarChart } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20
                    bg-gradient-to-b from-white to-blue-50 
                    dark:from-gray-900 dark:to-gray-800">
      
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 text-center"
      >
        Attendify
      </motion.h1>

      <p className="text-gray-600 dark:text-gray-300 mt-3 text-center max-w-xl">
        A smart, fast and beautiful attendance tracker for students.
        Track hours, stay above 75%, and manage your timetable effortlessly.
      </p>

      {/* Feature Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-2xl">
        <Feature icon={<CheckCircle />} title="Smart Attendance" desc="Mark by hours with auto percentage." />
        <Feature icon={<Calendar />} title="Timetable" desc="Track today’s schedule & ongoing classes." />
        <Feature icon={<BarChart />} title="Charts" desc="Visualize your performance with stats." />
        <Feature icon={<TrendingUp />} title="History" desc="View all past attendance records." />
      </div>

      {/* CTA Buttons */}
      <div className="mt-12 flex gap-4">
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>

        <Link
          to="/timetable"
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                     rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          View Timetable
        </Link>
      </div>

    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow"
  >
    <div className="text-blue-600 dark:text-blue-400 mb-2">{icon}</div>
    <h4 className="font-semibold dark:text-gray-100">{title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
  </motion.div>
);

export default HomePage;
