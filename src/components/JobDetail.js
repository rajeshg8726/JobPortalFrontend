import React, { useState, useEffect } from "react";
import "./Stylesheet.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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

// Custom hook to get window width
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const JobDetail = () => {
  const [jobData, setJobData] = useState(null); // Initialize jobData as null
  const [error, setError] = useState(null);
  const { id, slug } = useParams();
  const backendURL = process.env.REACT_APP_API_URL;
  const [jobListData, setJobListData] = useState([]);
  const size = useWindowSize(); // Use the custom hook to get the screen size
  const [currentPage, setCurrentPage] = useState(0); // New state for current page
  const jobsPerPage = 5; // Jobs per page
  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/job/${id}`);
        const rt = response.data.job;
        setJobData(rt);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    getDataFromApi();
  }, [id, backendURL]);

  useEffect(() => {
    const getJobsToList = async () => {
      try {
        const resData = await axios.get(`${backendURL}/api/getAllJobs`);
        const jobslist = resData.data.JobsData;
        setJobListData(jobslist);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    getJobsToList();
  }, [backendURL]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Runs only once when the component is mounted

  const handleShare = (post) => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: `Check out this job: ${post.title} at ${post.location}. Expected Pay: ${post.pay}.`,
          url: `${window.location.origin}/job/${post.id}/${slugify(
            post.title
          )}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  // Pagination logic
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected); // Set the selected page
  };

  // Calculate the offset and the current jobs to display
  const offset = currentPage * jobsPerPage;
  const currentJobs = jobListData.slice(offset, offset + jobsPerPage);
  const pageCount = Math.ceil(jobListData.length / jobsPerPage);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!jobData) {
    // If jobData is null (loading state)
    return <div>Loading...</div>;
  }

  // Structured Data for JobPosting
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
      sameAs: "https://rgjobs.in",
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
    url: `https://rgjobs.in/job/${slug}`,
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
      <div className="row">
        {size.width <= 768 ? (
          // On mobile, render job detail first and then job list
          <>
            {/* Job Detail */}
            <div className="jobcontain col-sm-8">
              <div key={jobData.id} className="jobDetail">
                <div className="imgcard">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${jobData.image}`}
                    className="card-img-top"
                    alt={`${jobData.title} job at ${jobData.location}`}
                  />
                </div>
                <div className="container">
                  <h3 className="text-center">
                    <strong>{jobData.title}</strong>
                  </h3>
                  <h5>
                    {" "}
                    <strong> Job Role: </strong>
                  </h5>
                  <p>{jobData.role}</p>
                  <h5>
                    {" "}
                    <strong>For Batch:</strong>
                  </h5>
                  <p>{jobData.batches}</p>
                  <h5>
                    {" "}
                    <strong>Expected Pay:</strong>
                  </h5>
                  <p>{jobData.pay}</p>
                  <h5>
                    {" "}
                    <strong>Location:</strong>
                  </h5>
                  <p>{jobData.location}</p>
                  <h5>
                    {" "}
                    <strong>Job Requirements:</strong>
                  </h5>
                  <ul>
                    {jobData.description
                      .split(".")
                      .map(
                        (sentence, index) =>
                          sentence.trim() && (
                            <li key={index}>{sentence.trim()}.</li>
                          )
                      )}
                  </ul>
                  <Link
                    className="jobLink"
                    to={jobData.joblink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-outline-success btn-sm">
                      APPLY FOR THIS JOB
                    </button>
                  </Link>
                  <div
                    type="button"
                    className="share-buttonsonJobDetailOnMobile btn btn-sm btn-outline-primary"
                    onClick={() => handleShare(jobData)}
                  >
                    <FontAwesomeIcon className="shareIcon" icon={faShareAlt} />{" "}
                    <span style={{ marginLeft: "10%" }} > Share </span>
                  </div>

                  <div className="dobcalc" style={{margin:"1rem auto"}} > 
                      <Link to="https://www.dobcalc.com" target="_blank" >
                      <button className="btn btn-outline-primary btn-sm">
                      Check Your Age <span class="badge text-bg-secondary">New</span>
                    </button>
                       </Link>
                    </div>

                </div>
              </div>
            </div>

            {/* Job List */}
            <div className="joblist col-sm-4">
              <ul className="list-group">
                {currentJobs.map((joblst) => (
                  <li className="list-group-item" key={joblst.id}>
                    <Link
                      className="listjob"
                      to={`/job/${joblst.id}/${slugify(joblst.title)}`}
                      target="_blank"
                    >
                      <div className="card mb-3">
                        <div className="row g-0">
                          <div className="col-sm-2">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${joblst.image}`}
                              className="card-img-top lsimg"
                              alt={`${joblst.title} job at ${joblst.location}`}
                            />
                          </div>
                          <div className="col-sm-8">
                            <div className="card-body">
                              <h6 className="card-title lsrole">
                                {joblst.role}
                              </h6>
                              <div className="jobdetailList">
                                <p>
                                  <FontAwesomeIcon icon={faBriefcase} />
                                  <span className="ms-2">{joblst.batches}</span>
                                </p>
                                <p>
                                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                                  <span className="ms-2">
                                    {joblst.location}
                                  </span>
                                </p>
                                <p>
                                  <FontAwesomeIcon icon={faWallet} />
                                  <span className="ms-2">{joblst.pay}</span>
                                </p>

                                <div className="btnapplyJobDetail btn btn-sm btn-outline-success">
                                  {" "}
                                  Apply Now{" "}
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Pagination Component */}
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </>
        ) : (
          // On larger screens, render job list first and job detail
          <>
            {/* Job List */}
            <div className="joblist col-sm-4">
              <ul className="list-group">
                {currentJobs.map((joblst) => (
                  <li className="list-group-item" key={joblst.id}>
                    <Link
                      className="listjob"
                      to={`/job/${joblst.id}/${slugify(joblst.title)}`}
                      target="_blank"
                    >
                      <div className="card mb-3">
                        <div className="row g-0">
                          <div className="col-sm-2">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${joblst.image}`}
                              className="card-img-top lsimg"
                              alt={`${joblst.title} job at ${joblst.location}`}
                            />
                          </div>
                          <div className="col-sm-8">
                            <div className="card-body">
                              <h6 className="card-title lsrole">
                                {joblst.role}
                              </h6>
                              <div className="jobdetailList">
                                <p>
                                  <FontAwesomeIcon icon={faBriefcase} />
                                  <span className="ms-2">{joblst.batches}</span>
                                </p>
                                <p>
                                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                                  <span className="ms-2">
                                    {joblst.location}
                                  </span>
                                </p>
                                <p>
                                  <FontAwesomeIcon icon={faWallet} />
                                  <span className="ms-2">{joblst.pay}</span>
                                </p>
                                <div className="btnapplyJobDetail btn btn-sm btn-outline-success">
                                  {" "}
                                  Apply Now{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
                {/* Pagination Component */}
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </ul>
            </div>

            {/* Job Detail */}
            <div className="jobcontain col-sm-8">
              <div key={jobData.id} className="jobDetail">
                <div className="imgcard">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${jobData.image}`}
                    className="card-img-top"
                    alt={`${jobData.title} job at ${jobData.location}`}
                  />
                </div>
                <div className="container">
                  <h3 className="text-center">
                    <strong>{jobData.title}</strong>
                  </h3>
                  <h5>
                    {" "}
                    <strong> Job Role: </strong>
                  </h5>
                  <p>{jobData.role}</p>
                  <h5>
                    {" "}
                    <strong>For Batch:</strong>
                  </h5>
                  <p>{jobData.batches}</p>
                  <h5>
                    {" "}
                    <strong>Expected Pay:</strong>
                  </h5>
                  <p>{jobData.pay}</p>
                  <h5>
                    {" "}
                    <strong>Location:</strong>
                  </h5>
                  <p>{jobData.location}</p>
                  <h5>
                    {" "}
                    <strong>Job Requirements:</strong>
                  </h5>
                  <ul>
                    {jobData.description
                      .split(".")
                      .map(
                        (sentence, index) =>
                          sentence.trim() && (
                            <li key={index}>{sentence.trim()}.</li>
                          )
                      )}
                  </ul>
                  <Link
                    className="jobLink"
                    to={jobData.joblink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-outline-success btn-sm">
                      APPLY FOR THIS JOB
                    </button>
                  </Link>
                  <div
                    type="button"
                    className="share-buttonsonJobDetail btn btn-sm btn-outline-primary"
                    onClick={() => handleShare(jobData)}
                  >
                    <FontAwesomeIcon className="shareIcon" icon={faShareAlt} />{" "}
                    <span style={{ marginLeft: "10%" }} > Share </span>
                  </div>

                    <div className="dobcalc" style={{margin:"1rem 1rem"}} > 
                      <Link to="https://www.dobcalc.com" target="_blank" >
                      <button className="btn btn-outline-primary btn-sm">
                      Check Your Age <span class="badge text-bg-secondary">New</span>
                    </button>
                       </Link>
                    </div>

                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobDetail;
