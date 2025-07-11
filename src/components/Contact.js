import React, { useState, useEffect } from 'react';
import './SecondStyleSheet.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      await axios.post(`${backendURL}/api/contactus`, formData);
      setMessage("✅ Your query was submitted successfully!");
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setMessage('');
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('❌ Error during submission. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="modern-contact-container">
      <div className="modern-contact-card">
        <h1 className="modern-contact-title">Contact Us</h1>
        <p className="modern-contact-desc">
          Have a question, suggestion, or feedback? Fill out the form below and our team will get back to you soon.
        </p>
        <p className="modern-contact-email">
          Or email us directly at:{" "}
          <a href="mailto:support@rgjobs.in" className="modern-contact-link">
            support@rgjobs.in
          </a>
        </p>
        {message && <div className="modern-contact-message">{message}</div>}
        <form className="modern-contact-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="modern-contact-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="modern-contact-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>
          <div className="modern-contact-field">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              disabled={submitting}
            />
          </div>
          <button
            type="submit"
            className="modern-contact-btn"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;