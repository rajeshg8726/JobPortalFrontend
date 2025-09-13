import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminSide.css'; // Assuming you have a CSS file for styling
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const PER_PAGE = 10;

const JobList = () => {
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
    const getJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendURL}/api/getAllJobs`);
        setJobPost(res.data.JobsData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getJobs();
  }, [backendURL]);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await axios.delete(`${backendURL}/api/deletejob/${id}`);
      setJobPost((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (id) => navigate(`/admin/edit-job/${id}`);

  const offset = currentPage * PER_PAGE;
  const currentPageData = jobPost.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(jobPost.length / PER_PAGE);

  return (
    <div className="modern-table-container">
      <div className="modern-table-card">
        <h1 className="modern-table-title">Jobs List</h1>
        <div className="modern-table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Company Name</th>
                <th>Job Role</th>
                <th>Batches</th>
                <th>Expected Pay</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="modern-table-loading">Loading...</td>
                </tr>
              ) : currentPageData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="modern-table-empty">No jobs found.</td>
                </tr>
              ) : (
                currentPageData.map((post, index) => (
                  <tr key={post.id}>
                    <td>{offset + index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.role}</td>
                    <td>{post.batches}</td>
                    <td>{post.pay}</td>
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
               {/* Pagination */}
        {jobPost.length > 0 && (
          <div className="inv-pagination-row">
            <div className="inv-pagination-summary">
              Showing {Math.min(jobPost.length, offset + 1)}–{Math.min(jobPost.length, offset + currentPageData.length)} of {jobPost.length}
            </div>

            <div className="inv-pagination-controls" role="navigation" aria-label="Pagination">
              <button
                className="inv-pg-btn"
                onClick={() => setCurrentPage(0)}
                disabled={currentPage === 0}
                aria-label="Go to first page"
              >
                « First
              </button>

              <button
                className="inv-pg-btn"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                aria-label="Previous page"
              >
                ‹ Prev
              </button>

              <div className="inv-pg-pages">
                {Array.from({ length: pageCount }).map((_, i) => {
                  const page = i;
                  const show = page === 0 || page === pageCount - 1 || Math.abs(page - currentPage) <= 2;
                  if (!show) {
                    const nearLeftEllipsis = page === Math.max(1, currentPage - 3);
                    const nearRightEllipsis = page === Math.min(pageCount - 2, currentPage + 3);
                    if (nearLeftEllipsis || nearRightEllipsis) {
                      return <span key={`el-${page}`} className="inv-pg-ellipsis">…</span>;
                    }
                    return null;
                  }
                  return (
                    <button
                      key={page}
                      className={`inv-pg-page ${page === currentPage ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                      aria-label={`Go to page ${page + 1}`}
                    >
                      {page + 1}
                    </button>
                  );
                })}
              </div>

              <button
                className="inv-pg-btn"
                onClick={() => setCurrentPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={currentPage >= pageCount - 1}
                aria-label="Next page"
              >
                Next ›
              </button>

              <button
                className="inv-pg-btn"
                onClick={() => setCurrentPage(pageCount - 1)}
                disabled={currentPage >= pageCount - 1}
                aria-label="Go to last page"
              >
                Last »
              </button>

              <div className="inv-pg-jump">
                <label htmlFor="inv-jump" className="sr-only">Jump to page</label>
                <input
                  id="inv-jump"
                  type="number"
                  min={1}
                  max={pageCount}
                  value={Math.min(pageCount, currentPage + 1)}
                  onChange={(e) => {
                    const v = Number(e.target.value || 1);
                    if (v >= 1 && v <= pageCount) setCurrentPage(v - 1);
                  }}
                  aria-label="Jump to page number"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;