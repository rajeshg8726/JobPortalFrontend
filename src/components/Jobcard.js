import React, { useState, useEffect } from 'react';
import './Stylesheet.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const PER_PAGE = 8; // 3 rows per page with 3 columns each

function Jobcard() {
    const [jobPost, setJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await axios.get('/api/getAllJobs');
                const result = res.data.allJobs;
                console.log(result);
                setJobPost(result);
            } catch (error) {
                console.log(error);
            }
        };

        getJobs();
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
    const currentPageData = jobPost.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(jobPost.length / PER_PAGE);

    return (
        <div>
            <div className='containerJob'>
                {currentPageData.map((post) => (
                    <Link key={post._id} className='jobLink' to={`/job/${post._id}`}>
                        <div className="card">
                            <img src={`${process.env.PUBLIC_URL}/uploads/${post.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">Batch: {post.batches}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Locations: {post.location}</li>
                                <li className="list-group-item">Type: {post.jobtype}</li>
                            </ul>
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
