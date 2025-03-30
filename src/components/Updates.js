import React from 'react'
import './Stylesheet.css';
import { useEffect } from 'react';

const Updates = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Runs only once when the component is mounted
  
  return (
    <div className="page-container">
      <h1>Updates</h1>
      <ul className="updates-list">
        <li>Update 1: This is the first version of our webApps...</li>
        <li>Update 2: Find about the latest job updates...</li>
        <li>Update 3: We are here to give the genuine job updates...</li>
      </ul>
    </div>
  )
}

export default Updates