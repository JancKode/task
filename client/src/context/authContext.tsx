import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = React.useState<string | null>(() =>
    localStorage.getItem("userId")
  );
  const [token, setToken] = React.useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const isAuthenticated = !!token && !!userId;

  
  const login = (userId: string, token: string) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    setUserId(userId);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
