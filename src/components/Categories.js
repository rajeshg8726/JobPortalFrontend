import React, { useState, useEffect } from 'react';
import './Stylesheet.css'; 
import axios from 'axios';

const Categories = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
    });

    const backendURL = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevents page refresh on form submission

        try {
            const sentCat = await axios.post(`${backendURL}/api/insertCategory`, formData, {
                headers: {
                    'Content-Type': 'application/json'  // Set to JSON for text data
                }
            });

            console.log(sentCat.data);
            setMessage('Category Added Successfully!');
        } catch (error) {
            console.error('Error encountered:', error);
        }
    }

    return (
        <div className="categories container">
            {/* Display message */}
            {message && <div className="alert alert-info mt-3">{message}</div>}

            <form onSubmit={handleSubmit}>
                {/* Category Name input */}
                <div data-mdb-input-init className="form-outline my-4">
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
                {/* Submit button */}
                <button type="submit" className="btn btn-primary btn-block mb-4 btnsub">ADD</button>
            </form>
        </div>
    );
}

export default Categories;
