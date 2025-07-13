import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminSide.css'; // Assuming you have a CSS file for styling

const EditJobData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  const [jobData, setJobData] = useState({
    title: '',
    role: '',
    batches: '',
    pay: '',
    location: '',
    description: '',
    eligibility: '',
    rolesAndResponsibilities: '',
    requirements: '',
    niceToHave: '',
    joblink: '',
    jobtype: '',
    jobbyrole: '',
    jobbycity: '',
    batch1: '',
    batch2: '',
    batch3: '',
    companyLogo: null
  });
  const [category, setCategory] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories
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

  useEffect(() => {
    // Fetch job details
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/job/${id}`);
        setJobData(response.data.job);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [id, backendURL]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (const key in jobData) {
      if (jobData[key] !== null && jobData[key] !== undefined) {
        formData.append(key, jobData[key]);
      }
    }
    try {
      await axios.post(`${backendURL}/api/updateJob/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Job updated successfully!');
      setTimeout(() => navigate('/admin/job-list'), 1200);
    } catch (error) {
      setMessage('Failed to update job. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="modern-jobadd-container">
      <form className="modern-jobadd-form" onSubmit={handleSubmit}>
        <h1 className="modern-jobadd-title">Edit Job</h1>
        {message && (
          <div className={`modern-jobadd-message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Company Name</label>
            <input type="text" name="title" value={jobData.title} onChange={handleChange} required />
          </div>
          <div className="modern-jobadd-field">
            <label>Job Role</label>
            <input type="text" name="role" value={jobData.role} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Expected Pay</label>
            <input type="text" name="pay" value={jobData.pay} onChange={handleChange} required />
          </div>
          <div className="modern-jobadd-field">
            <label>Job Locations</label>
            <input type="text" name="location" value={jobData.location} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Job Type</label>
            <select name="jobtype" value={jobData.jobtype} onChange={handleChange} required>
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
            <select name="jobbycity" value={jobData.jobbycity} onChange={handleChange} required>
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
            <select name="jobbyrole" value={jobData.jobbyrole} onChange={handleChange} required>
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
            <input type="text" name="joblink" value={jobData.joblink} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label>Batch One</label>
            <select name="batch1" value={jobData.batch1} onChange={handleChange} >
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
            <select name="batch2" value={jobData.batch2} onChange={handleChange} >
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
            <select name="batch3" value={jobData.batch3} onChange={handleChange} >
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
            <input type="text" name="batches" value={jobData.batches} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-field">
          <label>Job Description</label>
          <textarea name="description" value={jobData.description} onChange={handleChange} rows={3} required />
        </div>
        <div className="modern-jobadd-field">
          <label>Job Eligibility</label>
          <textarea name="eligibility" value={jobData.eligibility} onChange={handleChange} rows={4}  />
        </div>
        <div className="modern-jobadd-field">
          <label>Job Roles & Responsibilities</label>
          <textarea name="rolesAndResponsibilities" value={jobData.rolesAndResponsibilities} onChange={handleChange} rows={4}  />
        </div>
        <div className="modern-jobadd-field">
          <label>Job Requirements</label>
          <textarea name="requirements" value={jobData.requirements} onChange={handleChange} rows={4}  />
        </div>
        <div className="modern-jobadd-field">
          <label>Nice To Have/Prefered Qualification</label>
          <textarea name="niceToHave" value={jobData.niceToHave} onChange={handleChange} rows={4}  />
        </div>
        <div className="modern-jobadd-field">
          <label>Company Logo</label>
          <input type="file" name="companyLogo" onChange={handleChange} accept="image/*" />
        </div>
        <button type="submit" className="modern-jobadd-btn" disabled={loading}>
          {loading ? 'Updating...' : 'Update Job'}
        </button>
      </form>
    </div>
  );
};

export default EditJobData;
