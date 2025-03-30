import React, { useState } from "react";
import "./Stylesheet.css";
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

const PER_PAGE = 9;

function Jobcard({ jobfilter }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * PER_PAGE;
  const currentPageJob = jobfilter.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(jobfilter.length / PER_PAGE);

  const handleShare = (post) => {
    const jobTitle = post.title || "Job Opportunity";
    const jobLocation = post.location || "Unknown Location";
    const jobPay = post.pay || "Salary not disclosed";
    const jobURL = `${window.location.origin}/job/${post.id}/${slugify(jobTitle)}`;
  
    if (navigator.share) {
      navigator
        .share({
          title: `Job Opportunity at ${jobTitle}\n`,
          text: `Check out this job: ${jobTitle}\n at ${jobLocation}\n Expected Pay: ${jobPay}\n`,
          url: `Apply here: ${jobURL}\n`,
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
  
  return (
    <div className="row">
      <div className="containerJob">
        {currentPageJob.map((post) => (
          <Link
            key={post.id}
            className="jobLink"
            to={`/job/${post.id}/${slugify(post.title)}`}
          >
            <div className="card">
              <img
                src={`${process.env.REACT_APP_API_URL}/${post.image}`}
                className="card-img-top img"
                alt={post.title}
              />
              <div className="card-body">
                <h6 className="card-title text-center">{post.role}</h6>
                <div className="jobdetail">
                  <p>
                    <FontAwesomeIcon icon={faBriefcase} />
                    <span className="ms-2">{post.batches}</span>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span className="ms-2">{post.location}</span>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faWallet} />{" "}
                    <span className="ms-2">{post.pay}</span>
                  </p>
                  <p hidden>
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    <span className="ms-2"></span>
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="alyShare">
                <div className="btnapply btn btn-sm btn-outline-success">
                  {" "}
                  Apply Now{" "}
                </div>
                <div
                  type="button"
                  className="share-buttons btn btn-sm"
                  onClick={() => handleShare(post)}
                >
                  <FontAwesomeIcon icon={faShareAlt} />
                </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
}

export default Jobcard;
