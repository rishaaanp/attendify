import { useState, useEffect } from "react";
import AttendanceChart from "../components/AttendanceChart";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("subjects");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Artificial Intelligence", attended: 12, total: 15 },
          { id: 2, name: "Data Structures", attended: 10, total: 12 },
          { id: 3, name: "Machine Learning", attended: 8, total: 10 },
        ];
  });

  // attendance history state (array of { id, subjectId, subjectName, status, timestamp })
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("attendanceHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [newSubject, setNewSubject] = useState("");

  // Save subjects & history to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("attendanceHistory", JSON.stringify(history));
  }, [history]);

  const markAttendance = (id, status) => {
    setSubjects((prev) =>
      prev.map((subj) => {
        if (subj.id === id) {
          const newTotal = subj.total + 1;
          const newAttended = status === "present" ? subj.attended + 1 : subj.attended;
          return { ...subj, attended: newAttended, total: newTotal };
        }
        return subj;
      })
    );

    // add to history
    const subj = subjects.find((s) => s.id === id);
    const record = {
      id: Date.now(),
      subjectId: id,
      subjectName: subj ? subj.name : "Unknown",
      status, // "present" or "absent"
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [...prev, record]);
  };

  const calculatePercentage = (attended, total) =>
    total === 0 ? 0 : Math.round((attended / total) * 100);

  const overall = () => {
    const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
    const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
    return calculatePercentage(totalAttended, totalClasses);
  };

  const addSubject = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newSubject.trim(),
      attended: 0,
      total: 0,
    };

    setSubjects([...subjects, newEntry]);
    setNewSubject("");
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
    // Optionally remove historical records for that subject:
    setHistory((h) => h.filter((r) => r.subjectId !== id));
  };

  // helper: get latest history record for a subject
  const getLastMarked = (subjectId) => {
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].subjectId === subjectId) return history[i];
    }
    return null;
  };

  // format ISO timestamp to readable
  const formatTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {new Date().toDateString()}
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <motion.div
          className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-gray-600 dark:text-gray-400">Overall Attendance</h3>
          <p className="text-3xl font-bold mt-2">{overall()}%</p>
        </motion.div>
        <motion.div
          className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-gray-600 dark:text-gray-400">Subjects</h3>
          <p className="text-3xl font-bold mt-2">{subjects.length}</p>
        </motion.div>
      </div>

      {/* Add Subject Form */}
      <form onSubmit={addSubject} className="mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter new subject name"
          className="border rounded-lg px-3 py-2 flex-1 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Subject Cards */}
      <section>
        <h3 className="text-lg font-medium mb-3">Your Subjects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subj) => {
            const last = getLastMarked(subj.id);
            return (
              <motion.div
                key={subj.id}
                className="p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all active:scale-[0.98]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                  <span>
                    {subj.attended}/{subj.total}
                  </span>
                  <button
                    onClick={() => deleteSubject(subj.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-2 font-semibold dark:text-gray-100">{subj.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {last ? `Last: ${formatTime(last.timestamp)} (${last.status})` : "No history"}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => markAttendance(subj.id, "present")}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-800/50 transition"
                  >
                    Mark Present
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => markAttendance(subj.id, "absent")}
                    className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-800/50 transition"
                  >
                    Mark Absent
                  </motion.button>
                </div>

                <div
                  className={`mt-3 text-2xl font-bold ${
                    calculatePercentage(subj.attended, subj.total) < 75
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {calculatePercentage(subj.attended, subj.total)}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <AttendanceChart data={subjects} />
    </div>
  );
};

export default Dashboard;
