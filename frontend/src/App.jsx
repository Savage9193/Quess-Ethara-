import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import EmployeesPage from "./pages/Employees.jsx";
import AttendancePage from "./pages/Attendance.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

