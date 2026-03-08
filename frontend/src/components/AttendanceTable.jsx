import EmptyState from "./EmptyState.jsx";

function AttendanceTable({ records }) {
  if (!records?.length) {
    return (
      <EmptyState
        title="No attendance records"
        description="Attendance records will appear here once marked."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((rec) => (
            <tr key={rec.id}>
              <td>{rec.employee_name}</td>
              <td>{rec.employee_employee_id}</td>
              <td>{rec.date}</td>
              <td>
                <span
                  className={
                    rec.status === "Present"
                      ? "inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
                      : "inline-flex rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700"
                  }
                >
                  {rec.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;

