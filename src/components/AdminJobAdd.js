import React, { useState, useEffect } from 'react';
import './Stylesheet.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminJobAdd = () => {

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/admin/login'); 
     
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: '',
    role: '',
    batches: '',
    pay: '',
    location: '',
    description: '',
    joblink: '',
    jobtype:'',
    companyLogo: null
  });

  const [message, setMessage] = useState(''); // State for the submission message
 // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      companyLogo: e.target.files[0]
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('/api/admin/addJob', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setMessage('Job added successfully!');
      setTimeout(() => {
        navigate('/admin/job-list'); // Navigate to /admin/job-list after 2 seconds
      }, 1000); // Adjust the timeout duration as needed
    } catch (error) {
      console.error(error);
      setMessage('Failed to add job. Please try again.');
    }
  };

  return (
    <div className='container'>  
      <form className='containerForm' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">Company Name</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobtype" className="form-label">Job Type</label>
          <input type="text" className="form-control" id="jobtype" name="jobtype" value={formData.jobtype} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobRole" className="form-label">Job Role</label>
          <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="forBatches" className="form-label">For Batches</label>
          <input type="text" className="form-control" id="batches" name="batches" value={formData.batches} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="expectedPay" className="form-label">Expected Pay</label>
          <input type="text" className="form-control" id="pay" name="pay" value={formData.pay} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobLocations" className="form-label">Job Locations</label>
          <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescriptions" className="form-label">Job Descriptions</label>
          <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescriptions" className="form-label">Job Link</label>
          <input type="text" className="form-control" id="joblink" name="joblink" value={formData.joblink} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="companyLogo" className="form-label">Company Logo</label>
          <input type="file" className="form-control" id="companyLogo" name="companyLogo" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary btnsub">Submit</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>} {/* Conditional message display */}
    </div>
  );
}

export default AdminJobAdd;
