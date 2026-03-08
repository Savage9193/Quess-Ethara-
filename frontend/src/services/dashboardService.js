import axiosClient from "../api/axiosClient";

const DashboardService = {
  async getDashboard() {
    const res = await axiosClient.get("/dashboard/");
    return res.data;
  },
};

export default DashboardService;

