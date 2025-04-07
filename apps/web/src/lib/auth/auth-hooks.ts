import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./auth-api";
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from "./types";
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
    loginError: loginMutation.error,
    registerError: registerMutation.error,

    // Actions
    login,
    register,
    logout,
    refreshUser,
    clearAuth,

    // Original mutations (for advanced use cases)
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}
