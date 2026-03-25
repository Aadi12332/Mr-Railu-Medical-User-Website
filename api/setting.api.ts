import axios from "./axiosInstance"

export const settingApi = {
  changePassword: (payload: { currentPassword: string; newPassword: string },role:string) =>
    axios.put(`/v1/${role}/settings/password`, payload),

  updateNotifications: (payload: any,role:string) =>
    { 
      console.log("updateNotifications",payload)
      return axios.put(`/v1/${role}/settings/notifications`, payload)
    },
     updateSettings: (payload: any,role:string) =>
    { 
      console.log("updateSettings",payload)
      return axios.put(`/v1/${role}/settings/billing`, payload)
    },
    updatePrivacy: (payload: any,role:string) =>
    { 
      console.log("updatePrivacy",payload)
      return axios.put(`/v1/${role}/settings/privacy`, payload)
    },
}