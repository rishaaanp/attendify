import { useState, useEffect } from "react";

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

  const [newSubject, setNewSubject] = useState("");

  // Save data to localStorage on every change
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const markAttendance = (id, status) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subj) => {
        if (subj.id === id) {
          const newTotal = subj.total + 1;
          const newAttended = status === "present" ? subj.attended + 1 : subj.attended;
          return { ...subj, attended: newAttended, total: newTotal };
        }
        return subj;
      })
    );
  };

  const calculatePercentage = (attended, total) => {
    return total === 0 ? 0 : Math.round((attended / total) * 100);
  };

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
    setSubjects(subjects.filter((subj) => subj.id !== id));
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-600">{new Date().toDateString()}</div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="text-gray-600">Overall Attendance</h3>
          <p className="text-3xl font-bold mt-2">{overall()}%</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="text-gray-600">Subjects</h3>
          <p className="text-3xl font-bold mt-2">{subjects.length}</p>
        </div>
      </div>

      {/* Add New Subject */}
      <form onSubmit={addSubject} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter new subject name"
          className="border rounded-lg px-3 py-2 flex-1 outline-none focus:ring-2 focus:ring-blue-400"
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
        <div className="grid grid-cols-3 gap-4">
          {subjects.map((subj) => (
            <div key={subj.id} className="p-4 bg-white rounded-lg shadow">
              <div className="text-sm text-gray-500 flex justify-between">
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
              <div className="mt-2 font-semibold">{subj.name}</div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => markAttendance(subj.id, "present")}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                  Mark Present
                </button>
                <button
                  onClick={() => markAttendance(subj.id, "absent")}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                >
                  Mark Absent
                </button>
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
