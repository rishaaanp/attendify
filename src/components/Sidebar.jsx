const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Attendify</h1>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Subjects</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">History</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Settings</a>
        </nav>
      </div>
      <button className="mt-8 text-sm text-gray-500 hover:text-gray-700">🌙 Dark Mode</button>
    </aside>
  );
};

export default Sidebar;
