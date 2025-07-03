import React, { useState } from 'react';
import axios from 'axios';
import './loginRegister.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const backendURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${backendURL}/api/login`, formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setMessage('Login successful!');
      setIsModalOpen(true);
      setTimeout(() => {
        navigate('/admin/add-new-job');
      }, 2000);
    } catch (error) {
      setMessage('Invalid email or password. Please try again.');
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-login-container">
      <div className="modern-login-card">
        <h1 className="modern-login-title">Admin Login</h1>
        <p className="modern-login-lead">Sign in to access the admin dashboard.</p>
        {isModalOpen && (
          <div className="modern-login-modal">
            <div className="modern-login-modal-content">
              <strong style={{ color: message === 'Login successful!' ? '#16a34a' : '#d41f30' }}>
                {message === 'Login successful!' ? 'Welcome!' : 'Oops!'}
              </strong>
              <span> {message} </span>
            </div>
          </div>
        )}
        <form className="modern-login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="modern-login-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your email"
            />
          </div>
          <div className="modern-login-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="modern-login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
