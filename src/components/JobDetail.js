import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Users,
  Share2,
  Bookmark,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Building2,
  GraduationCap,
  FileText,
  Zap,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './JobDetailModern.css';
import PageNotFound from './PageNotFound';

const JobDetailPage = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      const savedJobs = JSON.parse(saved);
      setIsSaved(savedJobs.includes(parseInt(id)));
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendURL}/api/job/${id}`);
      setJob(response.data.job || response.data);
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = () => {
    const saved = localStorage.getItem('savedJobs');
    const savedJobs = saved ? JSON.parse(saved) : [];
    
    if (isSaved) {
      const updated = savedJobs.filter(jobId => jobId !== parseInt(id));
      localStorage.setItem('savedJobs', JSON.stringify(updated));
    } else {
      savedJobs.push(parseInt(id));
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
    
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: job?.role,
        text: `Check out this job: ${job?.role} at ${job?.title}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Job link copied to clipboard!');
    }
  };

  const handleApply = () => {
    if (job?.joblink) {
      window.open(job.joblink, '_blank');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const parseDescription = (text) => {
    if (!text) return '';
    return text.split('\r\n').filter(line => line.trim());
  };

  if (loading) {
    return (
      <div className="job-detail-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-detail-container">
        <div className="error-state">
          {/* <AlertCircle size={48} /> */}
      
          <PageNotFound />

        </div>
      </div>
    );
  }

  return (
    <div className="job-detail-container">
      <Helmet>
        <title>{`${job.role} at ${job.title} - Apply Now | RGJobs`}</title>
        <meta name="description" content={`Apply for ${job.role} at ${job.title}. Location: ${job.location || 'India'}. Salary: ${job.pay || 'Competitive'}. Batches: ${job.batches || 'All'}. Find the best career opportunities on RGJobs.`} />
        <link rel="canonical" href={`https://www.rgjobs.in/job/${id}/${slug}`} />
        <meta property="og:title" content={`${job.role} at ${job.title} | RGJobs`} />
        <meta property="og:description" content={`${job.role} at ${job.title}. ${job.location || 'India'}. ${job.pay || 'Competitive salary'}.`} />
        <meta property="og:url" content={`https://www.rgjobs.in/job/${id}/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${backendURL}/${job.image}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": job.role,
            "description": job.description || `${job.role} position at ${job.title}`,
            "datePosted": job.created_at,
            "hiringOrganization": {
              "@type": "Organization",
              "name": job.title,
              "logo": `${backendURL}/${job.image}`
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": job.location || "India",
                "addressCountry": "IN"
              }
            },
            "employmentType": job.jobtype === '1' ? "INTERN" : "FULL_TIME",
            "url": `https://www.rgjobs.in/job/${id}/${slug}`
          })}
        </script>
      </Helmet>

      {/* Breadcrumbs */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
          <li className="breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link to="/" itemProp="item"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="breadcrumb-separator" aria-hidden="true">/</li>
          <li className="breadcrumb-item active" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{job.role} at {job.title}</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="job-detail-header">
        <button onClick={() => navigate(
          '/'
        )} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="header-actions">
          <button
            className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
            onClick={handleSaveJob}
            title={isSaved ? 'Remove from saved' : 'Save job'}
          >
            <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button className="action-btn share-btn" onClick={handleShare}>
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="job-detail-content">
        {/* Left Column */}
        <div className="job-detail-main">
          {/* Company Header */}
          <div className="company-header">
            <div className="company-logo">
              <img
                src={`${backendURL}/${job.image}`}
                alt={job.title}
                onError={(e) => (e.target.src = '/logo.webp')}
              />
            </div>
            <div className="company-info">
              <h1 className="job-title">{job.role}</h1>
              <p className="company-name">{job.title}</p>
              <div className="job-meta-row">
                <span className="meta-item">
                  <MapPin size={16} />
                  {job.location || 'Location TBD'}
                </span>
                <span className="meta-item">
                  <Briefcase size={16} />
                  {job.jobtype === '1' ? 'Internship' : 'Full-Time'}
                </span>
                <span className="meta-item">
                  <Calendar size={16} />
                  {formatDate(job.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-box">
              <DollarSign size={20} />
              <div>
                <p className="stat-label">Expected Pay</p>
                <p className="stat-value1">{job.pay}</p>
              </div>
            </div>
            <div className="stat-box">
              <GraduationCap size={20} />
              <div>
                <p className="stat-label">Batches</p>
                <p className="stat-value1">{job.batches}</p>
              </div>
            </div>
            <div className="stat-box">
              <Clock size={20} />
              <div>
                <p className="stat-label">Posted</p>
                <p className="stat-value1">
                  {Math.floor((Date.now() - new Date(job.created_at)) / (1000 * 60 * 60 * 24))} days ago
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <section className="detail-section">
            <h2 className="section-title">
              <Zap size={20} />
              About the Opportunity
            </h2>
            <div className="section-content formatted-text">
              {parseDescription(job.description).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>

          {/* Roles & Responsibilities */}
          {job.rolesAndResponsibilities && (
            <section className="detail-section">
              <h2 className="section-title">
                <CheckCircle size={20} />
                Roles & Responsibilities
              </h2>
              <ul className="bullet-list">
                {parseDescription(job.rolesAndResponsibilities).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {job.requirements && (
            <section className="detail-section">
              <h2 className="section-title">
                <FileText size={20} />
                Requirements
              </h2>
              <ul className="bullet-list">
                {parseDescription(job.requirements).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Nice to Have */}
          {job.niceToHave && (
            <section className="detail-section">
              <h2 className="section-title">
                <Zap size={20} />
                Nice to Have
              </h2>
              <ul className="bullet-list light">
                {parseDescription(job.niceToHave).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Eligibility */}
          {job.eligibility && (
            <section className="detail-section">
              <h2 className="section-title">
                <Users size={20} />
                Eligibility
              </h2>
              <div className="section-content formatted-text">
                {parseDescription(job.eligibility).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="job-detail-sidebar">
          {/* Apply Card */}
          <div className="apply-card">
            <h3>Ready to Apply?</h3>
            <p>Submit your application for this exciting opportunity</p>
            <button className="apply-btn" onClick={handleApply}>
              Apply Now
              <ExternalLink size={16} />
            </button>
            <p className="apply-note">You'll be directed to the application portal</p>
          </div>

          {/* Job Details Card */}
          <div className="info-card">
            <h3>Job Details</h3>
            <div className="info-item">
              <span className="info-label">Position</span>
              <span className="info-value">{job.role}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Company</span>
              <span className="info-value">{job.title}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{job.location}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Job Type</span>
              <span className="info-value">
                {job.jobtype === '1' ? 'Internship' : 'Full-Time'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Salary</span>
              <span className="info-value">{job.pay}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Batches</span>
              <span className="info-value">{job.batches}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Posted On</span>
              <span className="info-value">{formatDate(job.created_at)}</span>
            </div>
          </div>

          {/* Share Card */}
          <div className="share-card">
            <h3>Share This Job</h3>
            <p>Help others discover this opportunity</p>
            <button className="share-card-btn" onClick={handleShare}>
              <Share2 size={16} />
              Share Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;