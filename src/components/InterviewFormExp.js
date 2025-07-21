import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './InterviewsPages.css';

const InterviewFormExp = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    companyName: '',
    rounds: '',
    experience: '',
    jobRole: '',
    details: '',
    anonymous: false,
  });

  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/api/userAddedInvExp`, formData);
      setMessage('Your interview experience has been successfully submitted! It is now pending review by the admin.');
      setIsModalOpen(true);
      setTimeout(() => navigate('/real-life-interview-experiences'), 3500);
    } catch (error) {
      setMessage('There was an error submitting your experience. Please try again.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="interview-form-wrapper">
      <div className="interview-form-card">
        <h1 className="interview-form-title">Share Your Interview Experience</h1>
        <p className="interview-form-subtitle">
          Your real experience can guide thousands. Be the spark for someone’s success.
        </p>

        {isModalOpen && (
          <div className="interview-modal">
            <div className="interview-modal-content">
              <strong style={{ color: message.startsWith('Your') ? '#16a34a' : '#d41f30' }}>
                {message.startsWith('Your') ? '🎉 Success!' : '⚠️ Error!'}
              </strong>
              <span>{message}</span>
            </div>
          </div>
        )}

        <form className="interview-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="interview-form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="interview-form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="interview-form-group">
              <label>Company</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>
            <div className="interview-form-group">
              <label>No. of Rounds</label>
              <input type="number" name="rounds" value={formData.rounds} onChange={handleChange} min="1" required />
            </div>
            <div className="interview-form-group">
              <label>Experience Level</label>
              <input type="text" name="experience" placeholder="Fresher, 2 Yrs" value={formData.experience} onChange={handleChange} required />
            </div>
            <div className="interview-form-group">
              <label>Job Role</label>
              <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} required />
            </div>
          </div>

          <div className="interview-form-group-full">
            <label>Detailed Experience</label>
            <textarea name="details" value={formData.details} onChange={handleChange} required rows="6" placeholder="Explain your interview process, questions, rounds..."></textarea>
          </div>

          <div className="checkbox-wrapper">
            <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} id="anonymous" />
            <label htmlFor="anonymous">Post as Anonymous</label>
          </div>

          <button type="submit" className="submit-btn">Submit Experience</button>
        </form>
      </div>
    </div>
  );
};

export default InterviewFormExp;
