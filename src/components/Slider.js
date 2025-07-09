import React, { useState } from 'react';
import './searchBar.css';
import axios from 'axios';

const Slider = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");

  const backnedURL = process.env.REACT_APP_API_URL;

  const handleSearch = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent carousel from sliding
    props.setLoading(true);
    try {
      const response = await axios.get(
        `${backnedURL}/api/jobs-search`,
        {
          params: { searchTerm, location, role },
        }
      );
      props.setSearchedJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    props.setLoading(false);
  };

  return (
    <div className="slider-modern-container">
      <div id="carouselExampleIndicators" className="carousel slide modern-carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <div
              className="carousel-bg-modern"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(0,123,255,0.18) 0%, rgba(255,255,255,0.7) 100%), url(${process.env.PUBLIC_URL}/images/t1.webp)`,
              }}
            >
              <div className="slider-content-center">
                <h1 className="slider-title">Find Your Dream Job</h1>
                <p className="slider-subtitle">Search jobs by role, location, or skills</p>
                <form className="modern-search-bar" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Job Role (e.g. Developer)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Bengaluru)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Title, Skills, Company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit">Search</button>
                </form>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="10000">
            <div
              className="carousel-bg-modern"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(0,123,255,0.18) 0%, rgba(255,255,255,0.7) 100%), url(${process.env.PUBLIC_URL}/images/t2.webp)`,
              }}
            >
              <div className="slider-content-center">
                <h1 className="slider-title">Explore Top Companies</h1>
                <p className="slider-subtitle">Apply to the latest openings and internships</p>
                <form className="modern-search-bar" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Job Role (e.g. Analyst)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Remote)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Title, Skills, Company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit">Search</button>
                </form>
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