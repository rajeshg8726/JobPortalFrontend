import React from 'react'
import './Stylesheet.css';
import { useEffect } from 'react';

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Runs only once when the component is mounted

  return (

<div className="page-container">
      <h1>About Us</h1>
     <strong> <p> We are committed to humanity to providing the best job updates for you.</p></strong>
      <p>Our mission is to give you genuine information about the latest jobs in the technical domain.</p>
    </div>  
    
  )
}

export default About