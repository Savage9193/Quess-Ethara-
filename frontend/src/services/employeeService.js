import axiosClient from "../api/axiosClient";

const EmployeeService = {
  async getEmployees() {
    const res = await axiosClient.get("/employees/");
    return res.data;
  },

  async createEmployee(payload) {
    const res = await axiosClient.post("/employees/", payload);
    return res.data;
  },

  async deleteEmployee(id) {
    await axiosClient.delete(`/employees/${id}/`);
  },
};

export default EmployeeService;

