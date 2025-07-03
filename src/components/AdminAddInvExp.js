import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './adminSide.css'; // Assuming you have a CSS file for styling

const AdminAddInvExp = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    title: '',
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
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyCat, setCompanyCat] = useState([]);
  const [roleCat, setRoleCat] = useState([]);
  const [workCat, setWorkCat] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const [company, role, work] = await Promise.all([
          axios.get(`${backendURL}/api/getCompanyCat`),
          axios.get(`${backendURL}/api/getRolesCat`),
          axios.get(`${backendURL}/api/getWorkCat`)
        ]);
        setCompanyCat(company.data.roleData);
        setRoleCat(role.data.roleData);
        setWorkCat(work.data.roleData);
      } catch (error) {
        // Optionally show error
      }
    };
    fetchCats();
  }, [backendURL]);

  // Fetch the existing job details when the component loads
  useEffect(() => {
    const fetchInvDetails = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/interviewById/${id}`);
        setFormData(response.data.InvData);
      } catch (error) {
        // Optionally show error
      }
    };
    fetchInvDetails();
  }, [id, backendURL]);

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
      await axios.post(`${backendURL}/api/updateAndSaveInvExps`, formData);
      setMessage('Your interview experience has been successfully submitted! It is now pending review by the admin.');
      setIsModalOpen(true);
      setTimeout(() => {
        navigate('/admin/interviews/admin-added-interviews-list');
      }, 2500);
    } catch (error) {
      setMessage('There was an error submitting your experience. Please try again.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="modern-invform-container">
      <div className="modern-invform-card">
        <h1 className="modern-invform-title">Edit Interview Experience</h1>
        <p className="modern-invform-lead">
          Update the interview experience details below.
        </p>
        {isModalOpen && (
          <div className="modern-invform-modal">
            <div className="modern-invform-modal-content">
              <strong style={{ color: message.startsWith('Your') ? '#16a34a' : '#d41f30' }}>
                {message.startsWith('Your') ? 'Congratulations!' : 'Oops!'}
              </strong>
              <span> {message} </span>
            </div>
          </div>
        )}
        <form className="modern-invform-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="modern-invform-row">
            <div className="modern-invform-field">
              <label>Email</label>
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required autoComplete="off" />
            </div>
            <div className="modern-invform-field">
              <label>Name</label>
              <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required autoComplete="off" />
            </div>
          </div>
          <div className="modern-invform-row">
            <div className="modern-invform-field">
              <label>Company Name</label>
              <input type="text" name="companyName" value={formData.companyName || ''} onChange={handleChange} required autoComplete="off" />
            </div>
            <div className="modern-invform-field">
              <label>Number Of Rounds</label>
              <input type="number" name="rounds" value={formData.rounds || ''} onChange={handleChange} min="1" required />
            </div>
          </div>
          <div className="modern-invform-row">
            <div className="modern-invform-field">
              <label>Freshers/Experienced</label>
              <input type="text" name="experience" value={formData.experience || ''} onChange={handleChange} required autoComplete="off" placeholder="e.g. Fresher, 2 Years" />
            </div>
            <div className="modern-invform-field">
              <label>Job Role</label>
              <input type="text" name="jobRole" value={formData.jobRole || ''} onChange={handleChange} required autoComplete="off" />
            </div>
          </div>
          <div className="modern-invform-row">
            <div className="modern-invform-field">
              <label>Select Company</label>
              <select name="companyOption" value={formData.companyOption || ''} onChange={handleChange} required>
                <option value="">Select Company</option>
                {companyCat && companyCat.length > 0
                  ? companyCat.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  : <option disabled>Loading Companies...</option>
                }
              </select>
            </div>
            <div className="modern-invform-field">
              <label>Select Roles</label>
              <select name="roleOption" value={formData.roleOption || ''} onChange={handleChange} required>
                <option value="">Select Role</option>
                {roleCat && roleCat.length > 0
                  ? roleCat.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  : <option disabled>Loading Roles...</option>
                }
              </select>
            </div>
          </div>
          <div className="modern-invform-field">
            <label>Select Work</label>
            <select name="workOption" value={formData.workOption || ''} onChange={handleChange} required>
              <option value="">Select Work Type</option>
              {workCat && workCat.length > 0
                ? workCat.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                : <option disabled>Loading Work Type...</option>
              }
            </select>
          </div>
          <div className="modern-invform-field">
            <label>Job Experience Title</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required autoComplete="off" />
          </div>
          <div className="modern-invform-field">
            <label>Share In Detail</label>
            <textarea name="details" value={formData.details || ''} onChange={handleChange} required placeholder="Explain your experience in detail..." rows={5} />
          </div>
          <div className="modern-invform-checkbox">
            <input type="checkbox" name="anonymous" checked={formData.anonymous || false} onChange={handleChange} id="anonymous" />
            <label htmlFor="anonymous">Post As Anonymous</label>
          </div>
          <button type="submit" className="modern-invform-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddInvExp;
