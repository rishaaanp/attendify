import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
<div className="p-4 bg-white dark:bg-black text-black dark:text-white">
  Test Dark Mode
</div>
