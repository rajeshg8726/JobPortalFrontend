import React, { useState } from 'react';
import './searchBar.css';

const Slider = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, location, role });
  };

  return (
    <div className='container' style={{ marginTop: '1rem', position: 'relative' }}>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="100000000">
            <div className="carousel-bg" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/t1.webp)", height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                <div className="search-bar">
                  <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search by job role" value={role} onChange={(e) => setRole(e.target.value)} />
                    <input type="text" placeholder="Search by location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input type="text" placeholder="Search by keyword" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button type="submit">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="100000000">
            <div className="carousel-bg" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/t2.webp)", height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                <div className="search-bar">
                  <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search by job role" value={role} onChange={(e) => setRole(e.target.value)} />
                    <input type="text" placeholder="Search by location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input type="text" placeholder="Search by keyword" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
