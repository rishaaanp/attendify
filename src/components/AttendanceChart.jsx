import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const AttendanceChart = ({ data }) => {
  // Prepare data for chart
  const chartData = data.map((subj) => ({
    name: subj.name,
    percentage: subj.total === 0 ? 0 : Math.round((subj.attended / subj.total) * 100),
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Attendance Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="percentage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
