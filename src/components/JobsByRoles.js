import React, { useEffect, useState } from "react";
import "./JobsByRCBF.css";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faWallet,
  faBriefcase,
  faShareAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import slugify from "react-slugify";
import axios from "axios";
import Loading from "./Loading";

const PER_PAGE = 9;

function JobsByRoles(props) {
  const { jobRoles } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getJobsByRoles = async () => {
      setIsLoading(true);
      try {
        let endpoint = "";
        switch (jobRoles) {
          case "software-developer-engineer-role":
            endpoint = "getSoftwareEngineerOrDeveloperJobs";
            break;
          case "frontend-developer-role":
            endpoint = "getFrontendDeveloperJobs";
            break;
          case "backend-developer-role":
            endpoint = "getBackendDeveloperJobs";
            break;
          case "full-stack-developer-role":
            endpoint = "getFullStackDeveloperJobs";
            break;
          case "data-scientist-role":
            endpoint = "getDataScientistJobs";
            break;
          case "data-analyst-role":
            endpoint = "getDataAnalystJobs";
            break;
          case "machine-learning-engineer-role":
            endpoint = "getMachineLearningEngineerJobs";
            break;
          case "devops-engineer-role":
            endpoint = "getDevOpsEngineerJobs";
            break;
          case "ui-ux-designer-role":
            endpoint = "getUIUXDesignerJobs";
            break;
          case "qa-automation-tester-role":
            endpoint = "getQAAutomationTesterJobs";
            break;
          case "technical-support-engineer-role":
            endpoint = "getTechnicalSupportJobs";
            break;
          case "cybersecurity-analyst-role":
            endpoint = "getCyberSecurityJobs";
            break;
          case "cloud-engineer-role":
            endpoint = "getCloudEngineerJobs";
            break;
          default:
            console.log("Invalid route");
        }
        if (endpoint) {
          const response = await axios.get(`${backendURL}/api/${endpoint}`);
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.log("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    getJobsByRoles();
  }, [jobRoles, backendURL]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * PER_PAGE;
  const currentPageJob = jobs.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(jobs.length / PER_PAGE);

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
          title: `Job Opportunity at ${jobTitle}\n`,
          text: `Check out this job: ${jobTitle}\n at ${jobLocation}\n Expected Pay: ${jobPay}\n`,
          url: jobURL,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(jobURL).then(() => {
        alert("Job link copied to clipboard!");
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="jobs-loading-container">
        <Loading />
      </div>
    );
  }

  const formatRoleTitle = (slug = "") => {
    const cleaned = decodeURIComponent(String(slug)).replace(/^\/+|\/+$/g, "");
    const lower = cleaned.toLowerCase();
    const base = lower.replace(/-role$/, "");

    const tokenMap = {
      ai: "AI",
      ml: "ML",
      nlp: "NLP",
      ui: "UI",
      ux: "UX",
      qa: "QA",
      devops: "DevOps",
      cybersecurity: "Cybersecurity",
      frontend: "Frontend",
      backend: "Backend",
      full: "Full",
      stack: "Stack",
    };

    const title = base
      .split("-")
      .map((token) => {
        if (!token) return "";
        if (tokenMap[token]) return tokenMap[token];
        return token.charAt(0).toUpperCase() + token.slice(1);
      })
      .join(" ")
      .replace(/\bUi Ux\b/g, "UI/UX")
      .replace(/\bQa\b/g, "QA")
      .trim();

    return title ? `${title} Jobs` : "Jobs";
  };

  return (
    <div className="jobs-container">
      {/* Hero Section */}
      <div className="jobs-hero-section">
        <div className="jobs-hero-content">
          <h1 className="jobs-hero-title">{formatRoleTitle(jobRoles)}</h1>
          <p className="jobs-hero-subtitle">
            Find your perfect job match from {jobs.length} available positions
          </p>
          <div className="jobs-hero-divider"></div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="jobs-wrapper">
        {currentPageJob.length === 0 ? (
          <div className="jobs-empty-state">
            <div className="jobs-empty-icon">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <h3>No jobs found for this role</h3>
            <p>Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {currentPageJob.map((post) => (
              <Link
                key={post.id}
                to={`/job/${post.id}/${slugify(post.title)}`}
                className="jobs-card-wrapper"
              >
                <div className="jobs-card">
                  {/* Card Header with Image */}
                  <div className="jobs-card-header">
                    <div className="jobs-card-image-wrapper">
                      <img
                        src={`${backendURL}/${post.image}`}
                        alt={post.title}
                        className="jobs-card-image"
                      />
                      <div className="jobs-card-overlay"></div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="jobs-card-content">
                    <h3 className="jobs-card-role">{post.role}</h3>
                    <p className="jobs-card-title">{post.title}</p>

                    {/* Meta Information */}
                    <div className="jobs-card-meta">
                      <div className="jobs-meta-item">
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="jobs-meta-icon"
                        />
                        <span className="jobs-meta-text">{post.batches}</span>
                      </div>
                      <div className="jobs-meta-item">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="jobs-meta-icon"
                        />
                        <span className="jobs-meta-text">{post.location}</span>
                      </div>
                      <div className="jobs-meta-item">
                        <FontAwesomeIcon
                          icon={faWallet}
                          className="jobs-meta-icon"
                        />
                        <span className="jobs-meta-text jobs-meta-pay">
                          {post.pay}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="jobs-card-footer">
                      <button
                        className="jobs-share-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShare(post);
                        }}
                        aria-label="Share job"
                        title="Share this job"
                      >
                        <FontAwesomeIcon icon={faShareAlt} />
                      </button>
                      <div className="jobs-card-cta">
                        <span className="jobs-view-more-text">View Details</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="jobs-pagination-wrapper">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="jobs-pagination"
              previousLinkClassName="jobs-pagination-link jobs-pagination-prev"
              nextLinkClassName="jobs-pagination-link jobs-pagination-next"
              pageLinkClassName="jobs-pagination-link"
              disabledClassName="jobs-pagination-disabled"
              activeClassName="jobs-pagination-active"
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsByRoles;
