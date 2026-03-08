import axiosClient from "../api/axiosClient";

const AttendanceService = {
  async getAttendance() {
    const res = await axiosClient.get("/attendance/");
    return res.data;
  },

  async createAttendance(payload) {
    const res = await axiosClient.post("/attendance/", payload);
    return res.data;
  },

  async getAttendanceByEmployee(employeeId) {
    const res = await axiosClient.get(`/attendance/employee/${employeeId}/`);
    return res.data;
  },

  async getAttendanceByDate(date) {
    const res = await axiosClient.get("/attendance/filter/", {
      params: { date },
    });
    return res.data;
  },
};

export default AttendanceService;

