import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
// [AUTH-BACKEND DISABLED] Supabase auth import commented out — no backend connection
// import { clearSupabaseSession, isSupabaseAuthConfigured, restoreSupabaseSession, signInWithSupabasePassword, type SupabaseAuthenticatedUser } from "../../features/auth/api/supabaseAuth";

export interface AuthUser {
  id: string;
  name: string;
  role: string;
}

export interface AuthState {
  status: "loading" | "authenticated" | "unauthenticated";
  user: AuthUser | null;
  configured: boolean;
  signInWithPassword(input: Readonly<{ email: string; password: string; remember: boolean }>): Promise<{ success: true } | { success: false; message: string }>;
  signOut(): void;
}

// [AUTH-BACKEND DISABLED] toAuthUser helper commented out (was used to map SupabaseAuthenticatedUser)
// function toAuthUser(user: SupabaseAuthenticatedUser): AuthUser {
//   return { id: user.id, name: user.email ?? "Authenticated user", role: "authenticated" };
// }

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  // [AUTH-MOCK] Commented out unauthenticated state:
  // const [status, setStatus] = useState<AuthState["status"]>("unauthenticated");
  // const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthState["status"]>("authenticated");
  const [user, setUser] = useState<AuthUser | null>({
    id: "mock-student-id",
    name: "Shehab",
    role: "authenticated",
  });

  // [AUTH-BACKEND DISABLED] Supabase configuration check commented out
  // const configured = isSupabaseAuthConfigured();
  const configured = false;

  // [AUTH-BACKEND DISABLED] Session restore effect commented out — was calling Supabase backend
  // useEffect(() => {
  //   let active = true;
  //   if (!configured) {
  //     setStatus("unauthenticated");
  //     return () => { active = false; };
  //   }
  //   void restoreSupabaseSession().then((session) => {
  //     if (!active) return;
  //     setUser(session ? toAuthUser(session.user) : null);
  //     setStatus(session ? "authenticated" : "unauthenticated");
  //   });
  //   return () => { active = false; };
  // }, [configured]);

  useEffect(() => {
    // [AUTH-MOCK] Commented out forced unauthenticated:
    // setStatus("unauthenticated");
    setStatus("authenticated");
  }, []);

  const value = useMemo<AuthState>(() => ({
    status,
    user,
    configured,
    // [AUTH-BACKEND DISABLED] signInWithPassword stub — was calling Supabase token endpoint
    async signInWithPassword(_input) {
      // const authenticated = await signInWithSupabasePassword(input);
      // setUser(toAuthUser(authenticated));
      // setStatus("authenticated");
      return { success: false, message: "Authentication backend is currently disabled." };
    },
    signOut() {
      // [AUTH-BACKEND DISABLED] clearSupabaseSession() commented out
      // clearSupabaseSession();
      setUser(null);
      setStatus("unauthenticated");
    },
  }), [configured, status, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
