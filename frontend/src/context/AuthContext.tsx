 // src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
 

interface User {
  name: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  logged:boolean
}

export const  AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logged , setLogged] = useState(false)
  // 🔹 Fetch user when component mounts (if token exists)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: { Authorization:token },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 When user logs in successfully (e.g. after signin)
  const login = async (token: string) => {
    localStorage.setItem("token", token);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: { Authorization: `${token}` },
      });
      setUser(res.data.user);
      setLogged(true)
    } catch (error) {
      console.error("Error during login:", error);

    }
  };

  // 🔹 Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setLogged(false)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout,logged }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Custom hook for consuming context easily
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
