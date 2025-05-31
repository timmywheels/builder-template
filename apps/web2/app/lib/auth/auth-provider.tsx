import { createContext, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./auth-hooks";
import Cookie from "js-cookie";

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const initialCheckDone = useRef(false);

  useEffect(() => {
    // Only run this check once on initial mount
    if (!initialCheckDone.current) {
      const token = Cookie.get("token");
      if (token) {
        auth.setIsAuthenticated(true);
        auth.refreshUser();
      }
      initialCheckDone.current = true;
    }
  }, [auth]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
