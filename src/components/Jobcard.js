import React, { useState, useEffect } from "react";
import "./jobCard.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faWallet,
  faBriefcase,
  faCalendar,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import slugify from "react-slugify";
import Loading from './Loading'; // Import your Loading component


const PER_PAGE = 9;

function Jobcard(props) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  let offset = currentPage * PER_PAGE;
  let currentPageJob = props.allJobs.slice(offset, offset + PER_PAGE);
  let pageCount = Math.ceil(props.allJobs.length / PER_PAGE);

  // If props.allJobs is provided, use it; otherwise, use props.searchedJobs
  if (props.searchedJobs && props.searchedJobs.length > 0) {
    // If there are searched jobs, use them instead of allJobs
    offset = currentPage * PER_PAGE;
    currentPageJob = props.searchedJobs.slice(offset, offset + PER_PAGE);
    pageCount = Math.ceil(props.searchedJobs.length / PER_PAGE);
  }

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
          text: `Check out this job: ${jobTitle} at ${jobLocation}. Expected Pay: ${jobPay}.`,
          url: jobURL,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(jobURL).then(() => {
        alert("Job link copied to clipboard!");
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageJob]); // Scroll to top when currentPageJob (It's act as a dependency array) changes

  if(props.loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )
  }

  return (
    <div className="modern-jobcard-row">
      <div className="modern-jobcard-container">
        {currentPageJob.length === 0 ? (
          <div className="no-jobs-found">No jobs found.</div>
        ) : (
          currentPageJob.map((post) => (
            <div className="modern-jobcard" key={post.id}>
              <div className="modern-jobcard-img-wrap">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${post.image}`}
                  className="modern-jobcard-img"
                  alt={post.title}
                />
              </div>
              <div className="modern-jobcard-body">
                <h6 className="modern-jobcard-title">{post.role}</h6>
                <div className="modern-jobcard-details">
                  <span>
                    <FontAwesomeIcon icon={faBriefcase} /> {post.batches}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {post.location}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faWallet} /> {post.pay}
                  </span>
                </div>
                <div className="modern-jobcard-footer">
                  <Link
                    className="modern-jobcard-apply"
                    to={`/job/${post.id}/${slugify(post.title)}`}
                    target="_blank"
                  
                  >
                    Apply Now
                  </Link>
                  <button
                    type="button"
                    className="modern-jobcard-share"
                    onClick={() => handleShare(post)}
                    aria-label="Share job"
                  >
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                </div>
                <div className="modern-jobcard-date">
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"modern-pagination"}
          previousLinkClassName={"modern-pagination-link"}
          nextLinkClassName={"modern-pagination-link"}
          disabledClassName={"modern-pagination-link--disabled"}
          activeClassName={"modern-pagination-link--active"}
        />
      )}
    </div>
  );
}

export default Jobcard;
