import React, { useState } from 'react';
import { register, login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', contactNumber: '' });
    const [isSignInMode, setIsSignInMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const validateForm = () => {
        const { email, password, name, contactNumber } = formData;
        if (!email || !password || (isSignInMode ? false : !name || !contactNumber)) {
            toast.error('Please fill in all required fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            if (isSignInMode) {
                const response = await login({ email: formData.email, password: formData.password });
                const userName = response.user.name; // Adjust according to your API response structure
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userName", userName);
                toast.success("Logged in successfully!");
                navigate('/');
            } else {
                await register(formData);
                toast.success("Registration successful! Please sign in.");
                setIsSignInMode(true);
            }
        } catch (error) {
            console.error('Error:', error); // Log error for debugging
            toast.error(isSignInMode ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
            if (!isSignInMode) setFormData({ name: '', email: '', password: '', contactNumber: '' }); // Reset form data after registration
        }
    };

    return (
        <div className="register-background">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className={`register-container ${isSignInMode ? 'sign-in-mode' : ''}`}>
                <div className="welcome-section">
                    <h1>{isSignInMode ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
                    <p>{isSignInMode ? 'Enter your details and start your journey with us.' : 'Please sign in with your info'}</p>
                    <button className="toggle-btn" onClick={() => setIsSignInMode(!isSignInMode)}>
                        {isSignInMode ? 'SIGN UP' : 'SIGN IN'}
                    </button>
                </div>

                <div className="register-section">
                    <img src="./logo2.png" className="logo" alt="logo" />
                    <h1>{isSignInMode ? 'Sign In' : 'Create Account'}</h1>
                    <form onSubmit={handleSubmit}>
                        {!isSignInMode && (
                            <>
                                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                                <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
                            </>
                        )}
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <div className="password-input-container">
                            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? '🙈' : '🐵'}
                            </span>
                        </div>
                        <button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : (isSignInMode ? 'SIGN IN' : 'SIGN UP')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
