import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './InterviewsPages.css'; // Assuming you have a CSS file for styling
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
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/api/userAddedInvExp`, formData);
      setMessage('Your interview experience has been successfully submitted! It is now pending review by the admin.');
      setIsModalOpen(true);
      setTimeout(() => {
        navigate('/real-life-interview-experiences');
      }, 3500);
    } catch (error) {
      setMessage('There was an error submitting your experience. Please try again.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="modern-invform-container">
      <div className="modern-invform-card">
        <h1 className="modern-invform-title">Share Your Interview Experience</h1>
        <p className="modern-invform-lead">
          Help others by sharing your real interview journey. Your story can inspire and guide future candidates!
        </p>
        {isModalOpen && (
          <div className="modern-invform-modal">
            <div className="modern-invform-modal-content">
              <strong style={{ color: message.startsWith('Your') ? '#16a34a' : '#d41f30' }}>
                {message.startsWith('Your') ? 'Congratulations!' : 'Oops!'}
              </strong>
              <span> {message} </span>
            </div>
          </div>
        )}
        <form className="modern-invform-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="modern-invform-row">
            <div className="modern-invform-field">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="off" />
            </div>
            <div className="modern-invform-field">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="off" />
            </div>
          </div>
          <div className="modern-invform-row">
            <div className="modern-invform-field">
              <label>Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required autoComplete="off" />
            </div>
            <div className="modern-invform-field">
              <label>Number Of Rounds</label>
              <input type="number" name="rounds" value={formData.rounds} onChange={handleChange} min="1" required />
            </div>
          </div>
          <div className="modern-invform-row">
            <div className="modern-invform-field">
              <label>Freshers/Experienced</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} required autoComplete="off" placeholder="e.g. Fresher, 2 Years" />
            </div>
            <div className="modern-invform-field">
              <label>Job Role</label>
              <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} required autoComplete="off" />
            </div>
          </div>
          <div className="modern-invform-field">
            <label>Share In Detail</label>
            <textarea name="details" value={formData.details} onChange={handleChange} required placeholder="Explain your experience in detail..." rows={5} />
          </div>
          <div className="modern-invform-checkbox">
            <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} id="anonymous" />
            <label htmlFor="anonymous">Post As Anonymous</label>
          </div>
          <button type="submit" className="modern-invform-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default InterviewFormExp;
