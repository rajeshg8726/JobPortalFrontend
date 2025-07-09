import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="modern-loading-container">
      <div className="modern-spinner"></div>
      <div className="modern-loading-text">Loading, please wait...</div>
    </div>
  );
};

export default Loading;