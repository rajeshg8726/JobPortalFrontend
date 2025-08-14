import React from 'react';
import { Link } from 'react-router-dom';
import './SecondStyleSheet.css'; // Ensure this file has the updated styles below

const PageNotFound = () => {
  return (
    <div className="modern-notfound-container">
      <div className="modern-notfound-card">
        <h1 className="modern-notfound-title">404</h1>
        <h2 className="modern-notfound-subtitle">Page Not Found</h2>
        <p className="modern-notfound-message">
          Sorry, the job you are looking for has expired or doesn’t exist.
        </p>
        <Link to="/" className="modern-notfound-link">
          <button className="modern-notfound-btn">← Back to Explore Jobs</button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
