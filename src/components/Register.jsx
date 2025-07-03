import React, { useState } from 'react';
import './loginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post( `${backendURL}/api/register`, formData);
      console.log(response.data);

      // Handle successful registration (e.g., navigate to another page or show a success message)
      setMessage('Registration successful!');
      navigate('/admin/login'); // Navigate to the login page or another page
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Error during registration. Please try again.');
    }
  };

  return (
    <div className="modern-login-container">
      <div className="modern-login-card">
        {/* Display message */}
        {message && <p>{message}</p>}
        <h4 className='modern-login-title'>Admin Register</h4>
        <form onSubmit={handleSubmit} className="modern-login-form">
          {/* Email input */}
          <div className="modern-login-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name='name' value={formData.name} onChange={handleChange} />
          </div>

          <div className="modern-login-field">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} />
          </div>

          {/* Password input */}
          <div className="modern-login-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='password' value={formData.password} onChange={handleChange} />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block mb-4 btnsub modern-login-btn">Register</button>
          <div className="text-center modern-login-link">
            <p>Registered User: <Link to="/admin/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
