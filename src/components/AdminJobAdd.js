import React, { useState, useEffect } from 'react';
import './AdminJobAdd.css';
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
    jobexplevel: '',
    jobpayrange: '',
    companyLogo: null
  });

  const [message, setMessage] = useState('');
  const [jobRole, setJobRole] = useState([]);
  const [jobLocation, setJobLocation] = useState([]);
  const [jobBatch, setJobBatch] = useState([]);
  const [jobPay, setJobPay] = useState([]);
  const [jobDomain, setJobDomain] = useState([]);
  const [jobExpLevel, setJobExpLevel] = useState([]);
  const [jobCompanyType, setJobCompanyType] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const rolesdata = await axios.get(`${backendURL}/api/getRolesCat`);
        const locationdata = await axios.get(`${backendURL}/api/getLocationCat`);
        const batchdata = await axios.get(`${backendURL}/api/getBatchCat`);
        const paydata = await axios.get(`${backendURL}/api/getPayCat`);
        const domaindata = await axios.get(`${backendURL}/api/getDomainCat`);
        const expLevelData = await axios.get(`${backendURL}/api/getExpLevelCat`);
        const companyTypeData = await axios.get(`${backendURL}/api/getCompanyCat`);
        setJobRole(rolesdata.data.roleData || []);
        setJobLocation(locationdata.data.roleData || []);
        setJobBatch(batchdata.data.roleData || []);
        setJobPay(paydata.data.roleData || []);
        setJobDomain(domaindata.data.roleData || []);
        setJobExpLevel(expLevelData.data.roleData || []);
        setJobCompanyType(companyTypeData.data.roleData || []);
      } catch (error) {
        console.error('Error fetching different categories:', error);
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
      companyLogo: e.target.files[0] || null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
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
            <label htmlFor="title">Job Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="role">Job Role</label>
            <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="pay">Expected Pay</label>
            <input type="text" id="pay" name="pay" value={formData.pay} onChange={handleChange} required />
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="location">Job Locations</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="jobexplevel">Job Experience Level</label>
            <select id="jobexplevel" name="jobexplevel" value={formData.jobexplevel} onChange={handleChange} required>
              <option value="">Select Experience Level</option>
              {jobExpLevel.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="jobbycity">Job Location</label>
            <select id="jobbycity" name="jobbycity" value={formData.jobbycity} onChange={handleChange} required>
              <option value="">Select Job City</option>
              {jobLocation.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="jobtype">Job Company Type</label>
            <select id="jobtype" name="jobtype" value={formData.jobtype} onChange={handleChange} required>
              <option value="">Select Company Type</option>
              {jobCompanyType.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="jobpayrange">Job Pay Range</label>
            <select id="jobpayrange" name="jobpayrange" value={formData.jobpayrange} onChange={handleChange} required>
              <option value="">Select Pay Range</option>
              {jobPay.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="jobbyrole">Job Role</label>
            <select id="jobbyrole" name="jobbyrole" value={formData.jobbyrole} onChange={handleChange} required>
              <option value="">Select Job Role</option>
              {jobRole.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="joblink">Job Link</label>
            <input type="text" id="joblink" name="joblink" value={formData.joblink} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="batch1">Select Past Batches</label>
            <select id="batch1" name="batch1" value={formData.batch1} onChange={handleChange}>
              <option value="">Select Past Batches</option>
              {jobBatch.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="batch2">Current with Upcoming Batches</label>
            <select id="batch2" name="batch2" value={formData.batch2} onChange={handleChange}>
              <option value="">Upcoming with Current</option>
              {jobBatch.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="batch3">Job Domain</label>
            <select id="batch3" name="batch3" value={formData.batch3} onChange={handleChange}>
              <option value="">Select Job Domain</option>
              {jobDomain.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="batches">For Batches</label>
            <input type="text" id="batches" name="batches" value={formData.batches} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="description">Job Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="eligibility">Job Eligibility</label>
          <textarea id="eligibility" name="eligibility" value={formData.eligibility} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="rolesAndResponsibilities">Job Roles & Responsibilities</label>
          <textarea id="rolesAndResponsibilities" name="rolesAndResponsibilities" value={formData.rolesAndResponsibilities} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="requirements">Job Requirements</label>
          <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="niceToHave">Nice To Have/Preferred Qualification</label>
          <textarea id="niceToHave" name="niceToHave" value={formData.niceToHave} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="companyLogo">Company Logo</label>
          <input type="file" id="companyLogo" name="companyLogo" onChange={handleFileChange} accept="image/*" />
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
