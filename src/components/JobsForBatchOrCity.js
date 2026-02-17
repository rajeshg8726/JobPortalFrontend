import React, { useEffect, useState } from "react";
import "./JobsByRCBF.css"; // Assuming you have a CSS file for styling
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
import { Helmet } from 'react-helmet-async';

const PER_PAGE = 9;

function JobsForBatchOrCity() {
  const { jobTypeOrCity } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getJobsByTypeOrCity = async () => {
      setIsLoading(true);
      try {
        let endpoint = "";
        switch (jobTypeOrCity) {
          case "2023-batch":
            endpoint = "get13YearsJobs";
            break;
          case "2024-batch":
            endpoint = "get01YearsJobs";
            break;
          case "2025-batch":
            endpoint = "getFreshersJobs";
            break;
          case "2026-batch":
            endpoint = "getInternJobs";
            break;
          case "2027-batch":
            endpoint = "getInternJobs";
            break;
          case "2028-batch":
            endpoint = "getInternJobs";
            break;
          case "ai-ml-nlp-domain":
            endpoint = "getAIMLNLPJobs";
            break;
          case "big-data-domain":
            endpoint = "getBigDataJobs";
            break;
          case "blockchain-domain":
            endpoint = "getBlockchainJobs";
            break;
          case "cloud-computing-domain":
            endpoint = "getCloudComputingJobs";
            break;
          case "cyber-security-domain":
            endpoint = "getCyberSecurityJobs";
            break;
          case "game-development-domain":
            endpoint = "getGameDevelopmentJobs";
            break;
          case "web-development-domain":
            endpoint = "getWebDevelopmentJobs";
            break;
          case "ar-vr-domain":
            endpoint = "getARVRJobs";
            break;
          case "open-source-hackathons-domain":
            endpoint = "getOpenSourceHackathonJobs";
            break;
          case "app-development-domain":
            endpoint = "getAppDevelopmentJobs";
            break;
          case "Bengaluru-Jobs":
            endpoint = "getBengaluruJobs";
            break;
          case "Hyderabad-Jobs":
            endpoint = "getHyderabadJobs";
            break;
          case "Noida-Jobs":
            endpoint = "getNoidaJobs";
            break;
          case "Chennai-Jobs":
            endpoint = "getChennaiJobs";
            break;
          case "Gurgaon-Jobs":
            endpoint = "getGurgaonJobs";
            break;
          case "Pune-Jobs":
            endpoint = "getPuneJobs";
            break;
          case "Remote-Jobs":
            endpoint = "getRemoteJobs";
            break;
          case "Outside-india-Jobs":
            endpoint = "getOutsideIndiaJobs";
            break;
          case "product-based-jobs":
            endpoint = "getProductBasedJobs";
            break;
          case "service-based-jobs":
            endpoint = "getServiceBasedJobs";
            break;
          case "startups-based-jobs":
            endpoint = "getStartupsBasedJobs";
            break;
          case "mnc-based-jobs":
            endpoint = "getMNCBasedJobs";
            break;
          case "remote-based-jobs":
            endpoint = "getRemoteBasedJobs";
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
    getJobsByTypeOrCity();
  }, [jobTypeOrCity, backendURL]);

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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * PER_PAGE;
  const currentPageJob = jobs.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(jobs.length / PER_PAGE);

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

  const formatTitle = (slug = "") => {
    const cleaned = decodeURIComponent(String(slug)).replace(/^\/+|\/+$/g, "");
    const lower = cleaned.toLowerCase();

    const hasJobsSuffix = /-jobs?$/.test(lower);
    const hasDomainSuffix = /-domain$/.test(lower);
    const hasBatchSuffix = /-batch$/.test(lower);

    let base = lower
      .replace(/-jobs?$/, "")
      .replace(/-domain$/, "")
      .replace(/-batch$/, "");

    if (base === "ai-ml-nlp") {
      base = "ai/ml/nlp";
    } else if (base === "ar-vr") {
      base = "ar/vr";
    }

    const acronymMap = {
      ai: "AI",
      ml: "ML",
      nlp: "NLP",
      ar: "AR",
      vr: "VR",
      qa: "QA",
      ui: "UI",
      ux: "UX",
      mnc: "MNC",
      devops: "DevOps",
    };

    const formatToken = (token) => {
      if (!token) return "";
      if (acronymMap[token]) return acronymMap[token];
      if (/^\d+$/.test(token)) return token;
      return token.charAt(0).toUpperCase() + token.slice(1);
    };

    const formattedBase = base
      .split("-")
      .map((part) =>
        part
          .split("/")
          .map((token) => formatToken(token))
          .join("/")
      )
      .join(" ")
      .trim();

    const suffixParts = [];
    if (hasDomainSuffix) suffixParts.push("Domain");
    if (hasBatchSuffix) suffixParts.push("Batch");
    if (hasJobsSuffix || hasDomainSuffix || hasBatchSuffix) suffixParts.push("Jobs");

    return [formattedBase, ...suffixParts].filter(Boolean).join(" ");
  };

  

  const pageTitle = formatTitle(jobTypeOrCity);

  return (
    <div className="jobs-container">
      <Helmet>
        <title>{`${pageTitle} in India - Apply Now | RGJobs`}</title>
        <meta name="description" content={`Browse ${jobs.length}+ ${pageTitle} in India. Discover top career opportunities for freshers, interns and experienced professionals. Apply now on RGJobs!`} />
        <link rel="canonical" href={`https://www.rgjobs.in/jobs/${jobTypeOrCity}`} />
        <meta property="og:title" content={`${pageTitle} | RGJobs`} />
        <meta property="og:description" content={`${jobs.length}+ ${pageTitle} available. Apply now!`} />
        <meta property="og:url" content={`https://www.rgjobs.in/jobs/${jobTypeOrCity}`} />
      </Helmet>

      {/* Hero Section */}
      <div className="jobs-hero-section">
        <div className="jobs-hero-content">
          {/* Breadcrumbs */}
          <nav className="jobs-breadcrumb" aria-label="Breadcrumb">
            <ol className="jobs-breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
              <li className="jobs-breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="jobs-breadcrumb-sep" aria-hidden="true">/</li>
              <li className="jobs-breadcrumb-item active" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">{pageTitle}</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>
          <h1 className="jobs-hero-title">{pageTitle}</h1>
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
            <div className="jobs-empty-icon">📋</div>
            <h3>No jobs found for this selection</h3>
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
              previousLabel={"←"}
              nextLabel={"→"}
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

export default JobsForBatchOrCity;
