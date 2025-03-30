import React, { useEffect, useState } from 'react';
import './Stylesheet.css';
import { Link, useParams } from 'react-router-dom'; // useParams to capture route params
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faWallet, faBriefcase, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import slugify from 'react-slugify';
import axios from 'axios';

const PER_PAGE = 9;

function JobsByRoles() {
    const { jobRoles } = useParams(); // Get the batch or city from the route params
    const [currentPage, setCurrentPage] = useState(0);
    const [jobs, setJobs] = useState([]);

    const backendURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getJobsByRoles = async () => {
            try {
                let endpoint = '';
                // Determine the API endpoint based on the route param
                switch (jobRoles) {
                    case 'software-engineer-jobs':
                        endpoint = 'getSWEJobs';
                        break;
                    case 'software-developer-jobs':
                        endpoint = 'getSDEJobs';
                        break;
                    case 'software-testing-jobs':
                        endpoint = 'getSWETestingJobs';
                        break;
                    case 'cloud-engineeer-jobs':
                        endpoint = 'getCloudJobs';
                        break;
                    case 'analytics-and-data-science-jobs':
                        endpoint = 'getAnalyticsJobs';
                        break;
                    case 'devops-engineer-jobs':
                        endpoint = 'getDevOpsJobs';
                        break;
                    case 'technical-support-jobs':
                        endpoint = 'getTechnicalSupportJobs';
                        break;

                    default:
                        console.log("Invalid route");
                }

                if (endpoint) {
                    const response = await axios.get(`${backendURL}/api/${endpoint}`);
                    setJobs(response.data.jobs);
                }
            } catch (error) {
                console.log('Error', error);
            }
        };

        getJobsByRoles();
    }, [jobRoles, backendURL]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []); // Runs only once when the component is mounted

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
        <div className='row'>
            <div className='containerJob'>
                {currentPageJob.map((post) => (
                    <Link key={post.id} className='jobLink' to={`/job/${post.id}/${slugify(post.title)}`}>
                        <div className="card">
                            <img src={`${backendURL}/${post.image}`} className="card-img-top img" alt={post.title} />
                            <div className="card-body">
                                <h6 className="card-title text-center">{post.role}</h6>
                                <div className="jobdetail">
                                    <p><FontAwesomeIcon icon={faBriefcase} /><span className='ms-2'>{post.batches}</span></p>
                                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /><span className='ms-2'>{post.location}</span></p>
                                    <p><FontAwesomeIcon icon={faWallet} /><span className='ms-2'>{post.pay}</span></p>
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

export default JobsByRoles;
