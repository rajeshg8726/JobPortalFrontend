import React, { useState } from 'react';
import './Stylesheet.css';
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
      const response = await axios.post('/api/register', formData);
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
    <div className="loginCard">
       {/* Display message */}
       {message && <p>{message}</p>}
      <h4 className='adl'>Admin Register</h4>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="text" id="name" name='name' className="form-control" value={formData.name} onChange={handleChange} />
          <label className="form-label" htmlFor="form2Example1">Name</label>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input type="email" id="email" name='email' className="form-control" value={formData.email} onChange={handleChange} />
          <label className="form-label" htmlFor="form2Example1">Email address</label>
        </div>

        {/* Password input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="password" id="password" name='password' className="form-control" value={formData.password} onChange={handleChange} />
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4 btnsub">Register</button>
        <div className="text-center">
          <p>Registered User: <Link to="/admin/login">Login</Link></p>
        </div>
       
      </form>
    </div>
  );
}

export default Register;
