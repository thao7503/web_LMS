import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SpinnerLoading } from '../layouts/Utils/SpinnerLoading';

const LoginWidget = () => {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <SpinnerLoading />;
    }

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container mt-5 mb-5">
            <form onSubmit={handleLogin}>
                <h3>Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginWidget;
