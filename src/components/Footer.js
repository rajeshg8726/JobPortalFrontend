import React, { useState } from 'react';
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
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Send,
  Check
} from 'lucide-react';
import axios from 'axios';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const backendURL = process.env.REACT_APP_API_URL;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/subscribeNewsletter`, { email });
      setSubscribed(res.status === 200);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const companyLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Updates', path: '/updates' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  ];

  const locationLinks = [
    { label: 'Remote', path: '/jobs/Remote-Jobs' },
    { label: 'Bengaluru', path: '/jobs/Bengaluru-Jobs' },
    { label: 'Hyderabad', path: '/jobs/Hyderabad-Jobs' },
    { label: 'Gurgaon', path: '/jobs/Gurgaon-Jobs' },
    { label: 'Chennai', path: '/jobs/Chennai-Jobs' },
    { label: 'Pune', path: '/jobs/Pune-Jobs' },
    { label: 'Outside India', path: '/jobs/Outside-india-Jobs' },
  ];

  const industryLinks = [
    { label: 'Product-Based', path: '/jobs/product-based-jobs' },
    { label: 'Service-Based', path: '/jobs/service-based-jobs' },
    { label: 'Start-ups', path: '/jobs/startups-based-jobs' },
    { label: 'MNCs', path: '/jobs/mnc-based-jobs' },
    { label: 'Remote-first', path: '/jobs/remote-based-jobs' },
  ];

  const socialLinks = [
    { icon: faMeta, label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61566032126186' },
    { icon: faXTwitter, label: 'Twitter', url: 'https://x.com/rgjobs_updates' },
    { icon: faYoutube, label: 'YouTube', url: 'https://www.youtube.com/@RajeshGupta-e5d/videos' },
    { icon: faInstagram, label: 'Instagram', url: 'https://www.instagram.com/rgjobs_updates/' },
    { icon: faLinkedinIn, label: 'LinkedIn', url: 'https://www.linkedin.com/company/rgjobs/?viewAsMember=true' },
  ];

  const quickLinks = [
    { label: 'Browse Jobs', icon: ArrowRight },
    { label: 'For Employers', icon: ArrowRight },
    { label: 'Salary Guide', icon: ArrowRight },
    { label: 'Career Tips', icon: ArrowRight },
  ];

  return (
    <>
      <footer className="enhanced-footer">
        {/* Newsletter Section */}
        <div className="footer-newsletter-section">
          <div className="newsletter-content-footer">
            <div className="newsletter-text">
              <h2 className="newsletter-title">Stay Updated</h2>
              <p className="newsletter-subtitle">Get the latest job opportunities delivered to your inbox</p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="newsletter-input-group-footer">
                <Mail size={18} className="newsletter-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn" disabled={loading || subscribed}>
                  {subscribed ? (
                    <>
                      <Check size={18} />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand-section">
              <div className="footer-logo-wrapper">
                <span className="footer-logo">RGJobs</span>
                <span className="logo-tagline">Your Career Hub</span>
              </div>
              <p className="footer-desc">
                Stay updated with the latest job opportunities. Your career, your future — we make it easier.
              </p>

              {/* Contact Info */}
              <div className="footer-contact-info">
                <a href="mailto:rgjobsupdate@gmail.com" className="contact-link">
                  <Mail size={16} />
                  <span>rgjobsupdate@gmail.com</span>
                </a>
                <a href="tel:+918726141025" className="contact-link">
                  <Phone size={16} />
                  <span>+91 8726141025</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="footer-social">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="footer-column">
              <h5 className="footer-column-title">Company</h5>
              <ul className="footer-links">
                {companyLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="footer-link">
                      <span>{link.label}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Links */}
            <div className="footer-column">
              <h5 className="footer-column-title">
                <MapPin size={16} />
                Top Locations
              </h5>
              <ul className="footer-links">
                {locationLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="footer-link">
                      <span>{link.label}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industry Links */}
            <div className="footer-column">
              <h5 className="footer-column-title">Company Types</h5>
              <ul className="footer-links">
                {industryLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="footer-link">
                      <span>{link.label}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h5 className="footer-column-title">Quick Links</h5>
              <ul className="footer-links">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to="#" className="footer-link">
                      <span>{link.label}</span>
                      <link.icon size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="footer-stats" hidden>
            <div className="stat-box">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">500+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Users</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">100+</div>
              <div className="stat-label">Cities</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © 2026 <span className="brand-name">RGJobs</span> | All rights reserved
          </p>
          <p className="made-with">
            Made with <Heart size={14} fill="currentColor" /> for your career growth
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;