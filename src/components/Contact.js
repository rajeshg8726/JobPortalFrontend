import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [submitting, setSubmitting] = useState(false);
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
      setMessageType('success');
      setMessage('✅ Your message has been sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    } catch (error) {
      setMessageType('error');
      setMessage('❌ Failed to send your message. Please try again or email us directly.');
    }
    setSubmitting(false);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Decorative Background Elements */}
      <div className="contact-bg-blur contact-bg-blur-1"></div>
      <div className="contact-bg-blur contact-bg-blur-2"></div>

      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <div className="contact-header-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </div>
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions about our job portal? We'd love to hear from you. Send us a message and our team will respond as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Information Cards */}
          <div className="contact-info-section">
            {/* Email Card */}
            <div className="contact-card">
              <div className="contact-card-header">
                <div className="contact-card-icon email-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="contact-card-title">Email</h3>
              <a href="mailto:rgjobsupdate@gmail.com" className="contact-card-link">
                rgjobsupdate@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="contact-card">
              <div className="contact-card-header">
                <div className="contact-card-icon phone-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="contact-card-title">Phone</h3>
              <p className="contact-card-description">Available during business hours</p>
            </div>

            {/* Location Card */}
            <div className="contact-card">
              <div className="contact-card-header">
                <div className="contact-card-icon location-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </div>
              <h3 className="contact-card-title">Location</h3>
              <p className="contact-card-description">India</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="contact-form-wrapper">
              {message && (
                <div className={`contact-message ${messageType === 'success' ? 'contact-message-success' : 'contact-message-error'}`}>
                  <p>{message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} autoComplete="off" className="contact-form">
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="form-input"
                  />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="form-input"
                  />
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    disabled={submitting}
                    className="form-textarea"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="submit-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>

                <p className="form-footer">
                  We typically respond within 24 business hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;