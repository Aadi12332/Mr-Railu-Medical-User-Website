import axios from "./axiosInstance"
import { AuthResponse, LoginPayload, RegisterPayload } from "./types"

export const authApi = {
  patientRegister: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const res = await axios.post("/v1/auth/patient/register", payload)
    if (res.data?.token) localStorage.setItem("patientToken", res.data.token)
    return res
  },

  patientLogin: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await axios.post("/v1/auth/patient/login", payload)
    if (res.data?.token) localStorage.setItem("patientToken", res.data.token)
    return res
  },

  patientLogout: () =>{
    const role=localStorage.getItem("role")
    return axios.post(`/v1/${role?.toLowerCase()}/auth/logout`)
  },

  sendOtp: (payload: { email: string }) =>
    axios.post("/v1/auth/patient/send-otp", payload),

  verifyOtp: (payload: { email: string; otp: string }) =>
    axios.post("/v1/auth/patient/verify-otp", payload),

  forgotPassword: (payload: { email: string }) =>
    axios.post("/v1/auth/patient/forgot-password", payload),

  resetPassword: (payload: { token: string; newPassword: string; role: "Patient" | "Provider" }) =>
    axios.post(`/v1/auth/${payload.role.toLowerCase()}/reset-password`, payload)
}