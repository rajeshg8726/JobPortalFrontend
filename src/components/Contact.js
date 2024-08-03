import React from 'react'
import './Stylesheet.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Contact = () => {

  const[formData, setFormData] = useState([]);
  const[message, setMessage] = useState('');
  const Navigate = useNavigate();
  


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =  await axios.post('/api/contactus', formData);
      console.log(response.data);
      setMessage("Your Query Submitted Successfully!");
      Navigate('/contact');
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Error during registration. Please try again.');
    }
  }
  return (
    <div className="page-container">
       {/* Display message */}
       {message && <p>{message}</p>}
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit} >
        <label>
          Name:
          <input type="text" name="name" id='name' value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" id='email' value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Message:
          <textarea name="message" id='message' value={formData.message} onChange={handleChange}/>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contact