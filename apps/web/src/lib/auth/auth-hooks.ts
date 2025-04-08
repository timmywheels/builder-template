import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./auth-api";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  PasswordResetRequest,
  ResetPasswordRequest,
  AccountConfirmationRequest,
  ConfirmAccountRequest,
} from "./types";
import { getApiError } from "../api";
import { useCallback } from "react";

// Query keys for caching
export const AUTH_QUERY_KEYS = {
  user: ["auth", "user"],
  session: ["auth", "session"],
};

/**
 * Hook for user registration
 * Returns a mutation for registering a new user
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, RegisterCredentials>({
    mutationFn: (credentials) => authApi.register(credentials),
    onSuccess: (data) => {
      // Store the token in localStorage
      localStorage.setItem("auth_token", data.token);

      // Invalidate the user query to force a refetch
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user });
    },
    onError: (error) => {
      // Transform the error to a consistent format
      return Promise.reject(getApiError(error));
    },
  });
}

/**
 * Hook for user login
 * Returns a mutation for logging in an existing user
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      // Store the token in localStorage
      localStorage.setItem("auth_token", data.token);

      // Invalidate the user query to force a refetch
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user });
    },
    onError: (error) => {
      // Transform the error to a consistent format
      return Promise.reject(getApiError(error));
    },
  });
}

/**
 * Hook for user logout
 * Returns a mutation for logging out the current user
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      authApi.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear the user from the cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.user, null);
    },
  });
}

/**
 * Hook for getting the current user
 * Returns the current user data or null if not authenticated
 */
export function useUser() {
  const isAuthenticated = Boolean(localStorage.getItem("auth_token"));

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.user,
    queryFn: authApi.getUser,
    select: (data) => data.data,
    enabled: isAuthenticated, // Only run if we have a token
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true,
    retry: 1, // Only retry once if it fails
  });
}

/**
 * Hook for requesting a password reset email
 */
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (data: PasswordResetRequest) => authApi.requestPasswordReset(data),
    onError: (error) => {
      return Promise.reject(getApiError(error));
    },
  });
}

/**
 * Hook for resetting password with token
 */
export function useResetPassword() {
  return useMutation<AuthResponse, Error, ResetPasswordRequest>({
    mutationFn: (data) => authApi.resetPassword(data),
    onSuccess: (data) => {
      // Store the token in localStorage
      localStorage.setItem("auth_token", data.token);
    },
    onError: (error) => {
      return Promise.reject(getApiError(error));
    },
  });
}

/**
 * Hook for requesting an account confirmation email
 */
export function useRequestAccountConfirmation() {
  return useMutation({
    mutationFn: (data: AccountConfirmationRequest) => authApi.requestAccountConfirmation(data),
    onError: (error) => {
      return Promise.reject(getApiError(error));
    },
  });
}

/**
 * Hook for confirming an account with token
 */
export function useConfirmAccount() {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, ConfirmAccountRequest>({
    mutationFn: (data) => authApi.confirmAccount(data),
    onSuccess: (data) => {
      // Store the token in localStorage
      localStorage.setItem("auth_token", data.token);

      // Invalidate the user query to force a refetch
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user });
    },
    onError: (error) => {
      return Promise.reject(getApiError(error));
    },
  });
}

/**
 * Main auth hook that combines auth state and operations
 * Returns a simplified API for auth state and operations
 */
export function useAuth() {
  const { data: user, isLoading, error, refetch } = useUser();

  const isAuthenticated = Boolean(user);
  const queryClient = useQueryClient();

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const passwordResetMutation = useRequestPasswordReset();
  const resetPasswordMutation = useResetPassword();
  const accountConfirmationMutation = useRequestAccountConfirmation();
  const confirmAccountMutation = useConfirmAccount();

  // Refresh the user data
  const refreshUser = useCallback(() => {
    return refetch();
  }, [refetch]);

  // Clear all auth state
  const clearAuth = useCallback(() => {
    localStorage.removeItem("auth_token");
    queryClient.setQueryData(AUTH_QUERY_KEYS.user, null);
  }, [queryClient]);

  // Login helper
  const login = useCallback(
    (credentials: LoginCredentials) => {
      return loginMutation.mutate(credentials);
    },
    [loginMutation]
  );

  // Register helper
  const register = useCallback(
    (credentials: RegisterCredentials) => {
      return registerMutation.mutate(credentials);
    },
    [registerMutation]
  );

  // Logout helper
  const logout = useCallback(() => {
    return logoutMutation.mutate();
  }, [logoutMutation]);

  // Request password reset helper
  const requestPasswordReset = useCallback(
    (data: PasswordResetRequest) => {
      return passwordResetMutation.mutate(data);
    },
    [passwordResetMutation]
  );

  // Reset password helper
  const resetPassword = useCallback(
    (data: ResetPasswordRequest) => {
      return resetPasswordMutation.mutate(data);
    },
    [resetPasswordMutation]
  );

  // Request account confirmation helper
  const requestAccountConfirmation = useCallback(
    (data: AccountConfirmationRequest) => {
      return accountConfirmationMutation.mutate(data);
    },
    [accountConfirmationMutation]
  );

  // Confirm account helper
  const confirmAccount = useCallback(
    (data: ConfirmAccountRequest) => {
      return confirmAccountMutation.mutate(data);
    },
    [confirmAccountMutation]
  );

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Mutation state
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    isPasswordResetRequestPending: passwordResetMutation.isPending,
    isResetPasswordPending: resetPasswordMutation.isPending,
    isAccountConfirmationRequestPending: accountConfirmationMutation.isPending,
    isConfirmAccountPending: confirmAccountMutation.isPending,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
    passwordResetRequestError: passwordResetMutation.error,
    resetPasswordError: resetPasswordMutation.error,
    accountConfirmationRequestError: accountConfirmationMutation.error,
    confirmAccountError: confirmAccountMutation.error,

    // Actions
    login,
    register,
    logout,
    refreshUser,
    clearAuth,
    requestPasswordReset,
    resetPassword,
    requestAccountConfirmation,
    confirmAccount,

    // Original mutations (for advanced use cases)
    loginMutation,
    registerMutation,
    logoutMutation,
    passwordResetMutation,
    resetPasswordMutation,
    accountConfirmationMutation,
    confirmAccountMutation,
  };
}
