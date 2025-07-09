import React, { useState, useEffect } from "react";
import "./InterviewsPages.css"; // Assuming you have a CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

const InterviewExperience = () => {
  const navigate = useNavigate();
  const [invData, setInvData] = useState([]);
  const backendURL = process.env.REACT_APP_API_URL;
  const [companyCat, setCompanyCat] = useState([]);
  const [roleCat, setroleCat] = useState([]);
  const [workCat, setworkCat] = useState([]);

  // Fetch categories
  useEffect(() => {
    const getCompanyCat = async () => {
      try {
        const cat = await axios.get(`${backendURL}/api/getCompanyCat`);
        setCompanyCat(cat.data.roleData);
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    };
    getCompanyCat();
  }, [backendURL]);

  useEffect(() => {
    const getRolesCat = async () => {
      try {
        const cat = await axios.get(`${backendURL}/api/getRolesCat`);
        setroleCat(cat.data.roleData);
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    };
    getRolesCat();
  }, [backendURL]);

  useEffect(() => {
    const getWorkCat = async () => {
      try {
        const cat = await axios.get(`${backendURL}/api/getWorkCat`);
        setworkCat(cat.data.roleData);
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    };
    getWorkCat();
  }, [backendURL]);

  // Fetch interview data from the backend
  useEffect(() => {
    const getAllInterviews = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/getAdminAddedInvExps`);
        const fetchedData = res.data.InvData.map((item) => ({
          ...item,
          count: Number(localStorage.getItem(`count_${item.id}`)) || 0,
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
    setInvData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
    const newCount = Number(localStorage.getItem(`count_${id}`)) + 1 || 1;
    localStorage.setItem(`count_${id}`, newCount);
  };

  // Handle navigation to add new interview experience
  const handleAddExperienceClick = () => {
    navigate("/add-interview-experiences");
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
    <div className="modern-invexp-container">
      <div className="modern-invexp-header">
        <h1>
          Real-Life Interview{" "}
          <span className="modern-invexp-highlight">Experience:</span> Achieve
          Your DREAMS!
        </h1>
        <p className="modern-invexp-lead">
          Discover the latest job experiences shared by achievers of dreams so
          that you can share yours next.
        </p>
        <p className="modern-invexp-motto">
          <strong>Be A Hustler! | Be Prepared</strong>
        </p>
        <button
          type="button"
          className="modern-invexp-btn"
          onClick={handleAddExperienceClick}
        >
          Share Experience
        </button>
      </div>
      <div className="modern-invexp-filters">
        <select className="modern-invexp-select">
          <option defaultValue="">Company</option>
          {companyCat && companyCat.length > 0 ? (
            companyCat.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
        <select className="modern-invexp-select">
          <option defaultValue="">Work Type</option>
          {workCat && workCat.length > 0 ? (
            workCat.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
        <select className="modern-invexp-select">
          <option defaultValue="">Job Role</option>
          {roleCat && roleCat.length > 0 ? (
            roleCat.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>
      </div>
      <div className="modern-invexp-list">
        {currentPageJob.map((item) => (
          <Link
            key={item.id}
            className="modern-invexp-card-link"
            to={`/interview-experience-details/${item.id}`}
            onClick={() => incrementCount(item.id)}
          >
            <div className="modern-invexp-card">
              <div className="modern-invexp-card-header">
                <h5>{item.title}</h5>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size="2x"
                  className="modern-invexp-usericon"
                />
              </div>
              <div className="modern-invexp-card-user">
                <span>
                  {item.anonymous === 1 ? "Anonymous User" : item.name}
                </span>
                <span className="modern-invexp-date">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="modern-invexp-card-footer">
                <span className="modern-invexp-views">
                  <FontAwesomeIcon icon={faEye} className="modern-invexp-eye" />
                  <span className="modern-invexp-count">{item.count}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
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
    </div>
  );
};

export default InterviewExperience;
