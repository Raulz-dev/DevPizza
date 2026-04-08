import { type FC, type ReactNode, useEffect, useState } from "react";
import { api } from "../lib/api";
import { AuthContext, type AuthContextType, type RegisterPayload, type User } from "./AuthContext";

type MockUser = User & {
  password: string;
  shift: string;
};

const TOKEN_STORAGE_KEY = "token";
const AUTH_USER_STORAGE_KEY = "auth_user";
const MOCK_USERS_STORAGE_KEY = "devpizza_mock_users";

const DEFAULT_MOCK_USER: MockUser = {
  id: 1,
  name: "Raul Pontes",
  email: "raul@devpizza.com",
  role: "MANAGER",
  shift: "NOITE",
  password: "123456",
};

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function normalizeUsers(raw: MockUser[] | null): MockUser[] {
  if (!raw || raw.length === 0) return [DEFAULT_MOCK_USER];

  const hasDefault = raw.some((user) => user.email.toLowerCase() === DEFAULT_MOCK_USER.email.toLowerCase());
  return hasDefault ? raw : [DEFAULT_MOCK_USER, ...raw];
}

function getMockUsers(): MockUser[] {
  if (typeof window === "undefined") return [DEFAULT_MOCK_USER];
  const parsed = safeParse<MockUser[]>(localStorage.getItem(MOCK_USERS_STORAGE_KEY));
  return normalizeUsers(parsed);
}

function saveMockUsers(users: MockUser[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_USERS_STORAGE_KEY, JSON.stringify(normalizeUsers(users)));
}

function toPublicUser(user: MockUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const initialToken = typeof window !== "undefined" ? localStorage.getItem(TOKEN_STORAGE_KEY) : null;
  const initialUser = typeof window !== "undefined" ? safeParse<User>(localStorage.getItem(AUTH_USER_STORAGE_KEY)) : null;

  const [token, setToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    saveMockUsers(getMockUsers());
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      if (!user && typeof window !== "undefined") {
        const storedUser = safeParse<User>(localStorage.getItem(AUTH_USER_STORAGE_KEY));
        if (storedUser) setUser(storedUser);
      }
      return;
    }

    delete api.defaults.headers.common.Authorization;
    setUser(null);
  }, [token, user]);

  const login: AuthContextType["login"] = async (email, password) => {
    const users = getMockUsers();
    const match = users.find(
      (candidate) => candidate.email.toLowerCase() === email.toLowerCase() && candidate.password === password
    );

    if (!match) {
      throw new Error("Credenciais inválidas");
    }

    const publicUser = toPublicUser(match);
    const nextToken = `mock-${match.id}-${Date.now()}`;

    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(publicUser));

    setToken(nextToken);
    setUser(publicUser);
  };

  const register: AuthContextType["register"] = async (payload: RegisterPayload) => {
    const users = getMockUsers();

    const exists = users.some((candidate) => candidate.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) {
      throw new Error("E-mail já cadastrado.");
    }

    const nextId = users.reduce((max, current) => Math.max(max, Number(current.id) || 0), 0) + 1;

    const created: MockUser = {
      id: nextId,
      name: payload.name,
      email: payload.email,
      role: payload.cargo,
      shift: payload.turno,
      password: payload.senha,
    };

    saveMockUsers([...users, created]);
  };

  const logout: AuthContextType["logout"] = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
