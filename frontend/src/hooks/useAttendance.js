import { useEffect, useState } from "react";
import AttendanceService from "../services/attendanceService";

export function useAttendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AttendanceService.getAttendance();
      setRecords(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchByDate = async (date) => {
    if (!date) {
      setFilterDate("");
      return fetchAll();
    }
    setLoading(true);
    setError(null);
    try {
      const data = await AttendanceService.getAttendanceByDate(date);
      setRecords(data);
      setFilterDate(date);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    records,
    loading,
    error,
    filterDate,
    fetchAll,
    fetchByDate,
    setRecords,
  };
}

