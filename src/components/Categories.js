import React, { useState } from 'react';
import './adminSide.css'; // Assuming you have a CSS file for styling
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Categories = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
  });

  const backendURL = process.env.REACT_APP_API_URL;
  const { categoryType } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let endpoint = '';
      switch (categoryType) {
        case 'add-category':
          endpoint = 'insertCategory';
          break;
        case 'add-company-category':
          endpoint = 'insertCompanyCat';
          break;
        case 'add-role-category':
          endpoint = 'insertRoleCat';
          break;
        case 'add-work-category':
          endpoint = 'insertWorkCat';
          break;
        default:
          console.log("Invalid route");
      }
      if (endpoint) {
        await axios.post(`${backendURL}/api/${endpoint}`, formData, {
          headers: { 'Content-Type': 'application/json' }
        });
        setMessage('Category Added Successfully!');
        setFormData({ name: '' });
      }
    } catch (error) {
      setMessage('Failed to add category. Please try again.');
    }
  };

  // Dynamic title based on route
  const getTitle = () => {
    switch (categoryType) {
      case 'add-category': return 'Add Job Category';
      case 'add-company-category': return 'Add Company Category';
      case 'add-role-category': return 'Add Role Category';
      case 'add-work-category': return 'Add Work Category';
      default: return 'Add Category';
    }
  };

  return (
    <div className="modern-category-container">
      <form className="modern-category-form" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="modern-category-title">{getTitle()}</h1>
        {message && (
          <div className={`modern-category-message ${message.includes('Successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        <div className="modern-category-field">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter category name"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="modern-category-btn">Add</button>
      </form>
    </div>
  );
};

export default Categories;
