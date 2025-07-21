import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faMeta,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand-section">
              <span className="footer-logo">RGJobs</span>
              <p className="footer-desc">
                Stay updated with the latest job opportunities.<br />
                Your career, your future — we make it easier.
              </p>
              <div className="footer-social">
                <Link to="https://www.facebook.com/profile.php?id=61566032126186" target="_blank" aria-label="Facebook">
                  <FontAwesomeIcon icon={faMeta} />
                </Link>
                <Link to="https://x.com/rgjobs_updates" target="_blank" aria-label="Twitter">
                  <FontAwesomeIcon icon={faXTwitter} />
                </Link>
                <Link to="https://www.youtube.com/@RajeshGupta-e5d/videos" target="_blank" aria-label="YouTube">
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
                <Link to="https://www.instagram.com/rgjobs_updates/" target="_blank" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="https://www.linkedin.com/company/rgjobs/?viewAsMember=true" target="_blank" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </div>
            </div>

            {/* Company Links */}
            <div className="footer-column">
              <h5>Company</h5>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/updates">Updates</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/disclaimer">Disclaimer</Link></li>
                <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Location Links */}
            <div className="footer-column">
              <h5>Location</h5>
              <ul>
                <li><Link to="/jobs/Remote">Remote</Link></li>
                <li><Link to="/jobs/Bengaluru">Bengaluru</Link></li>
                <li><Link to="/jobs/Hyderabad">Hyderabad</Link></li>
                <li><Link to="/jobs/Gurgaon">Gurgaon</Link></li>
                <li><Link to="/jobs/Chennai">Chennai</Link></li>
              </ul>
            </div>

            {/* Role Links */}
            <div className="footer-column">
              <h5>Roles</h5>
              <ul>
                <li><Link to="/jobsbyrole/software-developer-jobs">Backend Developer</Link></li>
                <li><Link to="/jobsbyrole/software-engineer-jobs">Frontend Developer</Link></li>
                <li><Link to="/jobsbyrole/analytics-and-data-science-jobs">Analytics & Data Science</Link></li>
                <li><Link to="/jobsbyrole/software-testing-jobs">Testing</Link></li>
                <li><Link to="/jobsbyrole/technical-support-jobs">Technical Support</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        © 2025 <span>RGJobs</span> | All rights reserved
      </div>
    </>
  );
}

export default Footer;
