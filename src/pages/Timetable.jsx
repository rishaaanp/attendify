import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Timetable = () => {
  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("timetable");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    subject: "",
    day: "Monday",
    start: "",
    end: "",
  });

  useEffect(() => {
    localStorage.setItem("timetable", JSON.stringify(timetable));
  }, [timetable]);

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.start || !formData.end)
      return alert("Please fill all fields.");

    const newClass = {
      id: Date.now(),
      ...formData,
    };

    setTimetable([...timetable, newClass]);
    setFormData({ subject: "", day: "Monday", start: "", end: "" });
  };

  const handleDelete = (id) => {
    setTimetable(timetable.filter((item) => item.id !== id));
  };

  const getClassesForDay = (day) =>
    timetable
      .filter((cls) => cls.day === day)
      .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <header className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Timetable</h2>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your weekly class schedule
        </p>
      </header>

      {/* Add Class Form */}
      <motion.form
        onSubmit={handleAddClass}
        className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <select
          value={formData.day}
          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
          className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <input
          type="time"
          value={formData.start}
          onChange={(e) => setFormData({ ...formData, start: e.target.value })}
          className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <input
          type="time"
          value={formData.end}
          onChange={(e) => setFormData({ ...formData, end: e.target.value })}
          className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </motion.form>

      {/* Weekly Grid View */}
      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="min-w-full border-collapse bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <thead className="bg-blue-100 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Day
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Classes
              </th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const classes = getClassesForDay(day);
              return (
                <tr
                  key={day}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
                >
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium text-blue-600 dark:text-blue-400">
                    {day}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                    {classes.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {classes.map((cls) => (
                          <div
                            key={cls.id}
                            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                          >
                            <div>
                              <p className="font-semibold dark:text-gray-100">
                                {cls.subject}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {cls.start} - {cls.end}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDelete(cls.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm italic">
                        No classes scheduled
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Timetable;
