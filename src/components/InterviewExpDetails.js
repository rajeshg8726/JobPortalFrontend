import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Eye,
  User,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import "./BlogDetail.css"; // Import the CSS file
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "react-slugify";

const BlogDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]); // full list
  const backendURL = process.env.REACT_APP_API_URL;
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });

  // Pagination state for related posts
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // newsletter submit
    const response = async () => {
      try {
        const res = await axios.post(
          `${backendURL}/api/subscribeNewsletter`,
          formData
        );
        if (res.data?.status) {
          setFormData({ email: "" });
        } else {
          alert(res.data?.message || "Subscription failed");
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    };
    response();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch main post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/getBlogPostsByID/${id}`
        );

        const blog = response.data?.blog || response.data;
        // Convert tags string → array
        let tagsArray = [];
        try {
          tagsArray = blog.tags ? JSON.parse(blog.tags) : [];
        } catch (e) {
          tagsArray = blog.tags ? blog.tags.split(",") : [];
        }

        const normalizedPost = {
          ...blog,
          author: blog.anonymous ? "Anonymous User" : blog.author || "RGJobs Author",
          authorImage:
            blog.authorImage ||
            (blog.anonymous
              ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"),
          date: blog.publish_date || blog.date,
          readTime: blog.estimated_read_time || blog.readTime,
          tags: tagsArray,
          likes: blog.likes || 0,
          views: blog.views || 0,
          comments: blog.comments || 0,
          id: blog.id || blog._id || id,
        };

        setPost(normalizedPost);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id, backendURL]);

  // Fetch ALL related posts and then paginate client-side (6 per page)
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        // Try dedicated top endpoint, fallback to all posts
        let resp;
        try {
          resp = await axios.get(`${backendURL}/api/getAllBlogPosts`);
        } catch (err) {
          // if that fails, try a common alternative
          resp = await axios.get(`${backendURL}/api/getPosts`);
        }

        let items = resp?.data?.blogs || resp?.data?.posts || resp?.data || [];
        if (!Array.isArray(items)) items = [];

        // Normalize items minimally and exclude current post
        const normalized = items
          .map((p) => ({
            ...p,
            id: p.id || p._id || String(p._id || ""),
            title: p.title || p.heading || "",
            image: p.image || p.cover || "",
            category: p.category || p.tag || "",
            readTime: p.estimated_read_time || p.readTime || 3,
            views: p.views || 0,
          }))
          .filter((p) => String(p.id) !== String(id));

        // sort by views desc (most relevant) — if you prefer random or same-category, change here
        normalized.sort((a, b) => (b.views || 0) - (a.views || 0));

        setRelatedPosts(normalized);
        setCurrentPage(1); // reset to first page when list changes
      } catch (error) {
        console.error("Error fetching related posts:", error);
        setRelatedPosts([]);
      }
    };

    fetchRelated();
  }, [backendURL, id]);

  // Derived pagination values
  const totalPages = Math.max(1, Math.ceil(relatedPosts.length / postsPerPage));
  const pagedRelatedPosts = relatedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector(".blog-detail-content");
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = article.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight || 1);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation
  const handleNavigation = (path) => navigate(path);
  const handleBack = () => handleNavigation("/real-life-interviews-blog-posts");
  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title;
    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="blog-detail-loading">
        <div className="blog-detail-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail-error">
        <h2>Article not found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleBack} className="blog-detail-back-btn">Go Back to Blog</button>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-progress-bar">
        <div className="blog-detail-progress-fill" style={{ width: `${readingProgress}%` }}></div>
      </div>

      <header className="blog-detail-header">
        <div className="blog-detail-header-content">
          <button onClick={handleBack} className="blog-detail-back-button">
            <ArrowLeft className="blog-detail-icon" />
            <span>Back to Blog</span>
          </button>

          <div className="blog-detail-actions">
            <button onClick={handleLike} className={`blog-detail-action-btn ${liked ? "liked" : ""}`}>
              <Heart className="blog-detail-icon" />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>

            <button onClick={handleBookmark} className={`blog-detail-action-btn ${bookmarked ? "bookmarked" : ""}`}>
              <Bookmark className="blog-detail-icon" />
            </button>

            <div className="blog-detail-share-container">
              <button onClick={() => setShowShareMenu(!showShareMenu)} className="blog-detail-action-btn">
                <Share2 className="blog-detail-icon" />
              </button>

              {showShareMenu && (
                <div className="blog-detail-share-menu">
                  <button onClick={() => handleShare("twitter")}>
                    <Twitter className="blog-detail-icon" /> Twitter
                  </button>
                  <button onClick={() => handleShare("facebook")}>
                    <Facebook className="blog-detail-icon" /> Facebook
                  </button>
                  <button onClick={() => handleShare("linkedin")}>
                    <Linkedin className="blog-detail-icon" /> LinkedIn
                  </button>
                  <button onClick={() => handleShare("copy")}>
                    {copied ? <Check className="blog-detail-icon" /> : <Copy className="blog-detail-icon" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="blog-detail-hero">
        <div className="blog-detail-hero-content">
          <div className="blog-detail-category">
            <span className="blog-detail-category-badge">{(post.category || "").replace("-", " ")}</span>
            <span className="blog-detail-type-badge">{post.type || ""}</span>
          </div>

          <h1 className="blog-detail-title">{post.title}</h1>

          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <img src={post.authorImage} alt={post.author} className="blog-detail-author-image" />
              <div className="blog-detail-author-info">
                <span className="blog-detail-author-name">{post.author}</span>
                <div className="blog-detail-meta-items">
                  <div className="blog-detail-meta-item"><Calendar className="blog-detail-meta-icon" /><span>{formatDate(post.date)}</span></div>
                  <div className="blog-detail-meta-item"><Clock className="blog-detail-meta-icon" /><span>{post.readTime} min read</span></div>
                  <div className="blog-detail-meta-item" hidden><Eye className="blog-detail-meta-icon" /><span>{(post.views || 0).toLocaleString()} views</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-detail-hero-image">
          <img src={`${backendURL}/${post.image || ""}`} alt={post.title} />
        </div>
      </div>

      <main className="blog-detail-main">
        <article className="blog-detail-content">
          <div className="blog-detail-article" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="blog-detail-tags">
            <h4>Tags</h4>
            <div className="blog-detail-tags-list">
              {post.tags.map((tag, index) => <span key={index} className="blog-detail-tag">#{tag}</span>)}
            </div>
          </div>

          <div className="blog-detail-author-bio">
            <img src={post.authorImage} alt={post.author} className="blog-detail-author-bio-image" />
            <div className="blog-detail-author-bio-content">
              <h4>{post.author}</h4>
              {/* <p>Software engineer with 5+ years of experience in full-stack development. Passionate about sharing knowledge and helping others break into tech.</p>
              <div className="blog-detail-author-bio-stats"><span>47 articles</span><span>12.5k followers</span><span>2.3k likes</span></div> */}
            </div>
          </div>
        </article>

        <aside className="blog-detail-sidebar">
          <div className="blog-detail-related">
            <h3>Related Articles</h3>
            <div className="blog-detail-related-posts">
              {pagedRelatedPosts.map((relatedPost) => {
                const rid = relatedPost.id || relatedPost._id || Math.random();
                const imageSrc = relatedPost.image && String(relatedPost.image).startsWith("http")
                  ? relatedPost.image
                  : `${backendURL}/${relatedPost.image || ""}`;
                return (
                  <a key={rid} href={`/blog-posts-details/${rid}/${slugify(relatedPost.title)}`} onClick={(e) => { e.preventDefault(); handleNavigation(`/blog-posts-details/${rid}/${slugify(relatedPost.title)}`); }} className="blog-detail-related-post">
                    <img src={imageSrc} alt={relatedPost.title} className="blog-detail-related-image" />
                    <div className="blog-detail-related-content">
                      <span className="blog-detail-related-category">{(relatedPost.category || "").replace("-", " ")}</span>
                      <h4>{relatedPost.title}</h4>
                      <div className="blog-detail-related-meta"><Clock className="blog-detail-icon" /><span>{relatedPost.readTime} min read</span></div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12, alignItems: "center" }}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="blog-detail-action-btn">Prev</button>

                {/* show up to 5 page numbers centered around current page */}
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  // simple window: show if within 2 pages of current or first/last
                  if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`blog-detail-action-btn ${page === currentPage ? "bookmarked" : ""}`}
                        aria-current={page === currentPage ? "page" : undefined}
                      >
                        {page}
                      </button>
                    );
                  }
                  // render ellipsis once between distant pages
                  const shouldRenderEllipsis = (page === currentPage - 3 && page > 1) || (page === currentPage + 3 && page < totalPages);
                  if (shouldRenderEllipsis) {
                    return <span key={`el-${page}`} style={{ padding: "0 6px", color: "var(--text-secondary)" }}>…</span>;
                  }
                  return null;
                })}

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="blog-detail-action-btn">Next</button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="blog-detail-newsletter">
              <h3>Stay Updated</h3>
              <p>Get the latest tech insights and career tips delivered to your inbox.</p>
              <div className="blog-detail-newsletter-form">
                <input type="email" name="email" placeholder="Enter your email" className="blog-detail-newsletter-input" value={formData.email || ""} onChange={handleInputChange} autoComplete="email" required />
                <button type="submit" className="blog-detail-newsletter-btn">Subscribe</button>
              </div>
            </div>
          </form>
        </aside>
      </main>

      <section className="blog-detail-comments">
        <h3>Comments ({comments.length})</h3>
        <div className="blog-detail-comment-form">
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Share your thoughts..." className="blog-detail-comment-textarea" rows="4" />
          <button onClick={handleSubmitComment} className="blog-detail-comment-btn">Post Comment</button>
        </div>

        <div className="blog-detail-comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="blog-detail-comment">
              <img src={comment.authorImage} alt={comment.author} className="blog-detail-comment-avatar" />
              <div className="blog-detail-comment-content">
                <div className="blog-detail-comment-header">
                  <span className="blog-detail-comment-author">{comment.author}</span>
                  <span className="blog-detail-comment-date">{formatDate(comment.date)}</span>
                </div>
                <p className="blog-detail-comment-text">{comment.content}</p>
                <div className="blog-detail-comment-actions">
                  <button className="blog-detail-comment-action"><ThumbsUp className="blog-detail-icon" /><span>{comment.likes}</span></button>
                  <button className="blog-detail-comment-action">Reply</button>
                  {comment.replies > 0 && <button className="blog-detail-comment-replies">View {comment.replies} {comment.replies === 1 ? "reply" : "replies"}</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;