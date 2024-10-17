import React, { useEffect, useState } from 'react';
import './Stylesheet.css';
import { Link, useParams } from 'react-router-dom'; // useParams to capture route params
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faWallet, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import slugify from 'react-slugify';
import axios from 'axios';

const PER_PAGE = 9;

function JobsForFullTime() {
    const { jobType } = useParams(); // Get the jobType from the route params
    const [currentPage, setCurrentPage] = useState(0);
    const [jobs, setJobs] = useState([]);
    
    const backendURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getJobsByType = async () => {
            try {
                // Change the API endpoint based on jobType
                const endpoint = jobType === 'Internship-jobs' ? 'getInternJobs' : 'getFullTimeJobs';
                const response = await axios.get(`${backendURL}/api/${endpoint}`);
                setJobs(response.data.jobs);
            } catch (error) {
                console.log('Error', error);
            }
        };

        getJobsByType();
    }, [jobType, backendURL]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
    const currentPageJob = jobs.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(jobs.length / PER_PAGE);

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

export default JobsForFullTime;
