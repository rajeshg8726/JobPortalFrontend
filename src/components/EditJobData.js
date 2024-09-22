import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditJobData = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    jobtype: '',
    role: '',
    batches: '',
    pay: '',
    location: '',
    description: '',
    joblink: '',
    companyLogo: null, // For file input
  });

    const backendURL = process.env.REACT_APP_API_URL;
  // Fetch the existing job details when the component loads
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/job/${id}`);
        setJobData(response.data.job); // Pre-fill form with job details
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === 'companyLogo') {
      setJobData({ ...jobData, companyLogo: e.target.files[0] });
    } else {
      setJobData({ ...jobData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    for (const key in jobData) {
      formData.append(key, jobData[key]);
    }

    try {
      const response = await axios.post(`${backendURL}/api/updateJob/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Job updated successfully!');
      navigate('/admin/job-list');

    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job. Please try again.');
    }
  };

  return (
    <div className='container'>
      <form className='containerForm' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">Company Name</label>
          <input type="text" className="form-control" id="title" name="title" value={jobData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobtype" className="form-label">Job Type</label>
          <input type="text" className="form-control" id="jobtype" name="jobtype" value={jobData.jobtype} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobRole" className="form-label">Job Role</label>
          <input type="text" className="form-control" id="role" name="role" value={jobData.role} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="forBatches" className="form-label">For Batches</label>
          <input type="text" className="form-control" id="batches" name="batches" value={jobData.batches} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="expectedPay" className="form-label">Expected Pay</label>
          <input type="text" className="form-control" id="pay" name="pay" value={jobData.pay} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobLocations" className="form-label">Job Locations</label>
          <input type="text" className="form-control" id="location" name="location" value={jobData.location} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescriptions" className="form-label">Job Descriptions</label>
          <input type="text" className="form-control" id="description" name="description" value={jobData.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="joblink" className="form-label">Job Link</label>
          <input type="text" className="form-control" id="joblink" name="joblink" value={jobData.joblink} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="companyLogo" className="form-label">Company Logo</label>
          <input type="file" className="form-control" id="companyLogo" name="companyLogo" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary btnsub">Submit</button>
      </form>
    </div>
  );
};

export default EditJobData;
