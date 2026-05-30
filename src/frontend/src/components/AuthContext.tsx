import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AuthUser } from '@/types/entities';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<AuthUser | null>(null);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
