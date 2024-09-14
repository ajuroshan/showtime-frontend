import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const UserContext = createContext();


export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Optionally fetch user info on initial load if needed
    }, []);

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null); // Clear previous errors
        const csrftoken = getCookie('csrftoken');

        try {
            const response = await axios.post('http://localhost:8000/auth/login/',
                {username, password}, {
                    headers: {
                        'X-CSRFToken': csrftoken,
                    },
                }
            );
            const userData = response.data.user;
            setUser(userData);

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            setError(null); // Clear error if the login is successful
            return true; // Return true on success
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.error); // Show server error message
            } else {
                setError('Something went wrong, please try again.');
            }
            return false; // Return false on failure
        } finally {
            setIsLoading(false);
        }
    };


    const logout = async () => {
        setIsLoading(true);
        const csrftoken = getCookie('csrftoken');

        try {
            await axios.post('http://localhost:8000/auth/logout/', {}, {
                    headers: {
                        'X-CSRFToken': csrftoken,
                    }
                }
            );
            setUser(null);
            localStorage.removeItem('user');
            setError(null);
        } catch (error) {
            setError('Logout failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{user, isLoading, error, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};
