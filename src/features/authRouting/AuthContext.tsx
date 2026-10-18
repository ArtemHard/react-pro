import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import {
  ACCESS_TOKEN_KEY,
  baseApi2,
  useLazyGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
} from 'shared/api/baseApi';
import type { AuthUser } from 'shared/api/types';

export type { AuthUser } from 'shared/api/types';

export type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem(ACCESS_TOKEN_KEY)),
  );

  const dispatch = useDispatch();
  const [loginRequest] = useLoginMutation();
  const [logoutRequest] = useLogoutMutation();
  const [getMe] = useLazyGetMeQuery();

  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!storedToken) {
      return;
    }

    let cancelled = false;

    getMe()
      .unwrap()
      .then((profile) => {
        if (cancelled) return;
        setUser(profile);
        setToken(storedToken);
      })
      .catch(() => {
        if (cancelled) return;
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [getMe]);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await loginRequest({ email, password }).unwrap();
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);

      try {
        const profile = await getMe().unwrap();
        setToken(data.accessToken);
        setUser(profile);
      } catch (error) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        throw error;
      }
    },
    [loginRequest, getMe],
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest().unwrap();
    } catch {
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setToken(null);
      setUser(null);
      dispatch(baseApi2.util.resetApiState());
    }
  }, [logoutRequest, dispatch]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
