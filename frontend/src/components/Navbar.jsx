import { NavLink } from "react-router-dom";

const navLinkClasses = ({ isActive }) =>
  [
    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
    isActive
      ? "bg-white text-primary-600 shadow-sm"
      : "text-slate-600 hover:text-primary-600 hover:bg-white/70",
  ].join(" ");

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white text-sm font-bold">
            HR
          </span>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              HRMS Lite
            </div>
            <div className="text-xs text-slate-500">
              Lightweight HR & Attendance
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink to="/dashboard" className={navLinkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/employees" className={navLinkClasses}>
            Employees
          </NavLink>
          <NavLink to="/attendance" className={navLinkClasses}>
            Attendance
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

