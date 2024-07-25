import { useState, useEffect, createContext, useCallback, useMemo } from 'react';
import { getUser, loginUser, registerUser } from '../hooks/useAuth';

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
  }, [fetchUser]);

  const login = (email, password, setAlert) => {
    loginUser(email, password).then((data) => {
      if (data.credentials) {
        localStorage.setItem('user', JSON.stringify(data.credentials));
        setUser(data.credentials);
      }
      setAlert(data);
    });
  };

  const register = async (email, password, password2, setAlert) => {
    registerUser(email, password, password2).then((data) => {
      if (data.credentials) {
        localStorage.setItem('user', JSON.stringify(data.credentials));
        setUser(data.credentials);
      }
      setAlert(data);
    });
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('user');
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      login,
      register,
      logout,
    }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
