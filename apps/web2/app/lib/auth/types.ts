export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

export interface UserResponse {
  data: User;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ConfirmAccountRequest {
  email: string;
  token: string;
}

export interface ResetPasswordRequest {
  password: string;
  token: string;
}

export interface AccountConfirmationRequest {
  email: string;
}

export interface AuthState {
  user: User | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}
