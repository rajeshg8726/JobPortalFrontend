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
      <footer className="modern-footer border-top py-5">
        <div className="container">
          <div className="row gy-4">
            {/* Brand & Social */}
            <div className="col-12 col-md-4">
              <span className="footer-brand">RGJobs</span>
              <p className="footer-desc">
                We provide the latest updates on your <br />
                dream job opportunities so you don't <br />
                miss any chance to achieve your goals.
              </p>
              <div className="footer-social">
                <Link
                  className="footer-social-btn"
                  to="https://www.facebook.com/profile.php?id=61566032126186"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faMeta} />
                </Link>
                <Link
                  className="footer-social-btn"
                  to="https://x.com/rgjobs_updates"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </Link>
                <Link
                  className="footer-social-btn"
                  to="https://www.youtube.com/@RajeshGupta-e5d/videos"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
                <Link
                  className="footer-social-btn"
                  to="https://www.instagram.com/rgjobs_updates/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link
                  className="footer-social-btn"
                  to="https://www.linkedin.com/company/rgjobs/?viewAsMember=true"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </div>
            </div>
            {/* Company */}
            <div className="col-6 col-md-2">
              <h5 className="footer-head">Company</h5>
              <ul className="footer-list">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/updates">Updates</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
              </ul>
            </div>
            {/* Location */}
            <div className="col-6 col-md-3">
              <h5 className="footer-head">Location</h5>
              <ul className="footer-list">
                <li><Link to="/jobs/Remote">Remote</Link></li>
                <li><Link to="/jobs/Bengaluru">Bengaluru</Link></li>
                <li><Link to="/jobs/Hyderabad">Hyderabad</Link></li>
                <li><Link to="/jobs/Gurgoan">Gurgaon</Link></li>
                <li><Link to="/jobs/Chennai">Chennai</Link></li>
              </ul>
            </div>
            {/* Roles */}
            <div className="col-12 col-md-3">
              <h5 className="footer-head">Roles</h5>
              <ul className="footer-list">
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
      <div className="footer-copyright text-center p-3">
        © 2025 <span className="footer-brand">RGJobs</span> | All rights reserved
      </div>
    </>
  );
}

export default Footer;