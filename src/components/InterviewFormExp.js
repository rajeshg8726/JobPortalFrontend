import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

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

  const [message, setMessage] = useState(''); // State for the submission message
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
      const response = await axios.post(`${backendURL}/api/userAddedInvExp`, formData);
      console.log('Data submitted successfully:', response.data);
      setMessage('Your interview experience has been successfully submitted! It is now pending review by the admin.')
      setIsModalOpen(true);
      setTimeout(() => {
        navigate('/real-life-interview-experiences');
      }, 5000); // Navigate after 5 seconds
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container mt-4'>
      {isModalOpen && (
        <div class="alert alert-primary" role="alert">
          <strong style={{color:'green'}} >Congratulations!</strong>  {message} 
        </div>
      )}
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Add each input field with the name attribute and value binding */}
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
        </div>
        {/* Repeat for other fields */}
        <div className="col-md-6">
          <label className="form-label">Company Name</label>
          <input type="text" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Number Of Rounds</label>
          <input type="number" name="rounds" className="form-control" value={formData.rounds} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Freshers/Experienced</label>
          <input type="text" name="experience" className="form-control" value={formData.experience} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Job Role</label>
          <input type="text" name="jobRole" className="form-control" value={formData.jobRole} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Share In Detail</label>
          <textarea type="text" name="details" className="form-control" value={formData.details} onChange={handleChange} placeholder="Explain Your Exp. In Detail" />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} />
            <label className="form-check-label">Post As Anonymous</label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-sm btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default InterviewFormExp;
