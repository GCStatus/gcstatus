export interface LoginCredentials {
  identifier: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  birthdate: string
  nickname: string
  password: string
  password_confirmation: string
}

export interface ResetPasswordPayload {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export interface ForgotInterface {
  email: string
}

export interface ResetInterface {
  token: string
  email: string
  password: string
  password_confirmation: string
}
