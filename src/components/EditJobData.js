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
        <h1 className="modern-jobadd-title">Add New Job</h1>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="title">Job Title</label>
            <input type="text" id="title" name="title" value={jobData.title} onChange={handleChange} required />
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="role">Job Role</label>
            <input type="text" id="role" name="role" value={jobData.role} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="pay">Expected Pay</label>
            <input type="text" id="pay" name="pay" value={jobData.pay} onChange={handleChange} required />
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="location">Job Locations</label>
            <input type="text" id="location" name="location" value={jobData.location} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="jobexplevel">Job Experience Level</label>
            <select id="jobexplevel" name="jobexplevel" value={jobData.jobexplevel} onChange={handleChange} required>
              <option value="">Select Experience Level</option>
              {jobExpLevel.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="jobbycity">Job Location</label>
            <select id="jobbycity" name="jobbycity" value={jobData.jobbycity} onChange={handleChange} required>
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
            <select id="jobtype" name="jobtype" value={jobData.jobtype} onChange={handleChange} required>
              <option value="">Select Company Type</option>
              {jobCompanyType.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="jobpayrange">Job Pay Range</label>
            <select id="jobpayrange" name="jobpayrange" value={jobData.jobpayrange} onChange={handleChange} required>
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
            <select id="jobbyrole" name="jobbyrole" value={jobData.jobbyrole} onChange={handleChange} required>
              <option value="">Select Job Role</option>
              {jobRole.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="joblink">Job Link</label>
            <input type="text" id="joblink" name="joblink" value={jobData.joblink} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="batch1">Select Past Batches </label>
            <select id="batch1" name="batch1" value={jobData.batch1} onChange={handleChange}>
              <option value="">Select Past Batches</option>
              {jobBatch.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="batch2">Batch Two</label>
            <select id="batch2" name="batch2" value={jobData.batch2} onChange={handleChange}>
              <option value="">Select Current with Upcoming Batches </option>
              {jobBatch.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modern-jobadd-row">
          <div className="modern-jobadd-field">
            <label htmlFor="batch3">Job Domain</label>
            <select id="batch3" name="batch3" value={jobData.batch3} onChange={handleChange}>
              <option value="">Select Job Domain</option>
              {jobDomain.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="modern-jobadd-field">
            <label htmlFor="batches">For Batches</label>
            <input type="text" id="batches" name="batches" value={jobData.batches} onChange={handleChange} required />
          </div>
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="description">Job Description</label>
          <textarea id="description" name="description" value={jobData.description} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="eligibility">Job Eligibility</label>
          <textarea id="eligibility" name="eligibility" value={jobData.eligibility} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="rolesAndResponsibilities">Job Roles & Responsibilities</label>
          <textarea id="rolesAndResponsibilities" name="rolesAndResponsibilities" value={jobData.rolesAndResponsibilities} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="requirements">Job Requirements</label>
          <textarea id="requirements" name="requirements" value={jobData.requirements} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="niceToHave">Nice To Have/Preferred Qualification</label>
          <textarea id="niceToHave" name="niceToHave" value={jobData.niceToHave} onChange={handleChange} rows={4} />
        </div>
        <div className="modern-jobadd-field">
          <label htmlFor="companyLogo">Company Logo</label>
          <input type="file" id="companyLogo" name="companyLogo" onChange={handleChange} accept="image/*" />
        </div>
        <button type="submit" className="modern-jobadd-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {message && <div className="modern-jobadd-message">{message}</div>}
      </form>
    </div>
  );
};

export default EditJobData;
