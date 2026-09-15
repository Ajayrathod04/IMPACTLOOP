import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isGuest: boolean;
  isAuthenticated: boolean;
  cognitoConfigured: boolean;
  user: { name?: string; email?: string } | null;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isGuest: true,
  isAuthenticated: false,
  cognitoConfigured: false,
  user: null,
  loginAsGuest: () => {},
  logout: () => {}
});

export const CognitoAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isGuest, setIsGuest] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  const cognitoUserPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID || '';
  const cognitoClientId = import.meta.env.VITE_COGNITO_CLIENT_ID || '';
  const cognitoConfigured = !!(cognitoUserPoolId && cognitoClientId);

  useEffect(() => {
    // Default mode is ALWAYS Guest Demo Mode unless explicit session token exists
    const storedAuth = localStorage.getItem('impactloop_auth_user');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed);
        setIsAuthenticated(true);
        setIsGuest(false);
      } catch {
        setIsGuest(true);
      }
    }
  }, []);

  const loginAsGuest = () => {
    setIsGuest(true);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('impactloop_auth_user');
  };

  const logout = () => {
    loginAsGuest();
  };

  return (
    <AuthContext.Provider
      value={{
        isGuest,
        isAuthenticated,
        cognitoConfigured,
        user,
        loginAsGuest,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
