import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/task';

interface AuthContextType {
  user: User | null;
  login: (username: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tasktrackr_user');
    return saved ? (JSON.parse(saved) as User) : null;
  });

  const login = (username: string, email: string) => {
    const userData: User = { username: username.trim(), email: email.trim() };
    setUser(userData);
    localStorage.setItem('tasktrackr_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tasktrackr_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};