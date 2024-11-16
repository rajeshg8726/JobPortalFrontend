import React, { useState } from 'react';
import './Stylesheet.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Categories = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
    });

    const backendURL = process.env.REACT_APP_API_URL;
    const { categoryType } = useParams();  // Extract the route param

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

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
                const sentCat = await axios.post(`${backendURL}/api/${endpoint}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log(sentCat.data);
                setMessage('Category Added Successfully!');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage('Failed to add category. Please try again.');
        }
    }

    return (
        <div className="categories container">
            {message && <div className="alert alert-primary mt-3 mb-3">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline my-4 mx-4">
                    <label className="form-label text-center" htmlFor="name">Category Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="form-control" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4 btnsub">ADD</button>
            </form>
        </div>
    );
}

export default Categories;
