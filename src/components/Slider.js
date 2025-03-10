import React, { useState } from 'react';
import './searchBar.css';
import axios from 'axios';
import { redirect } from 'react-router-dom';
const Slider = ({ setJobs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");

  const backnedURL = process.env.REACT_APP_API_URL;
  // When the search form is submitted, call the API
  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      // Replace REACT_APP_API_URL with your backend base URL (e.g., http://yourdomain.com)
      const response = await axios.get(
        `${backnedURL}/api/jobs-search`,
        {
          params: { searchTerm, location, role },
        }
      );
      // Update the parent component's jobs state with the filtered results
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className='container' style={{ marginTop: '1rem', position: 'relative' }}>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <div className="carousel-bg" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/t1.webp)", height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                <div className="search-bar">
                  <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search by job role" value={role} onChange={(e) => setRole(e.target.value)} />
                    <input type="text" placeholder="Search by location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input type="text" placeholder="Search by title, skills" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button type="submit">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="10000">
            <div className="carousel-bg" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/t2.webp)", height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                <div className="search-bar">
                  <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search by job role" value={role} onChange={(e) => setRole(e.target.value)} />
                    <input type="text" placeholder="Search by location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input type="text" placeholder="Search by title,skills" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button type="submit">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
