import { useState } from "react";
import AttendanceForm from "../components/AttendanceForm.jsx";
import AttendanceTable from "../components/AttendanceTable.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useEmployees } from "../hooks/useEmployees.js";
import { useAttendance } from "../hooks/useAttendance.js";
import AttendanceService from "../services/attendanceService.js";

function AttendancePage() {
  const { employees } = useEmployees();
  const {
    records,
    loading,
    error,
    filterDate,
    fetchByDate,
    fetchAll,
  } = useAttendance();
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [filter, setFilter] = useState("");

  const handleCreate = async (form, onSuccess) => {
    setSaving(true);
    setActionError(null);
    try {
      await AttendanceService.createAttendance(form);
      onSuccess?.();
      if (filterDate) {
        await fetchByDate(filterDate);
      } else {
        await fetchAll();
      }
    } catch (err) {
      setActionError(err);
    } finally {
      setSaving(false);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchByDate(filter);
  };

  const handleClearFilter = () => {
    setFilter("");
    fetchAll();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Attendance
          </h1>
          <p className="text-xs text-slate-500">
            Mark and review daily attendance records.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Mark Attendance</h2>
        </div>
        <div className="card-body space-y-3">
          <ErrorMessage error={actionError} />
          <AttendanceForm
            employees={employees}
            onSubmit={handleCreate}
            loading={saving}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Attendance Records</h2>
          <form
            onSubmit={handleFilterSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="date"
              className="input max-w-xs"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button type="submit" className="btn-primary text-xs">
              Filter
            </button>
            {filterDate && (
              <button
                type="button"
                onClick={handleClearFilter}
                className="text-xs text-slate-600 hover:text-primary-600 underline underline-offset-4"
              >
                Clear
              </button>
            )}
          </form>
        </div>
        <div className="card-body">
          {loading ? (
            <Loader message="Loading attendance..." />
          ) : (
            <>
              <ErrorMessage error={error} />
              <AttendanceTable records={records} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;

