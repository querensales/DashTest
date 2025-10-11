import { createContext, useState, useContext, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // A lógica de login
  const login = (user: string, pass:string) => {
    if (user === 'Admin' && pass === 'Admin') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}