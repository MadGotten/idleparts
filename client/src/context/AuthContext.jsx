import { useState, useEffect, createContext, useCallback, useMemo } from 'react';
import { getUser, loginUser, registerUser } from '@/hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });
  const [userLoaded, setUserLoaded] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const currentUser = await getUser();
      if (currentUser.credentials) {
        localStorage.setItem('user', JSON.stringify(currentUser.credentials));
        setUser(currentUser.credentials);
        setUserLoaded(true);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUser();
    } else {
      setUserLoaded(true);
    }
  }, []);

  const login = useCallback((email, password, setAlert) => {
    loginUser(email, password).then((data) => {
      if (data.credentials) {
        localStorage.setItem('user', JSON.stringify(data.credentials));
        setUser(data.credentials);
      }
      setAlert(data);
    });
  }, []);

  const register = useCallback(async (email, password, password2, setAlert) => {
    registerUser(email, password, password2).then((data) => {
      if (data.credentials) {
        localStorage.setItem('user', JSON.stringify(data.credentials));
        setUser(data.credentials);
      }
      setAlert(data);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      userLoaded,
      setUser,
      login,
      register,
      logout,
    }),
    [user, userLoaded, login, register, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
