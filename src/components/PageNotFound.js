import React from 'react';
import { Link } from 'react-router-dom';
import './SecondStyleSheet.css';

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-heading">Page Not Found</h2>
      <p className="notfound-message">
        Sorry, the job you are looking for has expired or does not exist.
      </p>
      <Link to="/" className="notfound-link">
        <button className="notfound-btn">
          Back to Explore Jobs
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;