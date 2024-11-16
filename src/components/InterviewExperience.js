import React, { useState, useEffect } from 'react';
import './SecondStyleSheet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const InterviewExperience = () => {
    const navigate = useNavigate();
    const [invData, setInvData] = useState([]);
    const backendURL = process.env.REACT_APP_API_URL;
    const [companyCat, setCompanyCat] = useState([]);
    const [roleCat, setroleCat] = useState([]);
    const [workCat, setworkCat] = useState([]);


    // Fetch different categories
    useEffect(() => {
        const getCompanyCat = async () => {
            try {
                const cat = await axios.get(`${backendURL}/api/getCompanyCat`);
                const res = cat.data.roleData;
                setCompanyCat(res);
            } catch (error) {
                console.error("Error fetching interview data:", error);
                
            }
        }
        getCompanyCat();

    },[backendURL]);

    useEffect(() => {
        const getCompanyCat = async () => {
            try {
                const cat = await axios.get(`${backendURL}/api/getRolesCat`);
                const res = cat.data.roleData;
                setroleCat(res);
            } catch (error) {
                console.error("Error fetching interview data:", error);
                
            }
        }
        getCompanyCat();

    },[backendURL]);
    useEffect(() => {
        const getCompanyCat = async () => {
            try {
                const cat = await axios.get(`${backendURL}/api/getWorkCat`);
                const res = cat.data.roleData;
                setworkCat(res);
            } catch (error) {
                console.error("Error fetching interview data:", error);
                
            }
        }
        getCompanyCat();

    },[backendURL]);



    // Fetch interview data from the backend
    useEffect(() => {
        const getAllInterviews = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/getAdminAddedInvExps`);
                const fetchedData = res.data.InvData.map(item => ({
                    ...item,
                    count: Number(localStorage.getItem(`count_${item.id}`)) || 0  // Set initial count from localStorage
                }));
                setInvData(fetchedData);
            } catch (error) {
                console.error("Error fetching interview data:", error);
            }
        };
        getAllInterviews();
    }, [backendURL]);

    // Increment view count for a specific card
    const incrementCount = (id) => {
        setInvData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        );
        const newCount = Number(localStorage.getItem(`count_${id}`)) + 1 || 1;
        localStorage.setItem(`count_${id}`, newCount);  // Update localStorage
    };

    // Handle navigation to add new interview experience
    const handleAddExperienceClick = () => {
        navigate('/add-interview-experiences');
    };

    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * PER_PAGE;
    const currentPageJob = invData.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(invData.length / PER_PAGE);
    return (
        <div className="container">
            <div className="addInvBtn">
                <button type="button" className="btn btn-sm btn-success" onClick={handleAddExperienceClick}>Share Experience</button>
            </div>
            <div className="bodyhead text-center">
                <h1><strong>Real-Life Interview <span style={{ color: 'rgb(212,31,48)' }}>Experience:</span> Achieve Your DREAMS!</strong></h1>
                <p style={{ color: 'rgb(122,124,135)' }}>Discover the latest job experiences shared by achievers of dreams so that you can share yours next.</p>
                <p><strong>Be A Hustler! | Be Prepared</strong></p>
            </div>
            <div className="filters">
                <div className="f1">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Company</option>
                        {
                            companyCat && companyCat.length > 0 ? (
                                companyCat.map((cat) => (
                                    <option key={cat.id} value={cat.id}> {cat.name} </option>
                                ))
                            ) : <option disabled>Loading Job Batches...</option>
                        }
                        
                    </select>
                </div>
                <div className="f2">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Work Type</option>
                        {
                            workCat && workCat.length > 0 ? (
                                workCat.map((cat) => (
                                    <option key={cat.id} value={cat.id}> {cat.name} </option>
                                ))
                            ) : <option disabled>Loading Job Batches...</option>
                        }
                    </select>
                </div>
                <div className="f3">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Job Role</option>
                        {
                            roleCat && roleCat.length > 0 ? (
                                roleCat.map((cat) => (
                                    <option key={cat.id} value={cat.id}> {cat.name} </option>
                                ))
                            ) : <option disabled>Loading Job Batches...</option>
                        }
                    </select>
                </div>
            </div>

            {currentPageJob.map((item) => (
                <Link
                    key={item.id}
                    className="link my-4 mx-4"
                    to={`/interview-experience-details/${item.id}`}
                    onClick={() => incrementCount(item.id)}
                >
                    <div className="invcard card">
                        <div className="title">
                            <h5>{item.title}</h5>
                        </div>
                        <div className="icon">
                            <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{ color: "#74C0FC" }} />
                        </div>
                        <div className="user">
                            <p>
                                {item.anonymous === 1 ? "Anonymous User" : item.name}
                                <span> {new Date(item.created_at).toLocaleDateString()} </span>
                            </p>
                        </div>
                        <div className="views">
                            <FontAwesomeIcon icon={faEye} size="lg" style={{ color: "#74C0FC" }} />
                            <p className="count">{item.count}</p>  {/* Display the updated count */}
                        </div>
                    </div>
                </Link>
            ))}

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
};

export default InterviewExperience;
