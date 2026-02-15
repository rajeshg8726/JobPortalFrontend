import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./adminSide.css";
import { useParams } from "react-router-dom";

const PER_PAGE = 10;

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;
  const { userFeedbackAndEmails } = useParams();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
  }, [navigate]);


  useEffect(() => {
    const getUserFeedbackAndEmails = async () => {
      setLoading(true);
      let endpoint = "";
      try {
        switch (userFeedbackAndEmails) {
          case "user-feedback-list":
            endpoint = "getContacts";
            break;
          case "user-emailsubscriber-list":
            endpoint = "getAllUserSubscriberForEmailNotify";
            break;
          default:
            endpoint = "getContacts";
        }
          const res = await axios.get(`${backendURL}/api/${endpoint}`);
          // normalize response payloads — different endpoints return different shapes
          let items = [];
          if (Array.isArray(res.data)) items = res.data;
          else if (Array.isArray(res.data.feedbackData)) items = res.data.feedbackData;
          else if (Array.isArray(res.data.subscribers)) items = res.data.subscribers;
          else items = [];

          const normalized = items.map((it) => ({
            id: it.id || it._id || it.feedbackId || null,
            name: it.name || it.fullName || it.username || it.contactName || "",
            email: it.email || it.email || it.email || "",
            message: it.message || it.msg || it.content || it.note || "",
            created_at : it.created_at || "",
            raw: it,
          }));

          setFeedbacks(normalized);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getUserFeedbackAndEmails();
  }, [backendURL, userFeedbackAndEmails]);



  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?"))
      return;
    try {
      await axios.delete(`${backendURL}/api/deleteFeedback/${id}`);
      setFeedbacks((prev) => {
        const next = prev.filter((item) => String(item.id) !== String(id));
        // clamp current page in case deletion made current page empty
        const nextPageCount = Math.max(1, Math.ceil(next.length / PER_PAGE));
        if (currentPage >= nextPageCount) setCurrentPage(nextPageCount - 1);
        return next;
      });
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-job/${id}`);
  };

  const offset = currentPage * PER_PAGE;
  const currentPageData = feedbacks.slice(offset, offset + PER_PAGE);
  const pageCount = Math.max(0, Math.ceil(feedbacks.length / PER_PAGE));

  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };


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
                <th>Date</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="modern-table-loading">
                    Loading...
                  </td>
                </tr>
              ) : currentPageData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="modern-table-empty">
                    No feedback found.
                  </td>
                </tr>
              ) : (
                currentPageData.map((post, index) => (
                  <tr key={post.id}>
                    <td>{offset + index + 1}</td>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>{post.message}</td>
                    <td>{formatDate(post.created_at)}</td>
                    <td>
                      <button
                        className="modern-table-action edit"
                        onClick={() => handleEdit(post.id)}
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="modern-table-action delete"
                        onClick={() => handleDelete(post.id)}
                        title="Delete"
                      >
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
        {pageCount > 0 && (
          <div className="inv-pagination-row">
            <div className="inv-pagination-summary">
              Showing {feedbacks.length === 0 ? 0 : offset + 1}–{offset + currentPageData.length} of {feedbacks.length}
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

export default FeedbackTable;
