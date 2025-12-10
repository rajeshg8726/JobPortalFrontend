import React, { useEffect } from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const focusAreas = [
    'Software Development (Front-end, Back-end, Full-stack)',
    'DevOps and Cloud Engineering',
    'Data Science and Analytics',
    'Cybersecurity',
    'AI/Machine Learning',
    'Quality Assurance',
    'IT Support and Administration',
    'And many more emerging tech roles.'
  ];

  const values = [
    {
      title: 'Transparency',
      description: 'Clear, honest, and up-to-date job info.',
      icon: 'eye'
    },
    {
      title: 'Accuracy',
      description: 'Verified and genuine job postings.',
      icon: 'check'
    },
    {
      title: 'User Experience',
      description: 'Easy navigation and a friendly interface.',
      icon: 'smile'
    }
  ];

  return (
    <div className="about-page-wrapper">
      {/* Decorative Background Elements */}
      <div className="about-bg-blur about-bg-blur-1"></div>
      <div className="about-bg-blur about-bg-blur-2"></div>

      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-hero-badge">About Our Platform</div>
          <h1 className="about-hero-title">
            About <span className="about-highlight">RGJobs</span>
          </h1>
          <p className="about-hero-subtitle">
            Your Gateway to the Latest Tech Jobs
          </p>
          <div className="about-hero-line"></div>
        </div>

        {/* Main Content */}
        <div className="about-content">
          {/* Introduction Section */}
          <section className="about-section">
            <div className="about-section-content">
              <p className="about-text-lead">
                Welcome to <span className="about-highlight">RGJobs</span>, your dedicated platform for the most up-to-date and genuine job opportunities in the dynamic world of technology.
                We understand the challenges of finding relevant and reliable job information, and our mission is to simplify this process for you.
              </p>
              <p className="about-text">
                At <span className="about-highlight">RGJobs</span>, we are committed to providing job seekers with accurate and timely updates across various technical domains.
                Whether you're a seasoned professional or just starting your career, our goal is to connect you with the best opportunities that match your skills and aspirations.
              </p>
            </div>
          </section>

          {/* Focus Areas Section */}
          <section className="about-section">
            <h2 className="about-section-title">Our Focus Areas</h2>
            <div className="about-focus-grid">
              {focusAreas.map((area, index) => (
                <div key={index} className="about-focus-item">
                  <div className="about-focus-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="about-focus-text">{area}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Curation Section */}
          <section className="about-section about-section-highlight">
            <p className="about-text-centered">
              We diligently curate job listings from reputable sources, ensuring that you receive only legitimate and current information.
              Our team is passionate about empowering the tech community by facilitating access to quality employment.
            </p>
          </section>

          {/* Values Section */}
          <section className="about-section">
            <h2 className="about-section-title">Our Core Values</h2>
            <div className="about-values-grid">
              {values.map((value, index) => (
                <div key={index} className="about-value-card">
                  <div className="about-value-icon">
                    {value.icon === 'eye' && (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                    {value.icon === 'check' && (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    )}
                    {value.icon === 'smile' && (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                    )}
                  </div>
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing Section */}
          <section className="about-section about-section-closing">
            <p className="about-text-centered">
              Thank you for choosing <span className="about-highlight">RGJobs</span> as your trusted partner in your job search journey.
            </p>
            <p className="about-text-centered">
              For any inquiries or feedback, please visit our{' '}
              <Link to="/contact" className="about-cta-link">
                Contact Us page
              </Link>
            </p>
          </section>
        </div>

        {/* CTA Section */}
        <div className="about-cta-section">
          <h2 className="about-cta-title">Ready to Find Your Dream Job?</h2>
          <p className="about-cta-description">
            Start exploring thousands of verified tech job opportunities tailored just for you.
          </p>
          <Link to="/" className="about-cta-button">
            <span>Explore Jobs</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;