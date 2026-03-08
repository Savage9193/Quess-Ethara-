import { useState } from "react";

function AttendanceForm({ employees, onSubmit, loading }) {
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form, () =>
      setForm((prev) => ({ ...prev, date: "", status: "Present" }))
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
    >
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Employee
        </label>
        <select
          name="employee"
          value={form.employee}
          onChange={handleChange}
          className="select"
          required
        >
          <option value="">Select employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="select"
          required
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Mark Attendance"}
        </button>
      </div>
    </form>
  );
}

export default AttendanceForm;

