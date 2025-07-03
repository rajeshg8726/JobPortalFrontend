import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './adminSide.css';

const PER_PAGE = 10;

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    const getFeedbacks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendURL}/api/getContacts`);
        setFeedbacks(res.data.feedbackData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getFeedbacks();
  }, [backendURL]);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;
    try {
      await axios.delete(`${backendURL}/api/deleteFeedback/${id}`);
      setFeedbacks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-job/${id}`);
  };

  const offset = currentPage * PER_PAGE;
  const currentPageData = feedbacks.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(feedbacks.length / PER_PAGE);

  return (
    <div className="modern-table-container">
      <div className="modern-table-card">
        <h1 className="modern-table-title">User Feedback</h1>
        <div className="modern-table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Message</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="modern-table-loading">Loading...</td>
                </tr>
              ) : currentPageData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="modern-table-empty">No feedback found.</td>
                </tr>
              ) : (
                currentPageData.map((post, index) => (
                  <tr key={post.id}>
                    <td>{offset + index + 1}</td>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>{post.message}</td>
                    <td>
                      <button className="modern-table-action edit" onClick={() => handleEdit(post.id)} title="Edit">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="modern-table-action delete" onClick={() => handleDelete(post.id)} title="Delete">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
    </div>
  );
};

export default FeedbackTable;