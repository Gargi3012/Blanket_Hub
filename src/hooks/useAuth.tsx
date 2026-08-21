import { createContext, useContext, useMemo, type ReactNode } from "react";

type AuthState = {
  user: { id: string; email: string } | null;
  session: any | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  session: null,
  isAdmin: false,
  loading: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AuthState>(
    () => ({
      user: null, // Always anonymous for the client frontend demo
      session: null,
      isAdmin: false, // Prevents admin dashboard redirection / locks
      loading: false,
      signOut: async () => {},
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
