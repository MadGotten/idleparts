import React, { useState, useEffect, createContext } from 'react';
import { getUser } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const localUser = JSON.parse(localStorage.getItem('user')) || undefined;
	const [ user, setUser ] = useState(localUser);
    useEffect(() => {
		if(user){
			getUser().then(currentUser => {
				console.log("user: ", currentUser.credentials);
				if (currentUser.credentials) {
					localStorage.setItem('user', JSON.stringify(currentUser.credentials));
					setUser(currentUser.credentials);
				} else {
					localStorage.removeItem('user')
				}
			}).catch((err) => {
				console.error('Error fetching user:', err)
			})
		}
    // eslint-disable-next-line
    }, []);

	return (
		<AuthContext.Provider value={[user, setUser]}>
			{ children }
		</AuthContext.Provider>
	);
};


export default AuthContext;