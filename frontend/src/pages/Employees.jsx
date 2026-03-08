import EmployeeForm from "../components/EmployeeForm.jsx";
import EmployeeTable from "../components/EmployeeTable.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useEmployees } from "../hooks/useEmployees.js";
import EmployeeService from "../services/employeeService.js";
import { useState } from "react";

function EmployeesPage() {
  const { employees, loading, error, refetch } = useEmployees();
  const [creating, setCreating] = useState(false);
  const [actionError, setActionError] = useState(null);

  const handleCreate = async (form, onSuccess) => {
    setCreating(true);
    setActionError(null);
    try {
      await EmployeeService.createEmployee(form);
      onSuccess?.();
      await refetch();
    } catch (err) {
      setActionError(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (emp) => {
    // if (!window.confirm(`Delete employee ${emp.full_name}?`)) return;
    setActionError(null);
    try {
      await EmployeeService.deleteEmployee(emp.id);
      await refetch();
    } catch (err) {
      setActionError(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Employees
          </h1>
          <p className="text-xs text-slate-500">
            Manage employee directory used for attendance tracking.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Add Employee</h2>
        </div>
        <div className="card-body">
          <ErrorMessage error={actionError} />
          <EmployeeForm onSubmit={handleCreate} loading={creating} />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">All Employees</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <Loader message="Loading employees..." />
          ) : (
            <>
              <ErrorMessage error={error} />
              <EmployeeTable employees={employees} onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeesPage;

