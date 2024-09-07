import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditJobData = () => {
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    pay: '',
    location: '',
    description: '',
    jobtype: '',
    joblink: '',
    batches: '',
    companyLogo: null,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieve job ID from URL params
  const backendURL = process.env.REACT_APP_API_URL;
  // Fetch the job data when the component loads
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/job/${id}`);
        setFormData(response.data.job); // Populate the form with fetched data
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, [id]);

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      companyLogo: e.target.files[0], // File object
    });
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // Create FormData to handle file uploads
    formDataToSend.append('title', formData.title);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('pay', formData.pay);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('jobtype', formData.jobtype);
    formDataToSend.append('joblink', formData.joblink);
    formDataToSend.append('batches', formData.batches);

    // Only append the logo if a new one is uploaded
    if (formData.companyLogo) {
      formDataToSend.append('companyLogo', formData.companyLogo);
    }

    try {
      const response = await axios.put(`${backendURL}/api/updateJob/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setMessage('Job updated successfully!');
      setTimeout(() => navigate('/admin/job-list'), 2000); // Redirect after success
    } catch (error) {
      console.error('Error updating job:', error);
      setMessage('Failed to update job');
    }
  };

  return (
    <div className='container'>
      {message && <div className="alert alert-info mt-3">{message}</div>} {/* Conditional message display */}
      <form className='containerForm' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Company Name</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobtype" className="form-label">Job Type</label>
          <input type="text" className="form-control" id="jobtype" name="jobtype" value={formData.jobtype} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Job Role</label>
          <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="batches" className="form-label">For Batches</label>
          <input type="text" className="form-control" id="batches" name="batches" value={formData.batches} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="pay" className="form-label">Expected Pay</label>
          <input type="text" className="form-control" id="pay" name="pay" value={formData.pay} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Job Locations</label>
          <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Job Descriptions</label>
          <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="joblink" className="form-label">Job Link</label>
          <input type="text" className="form-control" id="joblink" name="joblink" value={formData.joblink} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="companyLogo" className="form-label">Company Logo</label>
          <input type="file" className="form-control" id="companyLogo" name="companyLogo" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary btnsub">Submit</button>
      </form>
    </div>
  );

  
};

export default EditJobData;
