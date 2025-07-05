import React, { useState, useEffect } from "react";
import "./JobDetailModern.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faWallet,
  faBriefcase,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import slugify from "react-slugify";
import ReactPaginate from "react-paginate";
import PageNotFound from "./PageNotFound";

// ...useWindowSize hook remains unchanged...

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const JobDetail = () => {
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const { id, slug } = useParams();
  const backendURL = process.env.REACT_APP_API_URL;
  const [jobListData, setJobListData] = useState([]);
  const size = useWindowSize();
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 5;

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/job/${id}`);
        setJobData(response.data.job);
      } catch (error) {
        setError(error);
      }
    };
    getDataFromApi();
  }, [id, backendURL]);

  useEffect(() => {
    const getJobsToList = async () => {
      try {
        const resData = await axios.get(`${backendURL}/api/getAllJobs`);
        setJobListData(resData.data.JobsData);
      } catch (error) {
        setError(error);
      }
    };
    getJobsToList();
  }, [backendURL]);



  const handleShare = (post) => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: `Check out this job: ${post.title} at ${post.location}. Expected Pay: ${post.pay}.`,
          url: `${window.location.origin}/job/${post.id}/${slugify(post.title)}`,
        })
        .catch(() => {});
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const handlePageClick = ({ selected }) => setCurrentPage(selected);
  const offset = currentPage * jobsPerPage;
  const currentJobs = jobListData.slice(offset, offset + jobsPerPage);
  const pageCount = Math.ceil(jobListData.length / jobsPerPage);

  if (error) return <PageNotFound />;
  if (!jobData) return <div className="modern-loading">Loading...</div>;

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: jobData.title,
    description: jobData.description,
    identifier: {
      "@type": "PropertyValue",
      name: "RGJobs",
      value: jobData.id,
    },
    datePosted: new Date().toISOString(),
    employmentType: "Full-time",
    hiringOrganization: {
      "@type": "Organization",
      name: "RGJobs",
      sameAs: "https://www.rgjobs.in",
      logo: `${backendURL}/rglogo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: jobData.location,
        addressCountry: "IN",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: jobData.pay,
    },
    jobBenefits: "Career growth opportunities",
    url: `https://www.rgjobs.in/job/${slug}`,
  };

  return (
    <>
      <Helmet>
        <title>{jobData.title} - RGJobs</title>
        <meta
          name="description"
          content={`Apply for ${jobData.title} in ${jobData.location}. Check eligibility, salary, and more details at RGJobs.`}
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="modern-jobdetail-layout">
        {/* Job Detail Card */}
        <section className="modern-jobdetail-card">
          <div className="modern-jobdetail-img-wrap">
            <img
              src={`${backendURL}/${jobData.image}`}
              alt={jobData.title}
              className="modern-jobdetail-img"
            />
          </div>
          <div className="modern-jobdetail-content">
            <h1 className="modern-jobdetail-title">{jobData.title}</h1>
            <div className="modern-jobdetail-meta">
              <span>
                <FontAwesomeIcon icon={faBriefcase} /> {jobData.batches}
              </span>
              <span>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {jobData.location}
              </span>
              <span>
                <FontAwesomeIcon icon={faWallet} /> {jobData.pay}
              </span>
            </div>
            <div className="modern-jobdetail-role">
              <strong>Role:</strong> {jobData.role}
            </div>
            <div className="modern-jobdetail-section">
              <strong>Job Requirements:</strong>
              <ul>
                {jobData.description
                  .split(".")
                  .map(
                    (sentence, idx) =>
                      sentence.trim() && <li key={idx}>{sentence.trim()}.</li>
                  )}
              </ul>
            </div>
            <div className="modern-jobdetail-actions">
              <Link
                to={jobData.joblink}
                target="_blank"
                rel="noopener noreferrer"
                className="modern-jobdetail-apply"
              >
                Apply for this Job
              </Link>
              <button
                className="modern-jobdetail-share"
                onClick={() => handleShare(jobData)}
                aria-label="Share job"
              >
                <FontAwesomeIcon icon={faShareAlt} /> Share
              </button>
            </div>
            <div className="modern-jobdetail-extra" hidden>
              <Link to="https://www.dobcalc.com" target="_blank">
                <button className="modern-jobdetail-blog">
                  Check Blogs <span className="badge-new">New</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Job List Sidebar */}
        <aside className="modern-joblist-sidebar">
          <h2 className="modern-joblist-title">More Jobs</h2>
          <ul className="modern-joblist-list">
            {currentJobs.map((joblst) => (
              <li key={joblst.id} className="modern-joblist-item">
                <Link
                  to={`/job/${joblst.id}/${slugify(joblst.title)}`}
                  target="_blank"
                  className="modern-joblist-link"
                >
                  <div className="modern-joblist-card">
                    <img
                      src={`${backendURL}/${joblst.image}`}
                      alt={joblst.title}
                      className="modern-joblist-img"
                    />
                    <div>
                      <div className="modern-joblist-role">{joblst.role}</div>
                      <div className="modern-joblist-meta">
                        <span>
                          <FontAwesomeIcon icon={faBriefcase} /> {joblst.batches}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faMapMarkerAlt} /> {joblst.location}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faWallet} /> {joblst.pay}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"modern-pagination"}
            previousLinkClassName={"modern-pagination-link"}
            nextLinkClassName={"modern-pagination-link"}
            disabledClassName={"modern-pagination-link--disabled"}
            activeClassName={"modern-pagination-link--active"}
          />
        </aside>
      </div>
    </>
  );
};

export default JobDetail;