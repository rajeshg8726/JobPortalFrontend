import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './adminSide.css'; // Assuming you have a CSS file for styling
const PER_PAGE = 10;

const InvUsersExpList = () => {
  const { listURL } = useParams();
  const [jobPost, setJobPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    const getAdminAddedInvExp = async () => {
      setLoading(true);
      try {
        let endpoint = '';
        switch (listURL) {
          case 'users-added-interviews-list':
            endpoint = 'getUsersInvExps';
            break;
          case 'admin-added-interviews-list':
            endpoint = 'getAdminAddedInvExps';
            break;
          default:
            console.log("Invalid route");
        }
        if (endpoint) {
          const res = await axios.get(`${backendURL}/api/${endpoint}`);
          setJobPost(res.data.InvData);
        }
      } catch (error) {
        console.log('Error', error);
      }
      setLoading(false);
    };
    getAdminAddedInvExp();
  }, [listURL, backendURL]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this interview experience?')) return;
    try {
      await axios.delete(`${backendURL}/api/deleteAdminAddedInvExp/${id}`);
      setJobPost((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-user-interviews/${id}`);
  };

  const offset = currentPage * PER_PAGE;
  const currentPageData = jobPost.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(jobPost.length / PER_PAGE);

  return (
    <div className="modern-table-container">
      <div className="modern-table-card">
        <h1 className="modern-table-title">
          {listURL === 'users-added-interviews-list'
            ? 'User Submitted Interview Experiences'
            : 'Admin Submitted Interview Experiences'}
        </h1>
        <div className="modern-table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Company Name</th>
                <th>Job Role</th>
                <th>Title</th>
                <th>Worktype</th>
                <th className="modern-table-details-col">Details</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="modern-table-loading">Loading...</td>
                </tr>
              ) : currentPageData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="modern-table-empty">No interview experiences found.</td>
                </tr>
              ) : (
                currentPageData.map((post, index) => (
                  <tr key={post.id}>
                    <td>{offset + index + 1}</td>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>{post.companyName}</td>
                    <td>{post.jobRole}</td>
                    <td>{post.title}</td>
                    <td>{post.experience}</td>
                    <td className="modern-table-details-col">
                      <div className="modern-table-details-cell">
                        <span title={post.details}>
                          {post.details?.length > 40
                            ? post.details.slice(0, 40) + '...'
                            : post.details}
                        </span>
                      </div>
                    </td>
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

export default InvUsersExpList;

