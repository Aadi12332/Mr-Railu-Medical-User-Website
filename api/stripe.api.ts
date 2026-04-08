import axios from "./axiosInstance";

export const stripeApi = {
  stripeWebhook: (payload: any) => {
    return axios.post(`/v1/webhooks/stripe`, payload);
  }
};
