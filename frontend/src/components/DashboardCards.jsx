function StatCard({ title, value, accent }) {
  return (
    <div className="card">
      <div className="card-body flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-slate-500">{title}</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {value}
          </div>
        </div>
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${
            accent || "bg-primary-50 text-primary-600"
          }`}
        >
          {String(value).slice(0, 3)}
        </div>
      </div>
    </div>
  );
}

function DashboardCards({ totalEmployees, presentToday, absentToday }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard title="Total Employees" value={totalEmployees} />
      <StatCard
        title="Present Today"
        value={presentToday}
        accent="bg-emerald-50 text-emerald-600"
      />
      <StatCard
        title="Absent Today"
        value={absentToday}
        accent="bg-amber-50 text-amber-600"
      />
    </div>
  );
}

export default DashboardCards;

