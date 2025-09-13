import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import "./adminSide.css"; // keep your existing admin styles
import slugify from "react-slugify";

const PER_PAGE = 8;

const InvUsersExpList = () => {
  const { listURL } = useParams();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        // Decide endpoint depending on route. Adjust names if your API differs.
        let endpoint = "";
        if (listURL === "users-added-blog-posts-list") {
          endpoint = "getAllBlogPosts";
        } else if (listURL === "users-added-interviews-list") {
          endpoint = "getUserAddedInvExps";
        } else if (listURL === "admin-added-interviews-list") {
          endpoint = "getAdminAddedInvExps";
        } else {
          endpoint = "getAllBlogPosts";
        }

        const res = await axios.get(`${backendURL}/api/${endpoint}`);
        // Support several common response shapes
        const payload = res?.data || {};
        let items = payload.blogs || payload.posts || payload.InvData || payload.data || payload;

        if (!Array.isArray(items)) {
          // Sometimes API nests data under a key
          // Try to find the first array value in response
          const maybeArray = Object.values(payload).find((v) => Array.isArray(v));
          items = Array.isArray(maybeArray) ? maybeArray : [];
        }

        // Normalize each item so UI can rely on consistent fields
        const normalized = items.map((p) => {
          const tags =
            p.tags && typeof p.tags === "string"
              ? (() => {
                  try {
                    return JSON.parse(p.tags);
                  } catch (e) {
                    return p.tags.split(",").map((t) => t.trim()).filter(Boolean);
                  }
                })()
              : Array.isArray(p.tags)
              ? p.tags
              : [];

          return {
            id: p.id || p._id || p._id?.$oid || String(p.slug || p.title).slice(0, 8),
            title: p.title || p.heading || p.name || "Untitled",
            slug: p.slug || (p.title && p.title.toLowerCase().replace(/\s+/g, "-")),
            image: p.image || p.cover || "",
            author: p.author || p.name || (p.anonymous ? "Anonymous" : "RGJobs Author"),
            authorEmail: p.email || p.authorEmail || "",
            category: p.category || p.cat || "",
            tags,
            views: p.views || 0,
            likes: p.likes || 0,
            readTime: p.estimated_read_time || p.readTime || "",
            date: p.publish_date || p.date || p.createdAt || "",
            status: p.status || p.approved || "published",
            raw: p,
          };
        });

        setPosts(normalized);
      } catch (err) {
        console.error("Error fetching list:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [listURL, backendURL]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${backendURL}/api/deletePost/${id}`);
      setPosts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (error) {
      console.error(error);
      alert("Delete failed. Check console for details.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-post/${id}`);
  };

  const handlePreview = (slug, id) => {
    // open preview in new tab
    const previewUrl = `/blog-posts-details/${id}/${slugify(slug)}`;
    window.open(previewUrl, "_blank");
  };

  const offset = currentPage * PER_PAGE;
  const currentPageData = posts.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(posts.length / PER_PAGE);

  const formatDate = (d) => {
    if (!d) return "-";
    const dd = new Date(d);
    if (isNaN(dd)) return d;
    return dd.toLocaleDateString();
  };

  // Small UI helpers (inline styles for premium badges/cards)
  const badgeStyle = {
    display: "inline-block",
    padding: "0.2rem 0.5rem",
    marginRight: 6,
    marginBottom: 6,
    background: "linear-gradient(90deg,#eef2ff,#f0f9ff)",
    color: "#0f1724",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  };

  return (
    <div className="modern-table-container" style={{ padding: 16 }}>
      <div className="modern-table-card" style={{ padding: 16, borderRadius: 12, boxShadow: "0 8px 30px rgba(15,23,42,0.06)" }}>
        <h1 className="modern-table-title" style={{ marginBottom: 12 }}>
          {listURL === "users-added-interviews-list"
            ? "User Submitted Interview Experiences"
            : listURL === "users-added-blog-posts-list"
            ? "All Blog Posts"
            : "Admin Content List"}
        </h1>

        {/* Responsive: show table on wide screens, cards on narrow */}
        <div className="modern-table-responsive" style={{ width: "100%" }}>
          {/* Desktop Table */}
          <div className="desktop-only" style={{ display: "block" }}>
            <table className="modern-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e6eef6" }}>
                  <th style={{ padding: "12px 8px", width: 40 }}>#</th>
                  <th style={{ padding: "12px 8px", minWidth: 120 }}>Post</th>
                  <th style={{ padding: "12px 8px", minWidth: 160 }}>Title & Tags</th>
                  <th style={{ padding: "12px 8px", minWidth: 120 }}>Author</th>
                  <th style={{ padding: "12px 8px", width: 110 }}>Category</th>
                  <th style={{ padding: "12px 8px", width: 110 }}>Views / Likes</th>
                  <th style={{ padding: "12px 8px", width: 110 }}>Read / Date</th>
                  <th style={{ padding: "12px 8px", width: 120 }}>Status</th>
                  <th style={{ padding: "12px 8px", width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} style={{ padding: 24, textAlign: "center" }}>
                      Loading...
                    </td>
                  </tr>
                ) : currentPageData.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: 24, textAlign: "center" }}>
                      No entries found.
                    </td>
                  </tr>
                ) : (
                  currentPageData.map((p, idx) => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 8px" }}>{offset + idx + 1}</td>

                      <td style={{ padding: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 88, height: 56, overflow: "hidden", borderRadius: 8, flexShrink: 0, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {p.image ? (
                              <img src={p.image.startsWith("http") ? p.image : `${backendURL}/${p.image}`} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <div style={{ color: "#94a3b8", fontSize: 12 }}>No image</div>
                            )}
                          </div>
                          <div style={{ minWidth: 180 }}>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{p.title}</div>
                            <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{p.slug || "-"}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "12px 8px", verticalAlign: "top" }}>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {p.tags && p.tags.length ? p.tags.slice(0, 5).map((t, i) => <span key={i} style={badgeStyle}>#{t}</span>) : <span style={{ color: "#94a3b8", fontSize: 13 }}>No tags</span>}
                        </div>
                      </td>

                      <td style={{ padding: "12px 8px" }}>
                        <div style={{ fontWeight: 600 }}>{p.author}</div>
                        <div style={{ color: "#64748b", fontSize: 13 }}>{p.authorEmail || "-"}</div>
                      </td>

                      <td style={{ padding: "12px 8px" }}>{p.category || "-"}</td>

                      <td style={{ padding: "12px 8px" }}>
                        <div style={{ display: "flex", gap: 12 }}>
                          <div style={{ color: "#0f1724", fontWeight: 700 }}>{p.views?.toLocaleString?.() ?? p.views}</div>
                          <div style={{ color: "#64748b" }}>views</div>
                          <div style={{ color: "#0f1724", fontWeight: 700 }}>{p.likes}</div>
                          <div style={{ color: "#64748b" }}>likes</div>
                        </div>
                      </td>

                      <td style={{ padding: "12px 8px" }}>
                        <div>{p.readTime ? `${p.readTime} min` : "-"}</div>
                        <div style={{ color: "#64748b", fontSize: 13 }}>{formatDate(p.date)}</div>
                      </td>

                      <td style={{ padding: "12px 8px" }}>
                        <div style={{ textTransform: "capitalize", padding: "6px 10px", borderRadius: 999, background: p.status === "published" || p.status === "approved" ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.12)", color: p.status === "published" || p.status === "approved" ? "#16a34a" : "#b45309", fontWeight: 700, fontSize: 13 }}>
                          {p.status}
                        </div>
                      </td>

                      <td style={{ padding: "12px 8px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="modern-table-action" title="Preview" onClick={() => handlePreview(p.slug, p.id)} style={{ background: "#eef2ff", border: "none", padding: "8px 10px", borderRadius: 8 }}>
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button className="modern-table-action edit" title="Edit" onClick={() => handleEdit(p.id)} style={{ background: "#fff7ed", border: "none", padding: "8px 10px", borderRadius: 8 }}>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="modern-table-action delete" title="Delete" onClick={() => handleDelete(p.id)} style={{ background: "#fff1f2", border: "none", padding: "8px 10px", borderRadius: 8 }}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

                {/* Pagination */}
        {posts.length > 0 && (
          <div className="inv-pagination-row">
            <div className="inv-pagination-summary">
              Showing {Math.min(posts.length, offset + 1)}–{Math.min(posts.length, offset + currentPageData.length)} of {posts.length}
            </div>

            <div className="inv-pagination-controls" role="navigation" aria-label="Pagination">
              <button
                className="inv-pg-btn"
                onClick={() => { if (currentPage > 0) setCurrentPage(0); }}
                disabled={currentPage === 0}
                aria-label="Go to first page"
              >
                « First
              </button>

              <button
                className="inv-pg-btn"
                onClick={() => handlePageClick({ selected: Math.max(0, currentPage - 1) })}
                disabled={currentPage === 0}
                aria-label="Previous page"
              >
                ‹ Prev
              </button>

              {/* page numbers window */}
              <div className="inv-pg-pages">
                {Array.from({ length: pageCount }).map((_, i) => {
                  const page = i;
                  const show = page === 0 || page === pageCount - 1 || Math.abs(page - currentPage) <= 2;
                  if (!show) {
                    // render single ellipsis placeholders when appropriate
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
                onClick={() => handlePageClick({ selected: Math.min(pageCount - 1, currentPage + 1) })}
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

export default InvUsersExpList;