import React, { useState , useEffect} from 'react';
import './Stylesheet.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Fix typo here

  //   try {
  //     const response = await axios.post('/api/login', formData); // Add base URL if needed
  //     console.log(response.data);

  //     // Handle successful login (e.g., navigate to another page or show a success message)
  //     setMessage('Login successful!');
  //     navigate('/admin/add-new-job');
  //   } catch (error) {
  //     console.error('Error during Login:', error);
  //     setMessage('Error during Login. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( `${backendURL}/api/login`, formData);
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
  
      // Set up axios to include the token in the Authorization header
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      setMessage('Login successful!');
      navigate('/admin/add-new-job');
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error during login. Please try again.');
    }
  };
  
  // In the useEffect or before making any protected API calls
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   }
  // }, []);
  
  return (
    <div className="loginCard">
      <h4 className='adl'>Admin Login</h4>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="email" id="email" className="form-control" name='email' value={formData.email} onChange={handleChange} />
          <label className="form-label" htmlFor="email">Email address</label>
        </div>

        {/* Password input */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="password" id="password" className="form-control" name='password' value={formData.password} onChange={handleChange} />
          <label className="form-label" htmlFor="password">Password</label>
        </div>

        {/* 2 column grid layout for inline styling */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* Checkbox */}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="form2Example31" />
              <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col">
            {/* Simple link */}
            <Link to="#!">Forgot password?</Link>
          </div>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4 btnsub">Sign in</button>

        {/* Register buttons */}
        <div className="text-center">
          <p hidden>Not a member? <Link to="/admin/register">Register</Link></p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <FontAwesomeIcon icon={faFacebook} />
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <FontAwesomeIcon icon={faGoogle} />
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <FontAwesomeIcon icon={faTwitter} />
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <FontAwesomeIcon icon={faGithub} />
          </button>
        </div>

        {/* Display message */}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Login;
