import React, { useEffect, useState } from 'react';
import './JobsByRCBF.css'; // Assuming you have a CSS file for styling
import { Link, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faWallet, faBriefcase, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import slugify from 'react-slugify';
import axios from 'axios';

const PER_PAGE = 9;

function JobsForFullTime() {
    const { jobType } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [jobs, setJobs] = useState([]);
    const backendURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getJobsByType = async () => {
            try {
                const endpoint = jobType === 'Internship-jobs' ? 'getInternJobs' : 'getFullTimeJobs';
                const response = await axios.get(`${backendURL}/api/${endpoint}`);
                setJobs(response.data.jobs);
            } catch (error) {
                console.log('Error', error);
            }
        };
        getJobsByType();
    }, [jobType, backendURL]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

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
                    url: jobURL,
                })
                .catch((error) => console.log("Error sharing", error));
        } else {
            navigator.clipboard.writeText(jobURL).then(() => {
                alert("Job link copied to clipboard!");
            });
        }
    };

    const offset = currentPage * PER_PAGE;
    const currentPageJob = jobs.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(jobs.length / PER_PAGE);

    return (
        <div className="modern-jobsbyroles-container">
            <h1 className="modern-jobsbyroles-title">
                {jobType === 'Internship-jobs' ? 'Internship Jobs' : 'Full Time Jobs'}
            </h1>
            <div className="modern-jobsbyroles-list">
                {currentPageJob.length === 0 && (
                    <div className="modern-jobsbyroles-empty">No jobs found for this selection.</div>
                )}
                {currentPageJob.map((post) => (
                    <Link key={post.id} className="modern-jobsbyroles-card-link" to={`/job/${post.id}/${slugify(post.title)}`}>
                        <div className="modern-jobsbyroles-card">
                            <img src={`${backendURL}/${post.image}`} className="modern-jobsbyroles-img" alt={post.title} />
                            <div className="modern-jobsbyroles-card-body">
                                <h6 className="modern-jobsbyroles-role">{post.role}</h6>
                                <div className="modern-jobsbyroles-meta">
                                    <span><FontAwesomeIcon icon={faBriefcase} /> {post.batches}</span>
                                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {post.location}</span>
                                    <span><FontAwesomeIcon icon={faWallet} /> {post.pay}</span>
                                </div>
                                <div className="modern-jobsbyroles-actions">
                                    <span className="modern-jobsbyroles-apply">Apply Now</span>
                                    <button
                                        type="button"
                                        className="modern-jobsbyroles-share"
                                        onClick={e => { e.preventDefault(); handleShare(post); }}
                                        aria-label="Share job"
                                    >
                                        <FontAwesomeIcon icon={faShareAlt} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
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

export default JobsForFullTime;
