import { apiClient } from "../api";
import {
  AccountConfirmationRequest,
  AuthResponse,
  ConfirmAccountRequest,
  LoginCredentials,
  PasswordResetRequest,
  RegisterCredentials,
  ResetPasswordRequest,
  UserResponse,
} from "./types";

/**
 * Authentication API service
 * Handles communication with the authentication endpoints
 */
export const authApi = {
  /**
   * Log in a user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  /**
   * Register a new user
   */
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", credentials);
    return response.data;
  },

  /**
   * Get the current user's profile
   */
  getUser: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>("/auth/me");
    return response.data;
  },

  /**
   * Log out the current user (client-side only)
   */
  logout: (): void => {
    localStorage.removeItem("auth_token");
  },

  /**
   * Request a password reset email
   */
  requestPasswordReset: async (data: PasswordResetRequest): Promise<void> => {
    await apiClient.post("/auth/password-reset", data);
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/reset-password", data);
    return response.data;
  },

  /**
   * Request account confirmation email
   */
  requestAccountConfirmation: async (data: AccountConfirmationRequest): Promise<void> => {
    await apiClient.post("/auth/account-confirmation", data);
  },

  /**
   * Confirm account with token
   */
  confirmAccount: async (data: ConfirmAccountRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/confirm-account", data);
    return response.data;
  },
};
