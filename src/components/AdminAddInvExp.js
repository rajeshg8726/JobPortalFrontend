import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const AdminAddInvExp = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    title:'',
    companyName: '',
    rounds: '',
    experience: '',
    jobRole: '',
    details: '',
    companyOption: '',
    roleOption: '',
    workOption: '',
    anonymous: false,
  });

  const backendURL = process.env.REACT_APP_API_URL;
  const [message, setMessage] = useState(''); // State for the submission message
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const [companyCat, setCompanyCat] = useState([]);
    const [roleCat, setroleCat] = useState([]);
    const [workCat, setworkCat] = useState([]);


    // Fetch different categories
    useEffect(() => {
        const getCompanyCat = async () => {
            try {
                const cat = await axios.get(`${backendURL}/api/getCompanyCat`);
                const res = cat.data.roleData;
                setCompanyCat(res);
            } catch (error) {
                console.error("Error fetching interview data:", error);
                
            }
        }
        getCompanyCat();

    },[backendURL]);

    useEffect(() => {
        const getCompanyCat = async () => {
            try {
                const cat = await axios.get(`${backendURL}/api/getRolesCat`);
                const res = cat.data.roleData;
                setroleCat(res);
            } catch (error) {
                console.error("Error fetching interview data:", error);
                
            }
        }
        getCompanyCat();

    },[backendURL]);
    useEffect(() => {
        const getCompanyCat = async () => {
            try {
                const cat = await axios.get(`${backendURL}/api/getWorkCat`);
                const res = cat.data.roleData;
                setworkCat(res);
            } catch (error) {
                console.error("Error fetching interview data:", error);
                
            }
        }
        getCompanyCat();

    },[backendURL]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Fetch the existing job details when the component loads

useEffect(() => {
    const fetchInvDetails = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/interviewById/${id}`);
        setFormData(response.data.InvData); // Pre-fill form with job details
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchInvDetails();
}, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/updateAndSaveInvExps`, formData);
      console.log('Data submitted successfully:', response.data);
      setMessage('Your interview experience has been successfully submitted! It is now pending review by the admin.')
      setIsModalOpen(true);
      setTimeout(() => {
        navigate('/admin/interviews/admin-added-interviews-list');
      }, 5000); // Navigate after 5 seconds
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <div className='container mt-4 my-4 mx-4'>
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
        
        <div className="col-md-6">
          <label className="form-label">Select Company</label>
           <select className='form-select' name="companyOption" value={formData.companyOption} onChange={handleChange}>
                
                { companyCat && companyCat.length > 0 ? (  // Check if category is defined and not empty
                    companyCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Companies...</option>
                )}
            </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Select Roles</label>
           <select className='form-select' name="roleOption" value={formData.roleOption} onChange={handleChange}>
                
                { roleCat && roleCat.length > 0 ? (  // Check if category is defined and not empty
                    roleCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Roles...</option>
                )}
            </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Select Work</label>
           <select className='form-select' name="workOption" value={formData.workOption} onChange={handleChange}>
                
                { workCat && workCat.length > 0 ? (  // Check if category is defined and not empty
                    workCat.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading Work Type...</option>
                )}
            </select>
        </div>

        <div className="col-md-12">
          <label className="form-label">Job Experience Title</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
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

export default AdminAddInvExp;
