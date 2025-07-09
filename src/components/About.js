import React, { useEffect } from 'react';
import './SecondStyleSheet.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="modern-about-container">
      <div className="modern-about-card">
        <h1 className="modern-about-title">
          About <span className="modern-about-highlight">RGJobs</span>
        </h1>
        <p className="modern-about-lead">
          Your Gateway to the Latest Tech Jobs
        </p>
        <p>
          Welcome to <span className="modern-about-highlight">RGJobs</span>, your dedicated platform for the most up-to-date and genuine job opportunities in the dynamic world of technology.
          We understand the challenges of finding relevant and reliable job information, and our mission is to simplify this process for you.
        </p>
        <p>
          At <span className="modern-about-highlight">RGJobs</span>, we are committed to providing job seekers with accurate and timely updates across various technical domains.
          Whether you're a seasoned professional or just starting your career, our goal is to connect you with the best opportunities that match your skills and aspirations.
        </p>
        <div className="modern-about-list-section">
          <h2 className="modern-about-subtitle">Our Focus Areas</h2>
          <ul className="modern-about-list">
            <li>Software Development (Front-end, Back-end, Full-stack)</li>
            <li>DevOps and Cloud Engineering</li>
            <li>Data Science and Analytics</li>
            <li>Cybersecurity</li>
            <li>AI/Machine Learning</li>
            <li>Quality Assurance</li>
            <li>IT Support and Administration</li>
            <li>And many more emerging tech roles.</li>
          </ul>
        </div>
        <p>
          We diligently curate job listings from reputable sources, ensuring that you receive only legitimate and current information.
          Our team is passionate about empowering the tech community by facilitating access to quality employment.
        </p>
        <div className="modern-about-values">
          <div>
            <span className="modern-about-value-title">Transparency</span>
            <span className="modern-about-value-desc">Clear, honest, and up-to-date job info.</span>
          </div>
          <div>
            <span className="modern-about-value-title">Accuracy</span>
            <span className="modern-about-value-desc">Verified and genuine job postings.</span>
          </div>
          <div>
            <span className="modern-about-value-title">User Experience</span>
            <span className="modern-about-value-desc">Easy navigation and a friendly interface.</span>
          </div>
        </div>
        <p>
          Thank you for choosing <span className="modern-about-highlight">RGJobs</span> as your trusted partner in your job search journey.
        </p>
        <p>
          For any inquiries or feedback, please visit our{' '}
          <Link to="/contact" className="modern-about-link">Contact Us</Link> page.
        </p>
      </div>
    </div>
  );
};

export default About;