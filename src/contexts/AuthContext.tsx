import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authConfig } from "../data/valentinesData";
import { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("valentines_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Normalize usernames by removing spaces and converting to lowercase
    const normalizedInput = username.replace(/\s+/g, "").toLowerCase();
    const normalizedExpected = authConfig.username
      .replace(/\s+/g, "")
      .toLowerCase();

    if (
      normalizedInput === normalizedExpected &&
      password === authConfig.secretAnswer
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("valentines_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("valentines_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
