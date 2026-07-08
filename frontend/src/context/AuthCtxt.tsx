import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { profile } from "../services/AuthService";
import type { UserModel } from "../models/UserModel.ts";

type AuthContextType = {
  token: string | null;
  user: UserModel | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthCtxt = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() =>
    sessionStorage.getItem("token"),
  );
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  const setToken = useCallback((newToken: string | null) => {
    if (newToken) {
      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("isAuth", "true");
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAuth");
      sessionStorage.removeItem("user");
    }
    setTokenState(newToken); // <-- questo è ciò che triggera il re-render
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setToken]);

  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await profile();
      const data = response.data as UserModel;
      setUser(data ?? null);
    } catch (err) {
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, [token, setToken]);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  return (
    <AuthCtxt.Provider value={{ token, user, loading, setToken, logout, refreshUser: fetchUser }}>
      {children}
    </AuthCtxt.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtxt);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
