import DashboardCards from "../components/DashboardCards.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useDashboard } from "../hooks/useDashboard.js";
import EmptyState from "../components/EmptyState.jsx";

function DashboardPage() {
  const { data, loading, error } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Overview of employees and attendance for today.
          </p>
        </div>
      </div>

      {loading && <Loader message="Loading dashboard..." />}
      <ErrorMessage error={error} />

      {data && (
        <>
          <DashboardCards
            totalEmployees={data.total_employees}
            presentToday={data.present_today}
            absentToday={data.absent_today}
          />

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Employee Presence Summary</h2>
            </div>
            <div className="card-body">
              {!data.present_summary?.length ? (
                <EmptyState
                  title="No attendance yet"
                  description="Once employees have attendance records, you will see their total present days here."
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Employee ID</th>
                        <th>Department</th>
                        <th>Total Present Days</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.present_summary.map((row) => (
                        <tr key={row.employee_id}>
                          <td>{row.full_name}</td>
                          <td>{row.employee_id}</td>
                          <td>{row.department}</td>
                          <td>{row.total_present_days}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;

