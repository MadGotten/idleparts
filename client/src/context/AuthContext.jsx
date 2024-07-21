import { useState, useEffect, createContext, useCallback } from 'react';
import { getUser } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const fetchUser = useCallback(async () => {
    try {
      const currentUser = await getUser();
      if (currentUser.credentials) {
        localStorage.setItem('user', JSON.stringify(currentUser.credentials));
        setUser(currentUser.credentials);
      } else {
        localStorage.removeItem('user');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  return <AuthContext.Provider value={[user, setUser]}>{children}</AuthContext.Provider>;
};

export default AuthContext;
