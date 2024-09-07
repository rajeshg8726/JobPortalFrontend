import React, { useState } from 'react';
import './Stylesheet.css';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PER_PAGE = 9; // 3 rows per page with 3 columns each

function Jobcard({jobfilter}) {
    
    const [currentPage, setCurrentPage] = useState(0);

  
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
     const currentPageJob = jobfilter.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(jobfilter.length / PER_PAGE);

    return (
        <div>
            <div className='containerJob'>
                {currentPageJob.map((post) => (
                    <Link key={post.id} className='jobLink' to={`/job/${post.id}`}>
                        <div className="card">
                            <img src={`${process.env.REACT_APP_API_URL}/${post.image}`} className="card-img-top img" alt="..." />
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
