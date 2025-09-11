import React, { useState, useEffect } from "react";
import "./jobCard.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faWallet,
  faBriefcase,
  faCalendar,
  faShareAlt,
  faClock,
  faBuilding,
  faStar,
  faSparkles,
  faExternalLinkAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import slugify from "react-slugify";

const PER_PAGE = 6; // Optimized for better layout

function Jobcard(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [jobStats, setJobStats] = useState({
    total: 0,
    newToday: 0,
    companies: 0,
    remote: 0
  });

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  let offset = currentPage * PER_PAGE;
  let currentPageJob = props.allJobs.slice(offset, offset + PER_PAGE);
  let pageCount = Math.ceil(props.allJobs.length / PER_PAGE);
  let jobsToDisplay = props.allJobs;

  // Handle search results
  if (props.searchedJobs && props.searchedJobs.length > 0) {
    offset = currentPage * PER_PAGE;
    currentPageJob = props.searchedJobs.slice(offset, offset + PER_PAGE);
    pageCount = Math.ceil(props.searchedJobs.length / PER_PAGE);
    jobsToDisplay = props.searchedJobs;
  }

  // Calculate job statistics
  useEffect(() => {
    if (jobsToDisplay && jobsToDisplay.length > 0) {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      
      const newToday = jobsToDisplay.filter(job => {
        const jobDate = new Date(job.created_at).toISOString().split('T')[0];
        return jobDate === todayString;
      }).length;

      const uniqueCompanies = [...new Set(jobsToDisplay.map(job => job.title))].length;
      
      const remoteJobs = jobsToDisplay.filter(job => 
        job.location && (
          job.location.toLowerCase().includes('remote') ||
          job.location.toLowerCase().includes('work from home') ||
          job.location.toLowerCase().includes('wfh')
        )
      ).length;

      setJobStats({
        total: jobsToDisplay.length,
        newToday,
        companies: uniqueCompanies,
        remote: remoteJobs
      });
    }
  }, [jobsToDisplay]);

  const handleShare = (post) => {
    const jobTitle = post.title || "Job Opportunity";
    const jobLocation = post.location || "Unknown Location";
    const jobPay = post.pay || "Salary not disclosed";
    const jobURL = `${window.location.origin}/job/${post.id}/${slugify(
      jobTitle
    )}`;

    if (navigator.share) {
      navigator
        .share({
          title: `Job Opportunity at ${jobTitle}`,
          text: `Check out this job: ${post.role} at ${jobTitle}, ${jobLocation}. Expected Pay: ${jobPay}.`,
          url: jobURL,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(jobURL).then(() => {
        showNotification("Job link copied to clipboard!");
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = jobURL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification("Job link copied to clipboard!");
      });
    }
  };

  // Enhanced notification system
  const showNotification = (message, type = 'success') => {
    const existingNotification = document.querySelector('.premium-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const colors = {
      success: 'rgba(16, 185, 129, 0.95)',
      error: 'rgba(239, 68, 68, 0.95)',
      info: 'rgba(59, 130, 246, 0.95)'
    };

    const notification = document.createElement('div');
    notification.className = 'premium-notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 14px 28px;
        border-radius: 14px;
        font-weight: 600;
        font-size: 0.95rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(20px);
        z-index: 9999;
        animation: slideInNotification 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      ">
        ${message}
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideInNotification {
          from {
            transform: translateX(100%) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideOutNotification {
          from {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%) translateY(-20px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove after 4 seconds with animation
    setTimeout(() => {
      if (notification.parentNode) {
        notification.firstChild.style.animation = 'slideOutNotification 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 400);
      }
    }, 4000);
  };

  // Enhanced date formatting with more granular time differences
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  // Enhanced job classification
  const isFeatured = (post) => {
    return post.featured || post.is_featured || post.premium || false;
  };

  const isUrgentHiring = (post) => {
    return post.urgent_hiring || post.is_urgent || post.urgent || 
           (post.created_at && isWithinDays(post.created_at, 2));
  };

  const isWithinDays = (dateString, days) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  };

  // Format salary for better display
  const formatSalary = (salary) => {
    if (!salary) return "Not disclosed";
    return salary.replace(/(-|to|TO)/g, "–").trim();
  };

  // Remove the problematic scroll to top on page change
  useEffect(() => {
    // Only scroll when pagination changes, not on hover
    if (currentPage > 0) {
      const jobsSection = document.querySelector('.premium-jobcard-container');
      if (jobsSection) {
        jobsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [currentPage]); // Only depend on currentPage, not currentPageJob

  // Loading state with enhanced UI
  if (props.loading) {
    return (
      <div className="premium-jobcard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // No jobs available state
  if (!props.allJobs || props.allJobs.length === 0) {
    return (
      <div className="premium-jobcard-container">
        <div className="result-not-found-container">
          <div className="not-found-icon">
            <FontAwesomeIcon icon={faBriefcase} size="2x" />
          </div>
          <h3 className="not-found-title">No Jobs Available</h3>
          <p className="not-found-subtitle">Check back later for new opportunities</p>
        </div>
      </div>
    );
  }

  // Search results empty state
  if (Array.isArray(props.searchedJobs) && props.searchedJobs.length === 0) {
    return (
      <div className="premium-jobcard-container">
        <div className="result-not-found-container">
          <div className="not-found-icon">
            <FontAwesomeIcon icon={faSearch} size="2x" />
          </div>
          <h3 className="not-found-title">No Results Found</h3>
          <p className="not-found-subtitle">Try adjusting your search criteria or explore all jobs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-jobcard-container">
      {/* Job Statistics Banner */}
      <div className="job-stats-banner">
        <div className="stat-item">
          <div className="stat-number">{jobStats.total.toLocaleString()}</div>
          <div className="stat-label">Total Jobs</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{jobStats.newToday}</div>
          <div className="stat-label">New Today</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{jobStats.companies}</div>
          <div className="stat-label">Companies</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{jobStats.remote}</div>
          <div className="stat-label">Remote Jobs</div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="premium-jobcard-grid">
        {currentPageJob.length === 0 && Array.isArray(props.searchedJobs) && props.searchedJobs.length === 0 ? (
          <div className="no-jobs-message">
            <FontAwesomeIcon icon={faBriefcase} size="2x" style={{marginBottom: '1rem', opacity: 0.5}} />
            <span>No jobs found for the current page.</span>
          </div>
        ) : (
          currentPageJob.map((post) => (
            <div 
              className={`premium-jobcard ${isFeatured(post) ? 'featured' : ''}`}
              key={post.id}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Badges Container */}
              <div className="premium-badge-container">
                {isFeatured(post) && (
                  <div className="featured-badge">
                    <FontAwesomeIcon icon={faStar} />
                    Featured
                  </div>
                )}
                {isUrgentHiring(post) && (
                  <div className="urgent-badge">
                    <FontAwesomeIcon icon={faClock} />
                    Urgent
                  </div>
                )}
              </div>

              {/* Card Header */}
              <div className="premium-jobcard-header">
                <div className="premium-jobcard-company-logo">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${post.image}`}
                    alt={`${post.title} logo`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/logo.webp'; // Fallback to default logo
                    }}
                  />
                </div>
                <div className="premium-jobcard-title-section">
                  <h2 className="premium-jobcard-role" title={post.role}>
                    {post.role}
                  </h2>
                  <span className="premium-jobcard-company" title={post.title}>
                    {post.title}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="premium-jobcard-details">
                <div className="premium-jobcard-tag">
                  <div className="tag-icon building">
                    <FontAwesomeIcon icon={faBuilding} />
                  </div>
                  <span className="tag-text" title={post.batches}>
                    {post.batches || "Not specified"}
                  </span>
                </div>
                <div className="premium-jobcard-tag">
                  <div className="tag-icon location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <span className="tag-text" title={post.location}>
                    {post.location || "Location TBD"}
                  </span>
                </div>
                <div className="premium-jobcard-tag">
                  <div className="tag-icon wallet">
                    <FontAwesomeIcon icon={faWallet} />
                  </div>
                  <span className="tag-text salary" title={post.pay}>
                    {formatSalary(post.pay)}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="premium-jobcard-footer">
                <div className="premium-jobcard-date" title={new Date(post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}>
                  <FontAwesomeIcon icon={faCalendar} />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="premium-jobcard-actions">
                  <Link
                    className="premium-jobcard-view-btn"
                    to={`/job/${post.id}/${slugify(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View details for ${post.role} at ${post.title}`}
                  >
                    <span>View Details</span>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </Link>
                  <button
                    type="button"
                    className="premium-jobcard-share-btn"
                    onClick={() => handleShare(post)}
                    aria-label={`Share ${post.role} job posting`}
                    title="Share this job"
                  >
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Enhanced Pagination */}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ←<span className="pagination-text">Previous</span>
            </span>
          }
          nextLabel={
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="pagination-text">Next</span>→
            </span>
          }
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"premium-pagination"}
          previousLinkClassName={"premium-pagination-link"}
          nextLinkClassName={"premium-pagination-link"}
          disabledClassName={"premium-pagination-link--disabled"}
          activeClassName={"premium-pagination-link--active"}
          pageLinkClassName={"premium-pagination-link"}
          breakLinkClassName={"premium-pagination-link"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          forcePage={currentPage}
          breakLabel="..."
        />
      )}
    </div>
  );
}

export default Jobcard;