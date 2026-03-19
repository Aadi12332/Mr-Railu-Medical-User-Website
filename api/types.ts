export interface AuthResponse {
  data?: {
    token?: string
  }
  message?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface AppointmentPayload {
  providerId: string
  date: string
  time: string
  type: string
  notes?: string
}