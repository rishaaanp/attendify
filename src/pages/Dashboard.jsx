import { useState, useEffect } from "react";

const Dashboard = () => {
  // Load saved data from localStorage, or use default subjects
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

  // Save data to localStorage whenever subjects change
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

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-600">{new Date().toDateString()}</div>
      </header>

      {/* Top summary cards */}
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

      {/* Subject Cards */}
      <section>
        <h3 className="text-lg font-medium mb-3">Your Subjects</h3>
        <div className="grid grid-cols-3 gap-4">
          {subjects.map((subj) => (
            <div key={subj.id} className="p-4 bg-white rounded-lg shadow">
              <div className="text-sm text-gray-500">
                {subj.attended}/{subj.total}
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
