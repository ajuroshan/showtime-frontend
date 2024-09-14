import React, {useState, useContext} from 'react';
import {UserContext} from './UserContext';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password); // Capture the success status
        if (success) {
            navigate('/'); // Navigate only if login was successful
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
            <div className="col-md-6 col-lg-4">
                <div className="card p-4 border-0 text-white" style={{backgroundColor: '#0A1627'}}>
                    <h2 className="card-title text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        {error && (
                            <p className="text-danger mt-2" aria-live="assertive">
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
