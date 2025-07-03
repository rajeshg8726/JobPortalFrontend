import React, { useEffect } from 'react';
import './SecondStyleSheet.css';
import { Link } from 'react-router-dom';

const Updates = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="modern-updates-container">
      <div className="modern-updates-card">
        <h1 className="modern-updates-title">Website Updates & Enhancements</h1>
        <p className="modern-updates-date">
          <em>Last Updated: June 15, 2025</em>
        </p>
        <p className="modern-updates-lead">
          Welcome to our Updates page! Here, you'll find the latest news, improvements, and new features we've implemented to enhance your experience on <span className="modern-updates-highlight">RGJobs</span>. We're continuously working to provide you with the best and most genuine job updates, along with a smooth and efficient platform.
        </p>

        <ul className="modern-updates-list">
          {/* Most Recent Update */}
          <li className="modern-updates-list-item">
            <h2 className="modern-updates-list-title">June 15, 2025 – Enhanced Privacy Policy & Terms of Service</h2>
            <p>
              We’ve thoroughly reviewed and updated our <strong>Privacy Policy</strong> and <strong>Terms and Conditions</strong> pages. These revisions aim to provide greater clarity, transparency, and ensure compliance with the latest data protection regulations and advertising policies (including those for Google AdSense). We encourage all users to review these updated documents to understand how your data is handled and the terms governing your use of our platform.
            </p>
            <div className="modern-updates-links">
              <Link to="/privacy-policy" className="modern-updates-link">Read our updated Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="modern-updates-link">Read our updated Terms and Conditions</Link>
            </div>
          </li>

          {/* Previous Update */}
          <li className="modern-updates-list-item">
            <h2 className="modern-updates-list-title">May 20, 2025 – Improved Job Search Filters</h2>
            <p>
              We’ve rolled out significant improvements to our job search filters! You can now refine your job searches with more precision, including new options for experience level, specific technologies (e.g., React, Laravel, Python), and remote work availability. This update helps you find the most relevant opportunities faster.
            </p>
          </li>

          {/* Initial Launch/Core Features */}
          <li className="modern-updates-list-item">
            <h2 className="modern-updates-list-title">April 10, 2025 – Initial Platform Launch & Core Features</h2>
            <p>
              Welcome to the first version of <span className="modern-updates-highlight">RGJobs</span>! We are excited to launch our platform dedicated to providing genuine and timely job updates, primarily focusing on the technical domain. Key features at launch include:
            </p>
            <ul className="modern-updates-feature-list">
              <li>Daily curated job listings from various companies.</li>
              <li>Easy navigation to find relevant job categories.</li>
              <li>Commitment to providing accurate and verified job information.</li>
            </ul>
          </li>
        </ul>

        <p className="modern-updates-footer">
          Stay tuned for more exciting updates and features designed to help you succeed in your job search!
        </p>
      </div>
    </div>
  );
};

export default Updates;
