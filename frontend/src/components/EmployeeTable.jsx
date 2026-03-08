import EmptyState from "./EmptyState.jsx";

function EmployeeTable({ employees, onDelete }) {
  if (!employees?.length) {
    return (
      <EmptyState
        title="No employees yet"
        description="Add your first employee using the form above to start tracking attendance."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td className="text-right">
                <button
                  onClick={() => onDelete?.(emp)}
                  className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;

