import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../lib/auth";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If authentication is not required and user is authenticated (for login/register pages)
  if (!requireAuth && isAuthenticated) {
    // Redirect to dashboard or home
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
