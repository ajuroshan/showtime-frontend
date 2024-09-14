import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await axios.post('http://localhost:8000/auth/login/', { username, password });
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
        try {
            await axios.post('http://localhost:8000/auth/logout/');
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
