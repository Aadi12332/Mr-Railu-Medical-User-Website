import axios from "./axiosInstance";

export const dashboardApi = {
  getDashboardData: (role: string) => {
    return axios.get(`/v1/${role}/dashboard`);
  },
  getHomepageData: () => {
    return axios.get(`/v1/public/homepage`);
  },
  getNotification: (params?: { filter?: string; page?: number; limit?: number }) => {
    return axios.get(`/v1/patient/notifications`, {
      params: {
        filter: params?.filter || "all",
        page: params?.page || 1,
        limit: params?.limit || 20,
      },
    });
  },
  getNotificationRead: (notificationId: string) => {
    return axios.put(`/v1/patient/notifications/${notificationId}/read`);
  },
  getNotificationDelete: (notificationId: string) => {
    return axios.delete(`/v1/patient/notifications/${notificationId}`);
  },
  getNotificationReadAll: () => {
    return axios.put(`/v1/patient/notifications/read-all`);
  },
  getSessionData: (role: string) => {
    return axios.get(`/v1/${role}/sessions`);
  },
  postSessionData: (role: string, payload: any) => {
    return axios.post(`/v1/${role}/sessions/${payload.sessionId}/join`, payload);
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
  getProviders: (role: string) => {
    return axios.get(`/v1/${role}/providers`);
  },
  getMoodOptions: (role: string) => {
    return axios.get(`/v1/${role}/mood/options`);
  },
  getMoodHistory: (role: string) => {
    return axios.get(`/v1/${role}/mood/`);
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
  postMoodApi: (role: string, payload: any) => {
    return axios.post(`/v1/${role}/mood`, payload);
  },
  getPaymentById: (role: string, paymentId: string) => {
    return axios.get(`/v1/${role}/payments/${paymentId}`);
  },
  getPrefillCount: (role: string) => {
    return axios.get(`/v1/${role}/prescriptions/counts`);
  },
  getCardsApi: (role: string) => {
    return axios.get(`/v1/${role}/payment-methods`);
  },
  postAddCardApi: (role: string, payload: any) => {
    return axios.post(`/v1/${role}/payment-methods`, payload);
  },
  defaultCardApi: (role: string, cardId: string) => {
    return axios.put(`/v1/${role}/payment-methods/${cardId}/default`);
  },
  deleteCardApi: (role: string, cardId: string) => {
    return axios.delete(`/v1/${role}/payment-methods/${cardId}`);
  },
  downloadPrescription: (role: string, prescriptionId: string) => {
    return axios.get(`/v1/${role}/prescriptions/${prescriptionId}/download`, {
      responseType: "arraybuffer",
    });
  },
  getAiConsent: () => {
    return axios.get(`/v1/public/legal/ai-usage-consent`);
  },
};
