import { useState, useEffect } from "react";
import AttendanceChart from "../components/AttendanceChart";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("subjects");
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("attendanceHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [timetable, setTimetable] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load timetable
  useEffect(() => {
    const saved = localStorage.getItem("timetable");
    if (saved) setTimetable(JSON.parse(saved));
  }, []);

  // Live time updater
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Save subjects + history
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("attendanceHistory", JSON.stringify(history));
  }, [history]);

  // 🧮 ⭐ Decimal Percentage Calculation (2 decimals)
  const calculatePercentage = (attended, total) =>
    total === 0 ? 0 : Number(((attended / total) * 100).toFixed(2));

  // Hour-based attendance
  const markAttendance = (id, status, hours = 1) => {
    setSubjects((prev) =>
      prev.map((subj) => {
        if (subj.id === id) {
          const newTotal = subj.total + hours;
          const newAttended =
            status === "present" ? subj.attended + hours : subj.attended;
          return { ...subj, attended: newAttended, total: newTotal };
        }
        return subj;
      })
    );

    const subj = subjects.find((s) => s.id === id);
    const record = {
      id: Date.now(),
      subjectId: id,
      subjectName: subj ? subj.name : "Unknown",
      status,
      hours,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [...prev, record]);
  };

  // Overall stats
  const overall = () => {
    const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
    const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
    const percent = calculatePercentage(totalAttended, totalClasses);
    return { attended: totalAttended, total: totalClasses, percent };
  };

  // Classes needed to reach 75%
  const classesNeededFor75 = (attended, total) => {
    if (total === 0) return 0;
    const currentPercent = attended / total;
    if (currentPercent >= 0.75) return 0;
    const needed = Math.ceil((0.75 * total - attended) / 0.25);
    return needed;
  };

  const overallStats = overall();
  const neededClasses = classesNeededFor75(
    overallStats.attended,
    overallStats.total
  );

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
    setHistory((h) => h.filter((r) => r.subjectId !== id));
  };

  const getLastMarked = (subjectId) => {
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].subjectId === subjectId) return history[i];
    }
    return null;
  };

  const formatTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  // Today's schedule
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todaysClasses = timetable
    .filter((cls) => cls.day === today)
    .sort((a, b) => a.start.localeCompare(b.start));

  const isOngoing = (start, end) => {
    const now = currentTime;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startTime = new Date(now);
    const endTime = new Date(now);
    startTime.setHours(sh, sm, 0, 0);
    endTime.setHours(eh, em, 0, 0);

    return now >= startTime && now <= endTime;
  };

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {new Date().toDateString()}
        </div>
      </header>

      {/* TODAY'S SCHEDULE */}
      <motion.div
        className="p-4 mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
          Today’s Schedule – {today}
        </h3>

        {todaysClasses.length > 0 ? (
          <div className="flex flex-col gap-2">
            {todaysClasses.map((cls) => {
              const ongoing = isOngoing(cls.start, cls.end);
              return (
                <div
                  key={cls.id}
                  className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
                    ongoing
                      ? "bg-blue-100 dark:bg-blue-900/40 border-blue-400 dark:border-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                      : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <div>
                    <p className="font-medium dark:text-gray-100">
                      {cls.subject}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cls.start} - {cls.end}
                    </p>
                  </div>

                  {ongoing && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                      🕓 Ongoing
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            No classes scheduled today 🎉
          </p>
        )}
      </motion.div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <motion.div
          className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-gray-600 dark:text-gray-400">Overall Attendance</h3>
          <p className="text-3xl font-bold mt-2">{overallStats.percent}%</p>
        </motion.div>

        <motion.div
          className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-gray-600 dark:text-gray-400">
            Total Hours Attended
          </h3>
          <p className="text-3xl font-bold mt-2">{overallStats.attended}</p>
        </motion.div>

        <motion.div
          className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-gray-600 dark:text-gray-400">
            Total Hours Conducted
          </h3>
          <p className="text-3xl font-bold mt-2">{overallStats.total}</p>
        </motion.div>
      </div>

      {/* 75% WARNING CARD */}
      {overallStats.total > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 text-center">
          {neededClasses === 0 ? (
            <p>🎉 You’re above 75%! Keep it up!</p>
          ) : (
            <p>
              🎯 Attend <b>{neededClasses}</b> more hour
              {neededClasses > 1 ? "s" : ""} to reach 75% overall.
            </p>
          )}
        </div>
      )}

      {/* ADD SUBJECT */}
      <form
        onSubmit={addSubject}
        className="mb-6 flex flex-col sm:flex-row gap-3"
      >
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

      {/* SUBJECT CARDS */}
      <section>
        <h3 className="text-lg font-medium mb-3">Your Subjects</h3>

        {subjects.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No subjects added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subj) => {
              const percent = calculatePercentage(subj.attended, subj.total);
              const last = getLastMarked(subj.id);

              return (
                <motion.div
                  key={subj.id}
                  className="p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all active:scale-[0.98]"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>
                      {subj.attended}/{subj.total} hrs
                    </span>
                    <button
                      onClick={() => deleteSubject(subj.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-2 font-semibold dark:text-gray-100">
                    {subj.name}
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {last
                      ? `Last: ${formatTime(last.timestamp)} (${last.status} - ${
                          last.hours
                        } hr${last.hours > 1 ? "s" : ""})`
                      : "No history"}
                  </div>

                  {/* Mark attendance */}
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {[1, 2].map((hrs) => (
                        <motion.button
                          key={`present-${hrs}`}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            markAttendance(subj.id, "present", hrs)
                          }
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded"
                        >
                          Present ({hrs} hr{hrs > 1 ? "s" : ""})
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[1, 2].map((hrs) => (
                        <motion.button
                          key={`absent-${hrs}`}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            markAttendance(subj.id, "absent", hrs)
                          }
                          className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded"
                        >
                          Absent ({hrs} hr{hrs > 1 ? "s" : ""})
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`mt-3 text-2xl font-bold ${
                      percent < 75 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {percent}%
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <AttendanceChart data={subjects} />
    </div>
  );
};

export default Dashboard;
