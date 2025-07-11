import React from 'react';
import './ResultNotFound.css';

const ResultNotFound = () => {
  return (
    <div className="modern-resultnotfound-container">
      <div className="modern-resultnotfound-card">
        <svg
          className="modern-resultnotfound-icon"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="32" fill="#f1f7ff" />
          <path
            d="M24 28C24 25.7909 25.7909 24 28 24H36C38.2091 24 40 25.7909 40 28V36C40 38.2091 38.2091 40 36 40H28C25.7909 40 24 38.2091 24 36V28Z"
            stroke="#007bff"
            strokeWidth="2"
            fill="#fff"
          />
          <path
            d="M28 32H36"
            stroke="#007bff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="modern-resultnotfound-title">No Results Found</h1>
        <p className="modern-resultnotfound-message">
          We couldn't find any results matching your search criteria.
        </p>
        <p className="modern-resultnotfound-suggestion">
          Please try adjusting your search terms or check back later.
        </p>
      </div>
    </div>
  );
};

export default ResultNotFound;