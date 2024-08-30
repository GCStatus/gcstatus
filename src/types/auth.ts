export interface LoginCredentials {
  identifier: string
  password: string
}

export interface ResetPasswordPayload {
  token: string
  email: string
  password: string
  password_confirmation: string
}
