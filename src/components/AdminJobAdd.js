import React, { useState, useEffect } from 'react';
import './adminSide.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminJobAdd = () => {
  const backendURL = process.env.REACT_APP_API_URL;
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
    jobtype: '',
    jobbyrole: '',
    jobbycity: '',
    batch1: '',
    batch2: '',
    batch3: '',
    companyLogo: null
  });

  const [message, setMessage] = useState('');
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/getCategory`);
        setCategory(response.data.CategoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [backendURL]);

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
    setLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.post(`${backendURL}/api/job`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Job added successfully!');
      setTimeout(() => {
        navigate('/admin/job-list');
      }, 1200);
    } catch (error) {
      setMessage('Failed to add job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-jobadd-container">
      <form className="modern-jobadd-form" onSubmit={handleSubmit}>
        <h1 className="modern-jobadd-title">Add New Job</h1>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Company Name</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="modern-jobadd-field">
            <label>Job Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Expected Pay</label>
            <input type="text" name="pay" value={formData.pay} onChange={handleChange} required />
          </div>
          <div className="modern-jobadd-field">
            <label>Job Locations</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Job Type</label>
            <select name="jobtype" value={formData.jobtype} onChange={handleChange} required>
              <option value="">Select Job Type</option>
              {category && category.length > 0
                ? category.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                : <option disabled>Loading...</option>
              }
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label>Job City</label>
            <select name="jobbycity" value={formData.jobbycity} onChange={handleChange} required>
              <option value="">Select Job City</option>
              {category && category.length > 0
                ? category.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                : <option disabled>Loading...</option>
              }
            </select>
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Job Role Category</label>
            <select name="jobbyrole" value={formData.jobbyrole} onChange={handleChange} required>
              <option value="">Select Job Role</option>
              {category && category.length > 0
                ? category.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                : <option disabled>Loading...</option>
              }
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label>Job Link</label>
            <input type="text" name="joblink" value={formData.joblink} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Batch One</label>
            <select name="batch1" value={formData.batch1} onChange={handleChange} required>
              <option value="">Select Batch One</option>
              {category && category.length > 0
                ? category.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                : <option disabled>Loading...</option>
              }
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label>Batch Two</label>
            <select name="batch2" value={formData.batch2} onChange={handleChange} required>
              <option value="">Select Batch Two</option>
              {category && category.length > 0
                ? category.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                : <option disabled>Loading...</option>
              }
            </select>
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Batch Three</label>
            <select name="batch3" value={formData.batch3} onChange={handleChange} required>
              <option value="">Select Batch Three</option>
              {category && category.length > 0
                ? category.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                : <option disabled>Loading...</option>
              }
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label>For Batches</label>
            <input type="text" name="batches" value={formData.batches} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-field">
          <label>Job Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required />
        </div>
        <div className="modern-jobadd-field">
          <label>Company Logo</label>
          <input type="file" name="companyLogo" onChange={handleFileChange} accept="image/*" />
        </div>
        <button type="submit" className="modern-jobadd-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {message && <div className="modern-jobadd-message">{message}</div>}
      </form>
    </div>
  );
};

export default AdminJobAdd;
