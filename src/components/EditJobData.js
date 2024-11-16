import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditJobData = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    role: '',
    batches: '',
    pay: '',
    location: '',
    description: '',
    joblink: '',
    jobtype:'',
    jobbyrole: '',
    jobbycity:'',
    batch1:'',
    batch2:'',
    batch3:'',
    companyLogo: null
  });

    const backendURL = process.env.REACT_APP_API_URL;
    const [category , setCategory] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
     // Fetch categories when the component mounts
     const fetchCategories = async () => {
         try {
             const response = await axios.get(`${backendURL}/api/getCategory`);
             setCategory(response.data.CategoryData);  // Assuming response.data is the array of categories
         } catch (error) {
             console.error('Error fetching categories:', error);
         }
     };
   
     fetchCategories();
   }, [backendURL]);
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
  const handleFileChange = (e) => {
    setJobData({
      ...jobData,
      companyLogo: e.target.files[0]
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare form data for submission
    const formData = new FormData();
    for (const key in jobData) {
      if (jobData[key] !== null && jobData[key] !== undefined) {
        formData.append(key, jobData[key]);
      }
    }
  
    try {
      const response = await axios.post(`${backendURL}/api/updateJob/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Job updated successfully!');
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
          <label htmlFor="floatingInput" className="form-label ">Company Name</label>
          <input type="text" className="form-control" id="title" name="title" value={jobData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <select className='form-select' name="jobtype" value={jobData.jobtype} onChange={handleChange}>
                <option value="">Select Job Type</option>
                { category && category.length > 0 ? (  // Check if category is defined and not empty
                    category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Job Type...</option>
                )}
            </select>
        </div>
        <div className="mb-3">
          <select className='form-select' name="jobbycity" value={jobData.jobbycity} onChange={handleChange}>
                <option value="">Select Job City</option>
                {category && category.length > 0 ? (  // Check if category is defined and not empty
                    category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Job City...</option>
                )}
            </select>
        </div>
        
        <div className="mb-3">
          <select className='form-select' name="jobbyrole" value={jobData.jobbyrole} onChange={handleChange}>
                <option value="">Select Job Role</option>
                {category && category.length > 0 ? (  // Check if category is defined and not empty
                    category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Job Role...</option>
                )}
            </select>
        </div>

        {/* Batches Fields */}

        <div className="mb-3">
          <select className='form-select' name="batch1" value={jobData.batch1} onChange={handleChange}>
                <option value="">Select Job Batch One</option>
                {category && category.length > 0 ? (  // Check if category is defined and not empty
                    category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Job Batches...</option>
                )}
            </select>
        </div>
        <div className="mb-3">
          <select className='form-select' name="batch2" value={jobData.batch2} onChange={handleChange}>
                <option value="">Select Job Batch Two</option>
                {category && category.length > 0 ? (  // Check if category is defined and not empty
                    category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Job Batches...</option>
                )}
            </select>
        </div>
        <div className="mb-3">
          <select className='form-select' name="batch3" value={jobData.batch3} onChange={handleChange}>
                <option value="">Select Job Batche Three</option>
                {category && category.length > 0 ? (  // Check if category is defined and not empty
                    category.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Job Batches...</option>
                )}
            </select>
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
          <label htmlFor="jobDescriptions" className="form-label">Job Link</label>
          <input type="text" className="form-control" id="joblink" name="joblink" value={jobData.joblink} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="companyLogo" className="form-label"></label>
          <input type="file" className="form-control" id="companyLogo" name="companyLogo" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary btnsub">Submit</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>} {/* Conditional message display */}
    </div>
  );
};

export default EditJobData;
