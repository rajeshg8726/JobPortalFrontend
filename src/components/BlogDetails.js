import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Eye,
  User,
  Calendar,
  Heart,
  Share2,
  Bookmark,
  ChevronUp,
  TrendingUp,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import "./BlogDetail.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "react-slugify";
import MarkdownRenderer from "./MarkdownRenderer";
import RelatedPosts from "./RelatedPosts";
import Newsletter from "./Newsletter";
import ShareMenu from "./ShareMenu";

const BlogDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const backendURL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = [
    { id: "interview", name: "Interview Experience", icon: "💼" },
    { id: "system-design", name: "System Design", icon: "🏗️" },
    { id: "problem-solving", name: "Problem Solving", icon: "🧠" },
    { id: "career", name: "Career Advice", icon: "📈" },
    { id: "tutorial", name: "Tutorial", icon: "📚" },
    { id: "technology", name: "Technology", icon: "💻" },
  ];

  const contentTypes = [
    { id: "experience", name: "Experience" },
    { id: "tutorial", name: "Tutorial" },
    { id: "guide", name: "Guide" },
    { id: "tips", name: "Tips & Tricks" },
    { id: "review", name: "Review" },
    { id: "opinion", name: "Opinion" },
  ];

  // Scroll handling
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowScrollTop(currentScrollY > 400);
      setShowFloatingHeader(currentScrollY > 300);

      const article = document.querySelector(".blog-article-wrapper");
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = article.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight || 1);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)));
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch main post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/getBlogPostsByID/${id}`
        );

        const blog = response.data?.blog || response.data;
        let tagsArray = [];
        try {
          tagsArray = blog.tags ? JSON.parse(blog.tags) : [];
        } catch (e) {
          tagsArray = blog.tags ? blog.tags.split(",") : [];
        }

        const normalizedPost = {
          ...blog,
          author: blog.anonymous
            ? "Anonymous User"
            : blog.author || "RGJobs Author",
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

  // Fetch related posts
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        let resp;
        try {
          resp = await axios.get(`${backendURL}/api/getAllBlogPosts`);
        } catch (err) {
          resp = await axios.get(`${backendURL}/api/getPosts`);
        }

        let items = resp?.data?.blogs || resp?.data?.posts || resp?.data || [];
        if (!Array.isArray(items)) items = [];

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

        normalized.sort((a, b) => (b.views || 0) - (a.views || 0));
        setRelatedPosts(normalized.slice(0, 6));
      } catch (error) {
        console.error("Error fetching related posts:", error);
        setRelatedPosts([]);
      }
    };

    fetchRelated();
  }, [backendURL, id]);

  const handleBack = () => navigate("/real-life-interviews-blog-posts");
  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title;
    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryInfo = (categoryId) => {
    return (
      categories.find((cat) => cat.id === categoryId) || {
        name: categoryId?.replace("-", " ") || "",
        icon: "📝",
      }
    );
  };

  const getTypeInfo = (typeId) => {
    return (
      contentTypes.find((type) => type.id === typeId) || { name: typeId || "" }
    );
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="blog-loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-error">
        <div className="blog-error-icon">📖</div>
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleBack} className="blog-btn-primary">
          <ArrowLeft size={20} />
          Return to Blog
        </button>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(post.category);
  const typeInfo = getTypeInfo(post.type);

  return (
    <div className="blog-detail-container">
      {/* Progress Bar */}
      <div className="blog-progress-bar">
        <div
          className="blog-progress-fill"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      {showFloatingHeader && (
        <header className="blog-floating-header">
          <div className="blog-floating-content">
            <button onClick={handleBack} className="blog-back-btn">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            <div className="blog-floating-title">
              <span>{post.title}</span>
            </div>

            <div className="blog-floating-actions" hidden>
              <button
                onClick={handleLike}
                className={`blog-action-btn ${liked ? "active" : ""}`}
                aria-label="Like post"
              >
                <Heart size={20} fill={liked ? "currentColor" : "none"} />
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`blog-action-btn ${bookmarked ? "active" : ""}`}
                aria-label="Bookmark post"
              >
                <Bookmark
                  size={20}
                  fill={bookmarked ? "currentColor" : "none"}
                />
              </button>

              <ShareMenu
                showMenu={showShareMenu}
                setShowMenu={setShowShareMenu}
                handleShare={handleShare}
                copied={copied}
              />
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="blog-main-wrapper">
        <div className="blog-content-grid">
          {/* Article Section */}
          <article className="blog-article-wrapper">
            {/* Hero Section */}
            <div className="blog-hero">
              <div className="blog-hero-back">
                <button onClick={handleBack} className="blog-back-link">
                  <ArrowLeft size={20} />
                  Back to All Articles
                </button>
              </div>

              <div className="blog-hero-meta">
                <span className="blog-category-badge">
                  {categoryInfo.icon} {categoryInfo.name}
                </span>
                {typeInfo.name && (
                  <span className="blog-type-badge">{typeInfo.name}</span>
                )}
              </div>

              <h1 className="blog-title">{post.title}</h1>

              {post.excerpt && (
                <p className="blog-excerpt">{post.excerpt}</p>
              )}

              <div className="blog-meta-stats">
                <div className="blog-meta-item">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="blog-author-avatar"
                  />
                  <span>{post.author}</span>
                </div>
                <div className="blog-meta-item">
                  <Calendar size={16} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="blog-meta-item">
                  <Clock size={16} />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="blog-meta-item">
                  <Eye size={16} />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>

              {post.image && (
                <div className="blog-hero-image">
                  <img
                    src={`${backendURL}/${post.image}`}
                    alt={post.title}
                    loading="eager"
                  />
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="blog-article-content">
              <MarkdownRenderer content={post.content} />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="blog-tags">
                  <h3>Related Topics</h3>
                  <div className="blog-tags-list">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="blog-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Footer Actions */}
              <div className="blog-article-footer">
                <div className="blog-footer-actions">
                  <button
                    onClick={handleLike}
                    className={`blog-footer-btn ${liked ? "active" : ""}`}
                  >
                    <Heart size={20} fill={liked ? "currentColor" : "none"} />
                    <span>
                      {liked ? "Liked" : "Like"} ({post.likes + (liked ? 1 : 0)}
                      )
                    </span>
                  </button>

                  <button
                    onClick={handleBookmark}
                    className={`blog-footer-btn ${bookmarked ? "active" : ""}`}
                  >
                    <Bookmark
                      size={20}
                      fill={bookmarked ? "currentColor" : "none"}
                    />
                    <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
                  </button>

                  <div className="blog-share-wrapper">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="blog-footer-btn"
                    >
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>
                    {showShareMenu && (
                      <div className="blog-share-dropdown">
                        <button onClick={() => handleShare("twitter")}>
                          <Twitter size={18} /> Twitter
                        </button>
                        <button onClick={() => handleShare("facebook")}>
                          <Facebook size={18} /> Facebook
                        </button>
                        <button onClick={() => handleShare("linkedin")}>
                          <Linkedin size={18} /> LinkedIn
                        </button>
                        <button onClick={() => handleShare("copy")}>
                          {copied ? (
                            <Check size={18} />
                          ) : (
                            <Copy size={18} />
                          )}
                          {copied ? "Copied!" : "Copy Link"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div className="blog-sidebar-sticky">
              {/* Related Posts */}
              <RelatedPosts
                posts={relatedPosts}
                backendURL={backendURL}
                navigate={navigate}
              />

              {/* Newsletter */}
              <Newsletter backendURL={backendURL} />
            </div>
          </aside>
        </div>
      </main>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="blog-scroll-top"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default BlogDetail;