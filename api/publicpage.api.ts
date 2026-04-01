import axios from "./axiosInstance";

export const publicPageApi = {
  getBlog: (params?: { limit?: number; offset?: number }) => {
    return axios.get(`/v1/public/blog`, { params });
  },
  getBlogDetail: (slug: string) => {
    return axios.get(`/v1/public/blog/${slug}`);
  },
  getFAQ: () => {
    return axios.get(`/v1/public/homepage/faqs`);
  },
  getPrivacy: () => {
    return axios.get(`/v1/public/legal/privacy-policy`);
  },
   getTermsofUse: () => {
    return axios.get(`/v1/public/legal/terms-of-use`);
  },
    getConditions: () => {
    return axios.get(`/v1/public/conditions`);
  },
   getConditionsBySlug: (slug: string) => {
    return axios.get(`/v1/public/conditions/${slug}`);
  },
  sendContact: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return axios.post(`/v1/public/contact`, data);
  },
};
