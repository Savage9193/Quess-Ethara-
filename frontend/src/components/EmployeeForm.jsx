import { useState } from "react";

function EmployeeForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form, () =>
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
    >
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Employee ID
        </label>
        <input
          className="input"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          placeholder="EMP001"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Full Name
        </label>
        <input
          className="input"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Email
        </label>
        <input
          type="email"
          className="input"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@company.com"
          required
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Department
          </label>
          <input
            className="input"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Engineering"
            required
          />
        </div>
        <button
          type="submit"
          className="btn-primary mt-5 whitespace-nowrap"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;

