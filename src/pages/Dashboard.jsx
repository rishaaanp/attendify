const Dashboard = () => {
  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-600">Monday, April 15</div>
      </header>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="text-gray-600">Attendance Percentage</h3>
          <p className="text-3xl font-bold mt-2">84%</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="text-gray-600">Subjects</h3>
          <p className="text-3xl font-bold mt-2">7</p>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-medium mb-3">Your Subjects</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="text-sm text-gray-500">80/95</div>
            <div className="mt-2 font-semibold">Artificial Intelligence</div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded">Mark Present</button>
              <button className="px-3 py-1 bg-red-50 text-red-600 rounded">Mark Absent</button>
            </div>
            <div className="mt-3 text-2xl font-bold">84%</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
