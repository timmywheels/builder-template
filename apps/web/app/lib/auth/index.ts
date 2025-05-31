// Export all auth hooks
export {
  useAuth,
  useLogin,
  useRegister,
  useLogout,
  useUser,
  useRequestPasswordReset,
  useResetPassword,
  useRequestAccountConfirmation,
  useConfirmAccount,
  AUTH_QUERY_KEYS,
} from "./auth-hooks";

// Export auth provider and context
export { AuthProvider, useAuthContext } from "./auth-provider";

// Export auth API
export { authApi } from "./auth-api";

// Export types
export type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  UserResponse,
  PasswordResetRequest,
  ResetPasswordRequest,
  AccountConfirmationRequest,
  ConfirmAccountRequest,
  AuthState,
} from "./types";
