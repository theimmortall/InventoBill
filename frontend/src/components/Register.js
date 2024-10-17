// src/components/Register.js
import React, { useState } from 'react';
import { register, login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', contactNumber: '' });
    const [isSignInMode, setIsSignInMode] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields.');
            return false;
        }
        if (!isSignInMode && (!formData.name || !formData.contactNumber)) {
            setError('Please fill in all required fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        if (isSignInMode) {
            try {
                await login({ email: formData.email, password: formData.password });
                setSuccess(true);
                setMessage('Login successful! Welcome back!');
                setError('');
                setLoading(false);
                setFormData({ email: '', password: '', name: '', contactNumber: '' });
                navigate('/dashboard'); // Navigate to dashboard after login
            } catch (error) {
                setError('Login failed. Please check your credentials.');
                setLoading(false);
            }
        } else {
            try {
                await register(formData);
                setSuccess(true);
                setMessage('Registration successful! You can now Sign in.');
                setError('');
                setIsSignInMode(true);
                setLoading(false);
            } catch (error) {
                setError('Registration failed. Please try again.');
                setLoading(false);
            }
        }
    };

    const toggleMode = () => {
        setIsSignInMode(!isSignInMode);
        setFormData({ name: '', email: '', password: '', contactNumber: '' });
        setError('');
        setSuccess(false);
    };

 

    return (
        <div className={`register-container ${isSignInMode ? 'sign-in-mode' : ''}`}>
            <div className="welcome-section">
                <h1>{isSignInMode ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
                <p>{isSignInMode
                    ? 'Enter your details and start your journey with us.'
                    : 'To keep connected with us please sign in with your personal info'}
                </p>
                <button className="toggle-btn" onClick={toggleMode}>
                    {isSignInMode ? 'SIGN UP' : 'SIGN IN'}
                </button>
            </div>

            <div className="register-section">
                <img src="./logo2.png" className="logo" alt="logo" />
                <h1>{isSignInMode ? 'Sign In' : 'Create Account'}</h1>
                <form onSubmit={handleSubmit}>
                    {!isSignInMode && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required={!isSignInMode}
                            />
                            <input
                                type="text"
                                name="contactNumber"
                                placeholder="Contact Number"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required={!isSignInMode}
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>

                    

                    <button className="submit-btn" type="submit" disabled={loading}>
                        {loading ? 'Loading...' : (isSignInMode ? 'SIGN IN' : 'SIGN UP')}
                    </button>
                </form>
                {success && <div className="success-message" aria-live="polite"><p>{message}</p></div>}
                {error && <p className="error-message" aria-live="polite">{error}</p>}
            </div>
        </div>
    );
};

export default Register;
