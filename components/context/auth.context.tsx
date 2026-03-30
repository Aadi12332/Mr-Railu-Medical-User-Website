"use client"
import { settingApi } from "@/api/setting.api";
import { createContext, useContext, useEffect, useState } from "react";

type UserType = any;

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  getProfile: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  const getProfile = async () => {
    const token = localStorage.getItem("patientToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await settingApi.getRoleProfile(role!);
      setUser(res?.data || null);
    } catch (err) {
      console.error("Profile fetch failed", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("patientToken");
    setUser(null);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, getProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};