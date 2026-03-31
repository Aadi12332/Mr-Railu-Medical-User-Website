import axios from "./axiosInstance";

export const dashboardApi = {
  getDashboardData: (role: string) => {
    return axios.get(`/v1/${role}/dashboard`);
  },
  getSessionData: (role: string) => {
    return axios.get(`/v1/${role}/sessions`);
  },
  getAppointments: (role: string) => {
    return axios.get(`/v1/${role}/appointments`);
  },
  getActivePrescriptions: (role: string) => {
    return axios.get(`/v1/${role}/prescriptions`);
  },
  getMentalPlans: (role: string) => {
    return axios.get(`/v1/${role}/plans`);
  },
  getMyProviders: (role: string) => {
    return axios.get(`/v1/${role}/providers/my-providers`);
  },
  postRequestRefill: (role: string, prescriptionId: string, payload: any) => {
    return axios.post(
      `/v1/${role}/prescriptions/${prescriptionId}/request-refill`,
      payload,
    );
  },
   getPayments: (role: string) => {
    return axios.get(`/v1/${role}/payments`);
  },
  getPaymentById: (role: string, paymentId: string) => {
    return axios.get(`/v1/${role}/payments/${paymentId}`);
  },
  downloadPrescription: (role: string, prescriptionId: string) => {
    return axios.get(`/v1/${role}/prescriptions/${prescriptionId}/download`, {
      responseType: "arraybuffer",
    });
  },
};
