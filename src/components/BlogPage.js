import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Clock,
  User,
  Calendar,
  Filter,
  Plus,
  ArrowRight,
  Bookmark,
  Heart,
  MessageCircle,
  TrendingUp,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import "./ModernBlog.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import slugify from "react-slugify";

const ModernBlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSort, setSelectedSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Topics", count: 0 },
    { id: "interview", name: "Interview Experience", count: 45 },
    { id: "system-design", name: "System Design", count: 32 },
    { id: "problem-solving", name: "Problem Solving", count: 28 },
    { id: "career", name: "Career Advice", count: 19 },
  ];

  const contentTypes = [
    { id: "all", name: "All Types" },
    { id: "experience", name: "Experience" },
    { id: "tutorial", name: "Tutorial" },
    { id: "guide", name: "Guide" },
    { id: "tips", name: "Tips & Tricks" },
  ];

  const backendURL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({ email: "" });

  useEffect(() => {
    const saved = localStorage.getItem("savedBlogPosts");
    if (saved) setSavedPosts(JSON.parse(saved));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitResponse = async () => {
      try {
        const res = await axios.post(
          `${backendURL}/api/subscribeNewsletter`,
          formData
        );
        if (res.data.status) {
          setShowPopup(true);
          setFormData({ email: "" });
          setTimeout(() => setShowPopup(false), 3000);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    };
    submitResponse();
  };

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "Cracking the Google Software Engineer Interview: My Journey",
        excerpt:
          "A comprehensive guide about my experience interviewing at Google, including the technical rounds, behavioral questions, and key insights.",
        category: "interview",
        type: "experience",
        author: "Anonymous User",
        date: "2024-03-15",
        readTime: 8,
        views: 1204,
        likes: 89,
        comments: 23,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
        tags: ["Google", "Software Engineer", "Interview", "FAANG"],
        featured: true,
      },
      {
        id: 2,
        title: "System Design: Building Scalable Chat Applications",
        excerpt:
          "Learn how to design a scalable chat application from scratch, covering database design, real-time messaging, and load balancing strategies.",
        category: "system-design",
        type: "tutorial",
        author: "Tech Expert",
        date: "2024-03-12",
        readTime: 15,
        views: 856,
        likes: 124,
        comments: 41,
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        tags: ["System Design", "Architecture", "Scalability", "Chat"],
        featured: false,
      },
      {
        id: 3,
        title: "LeetCode Hard Problems: Dynamic Programming Patterns",
        excerpt:
          "Master the most common dynamic programming patterns with detailed explanations and code examples for hard-level problems.",
        category: "problem-solving",
        type: "guide",
        author: "Code Master",
        date: "2024-03-10",
        readTime: 12,
        views: 2341,
        likes: 198,
        comments: 67,
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
        tags: ["LeetCode", "Dynamic Programming", "Algorithms", "Coding"],
        featured: true,
      },
      {
        id: 4,
        title: "From Bootcamp to Senior Developer in 3 Years",
        excerpt:
          "My personal journey from coding bootcamp graduate to senior software developer, including challenges, growth strategies, and career pivots.",
        category: "career",
        type: "experience",
        author: "Sarah Chen",
        date: "2024-03-08",
        readTime: 10,
        views: 1876,
        likes: 156,
        comments: 34,
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
        tags: ["Career", "Bootcamp", "Growth", "Experience"],
        featured: false,
      },
      {
        id: 5,
        title: "Microservices Architecture: Best Practices and Pitfalls",
        excerpt:
          "Comprehensive guide on implementing microservices architecture, common mistakes to avoid, and lessons learned from production systems.",
        category: "system-design",
        type: "guide",
        author: "Architecture Pro",
        date: "2024-03-05",
        readTime: 18,
        views: 967,
        likes: 87,
        comments: 29,
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
        tags: ["Microservices", "Architecture", "Best Practices", "DevOps"],
        featured: false,
      },
    ];

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/getAllBlogPosts`);
        const list = res?.data?.blogs || res?.data?.data || res?.data || [];
        
        if (Array.isArray(list) && list.length > 0) {
          const normalized = list.map((b) => {
            let tags = b.tags || [];
            try {
              if (typeof tags === "string") tags = JSON.parse(tags);
            } catch (e) {
              tags = (tags || "")
                .replace(/^\[|\]$/g, "")
                .split(",")
                .map((s) => s.replace(/["']/g, "").trim())
                .filter(Boolean);
            }
            const image =
              b.image && String(b.image).startsWith("http")
                ? b.image
                : b.image
                ? `${backendURL}/${b.image}`
                : "https://via.placeholder.com/800x450?text=No+Image";

            return {
              id: b.id,
              title: b.title,
              excerpt: b.excerpt,
              category: b.category,
              type: b.type,
              author: b.anonymous ? "Anonymous" : b.author || "Author",
              date: b.publish_date || b.created_at || new Date().toISOString(),
              readTime: b.estimated_read_time || b.readTime || 1,
              views: b.views || 0,
              likes: b.likes || 0,
              comments: b.comments || 0,
              image,
              tags: Array.isArray(tags) ? tags : [],
              featured: !!b.featured,
            };
          });
          setBlogData(normalized);
          setFilteredData(normalized);
        } else {
          setBlogData(mockData);
          setFilteredData(mockData);
        }
      } catch (error) {
        console.log("Error fetching blogs:", error);
        setBlogData(mockData);
        setFilteredData(mockData);
      }
    };
    fetchBlogs();
  }, [backendURL]);

  useEffect(() => {
    let filtered = blogData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((post) => post.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort posts
    if (selectedSort === "popular") {
      filtered.sort((a, b) => b.views - a.views);
    } else if (selectedSort === "trending") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (selectedSort === "most-liked") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedCategory, selectedType, searchQuery, blogData, selectedSort]);

  const toggleSavePost = (postId) => {
    const updated = savedPosts.includes(postId)
      ? savedPosts.filter((id) => id !== postId)
      : [...savedPosts, postId];
    setSavedPosts(updated);
    localStorage.setItem("savedBlogPosts", JSON.stringify(updated));
  };

  const handleAddPostClick = () => {
    navigate("/share-blog-posts");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const featuredPosts = filteredData.filter(p => p.featured).slice(0, 2);
  const regularPosts = filteredData.filter(p => !p.featured);

  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="modern-blog-container">
        {/* Enhanced Hero Section */}
        <div className="modern-blog-hero">
          <div className="modern-blog-hero-background">
            <div className="hero-gradient-1"></div>
            <div className="hero-gradient-2"></div>
          </div>
          <div className="modern-blog-hero-content">
            <div className="hero-badge">
              <Sparkles size={14} />
              Explore & Learn
            </div>
            <h1>
              Tech <span className="modern-blog-hero-highlight">Insights</span>{" "}
              Hub
            </h1>
            <p className="modern-blog-hero-subtitle">
              Discover cutting-edge insights, interview experiences, system
              design patterns, and career wisdom from industry professionals
            </p>
            <div className="modern-blog-hero-buttons">
              <button
                onClick={handleAddPostClick}
                className="modern-blog-btn-primary"
              >
                <Plus size={16} />
                Share Your Story
              </button>
              <button className="modern-blog-btn-secondary">
                <TrendingUp size={16} />
                Trending Posts
              </button>
            </div>
          </div>
        </div>

        <div className="modern-blog-main">
          {/* Search and Filters */}
          <div className="modern-blog-search-section">
            <div className="modern-blog-search-header">
              <div className="modern-blog-search-container">
                <Search className="modern-blog-search-icon" />
                <input
                  type="text"
                  placeholder="Search posts, tags, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="modern-blog-search-input"
                />
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="modern-blog-filter-toggle"
                title="Toggle filters"
              >
                <Filter size={16} />
                <span>Filters</span>
                {isFilterOpen && <X size={14} />}
              </button>
            </div>

            {isFilterOpen && (
              <div className="modern-blog-filters active">
                <div className="modern-blog-filter-grid">
                  <div className="modern-blog-filter-group">
                    <label className="modern-blog-filter-label">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="modern-blog-filter-select"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modern-blog-filter-group">
                    <label className="modern-blog-filter-label">
                      Content Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="modern-blog-filter-select"
                    >
                      {contentTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modern-blog-filter-group">
                    <label className="modern-blog-filter-label">Sort By</label>
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="modern-blog-filter-select"
                    >
                      <option value="latest">Latest Posts</option>
                      <option value="popular">Most Popular</option>
                      <option value="trending">Trending</option>
                      <option value="most-liked">Most Liked</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="modern-blog-featured">
              <div className="modern-blog-section-header">
                <h2 className="modern-blog-section-title">
                  <TrendingUp size={18} />
                  Featured Posts
                </h2>
              </div>
              <div className="modern-blog-featured-grid">
                {featuredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="modern-blog-featured-card"
                    onClick={() =>
                      handleNavigation(
                        `/blog-posts-details/${post.id}/${slugify(post.title)}`
                      )
                    }
                    role="button"
                    tabIndex={0}
                  >
                    <div className="modern-blog-featured-image-container">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="modern-blog-featured-image"
                        loading="lazy"
                      />
                      <div className="modern-blog-featured-overlay"></div>
                      <div className="modern-blog-featured-badge">
                        <Sparkles size={12} />
                        Featured
                      </div>
                      <button
                        className="featured-save-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavePost(post.id);
                        }}
                        title="Save post"
                      >
                        <Bookmark
                          size={16}
                          fill={savedPosts.includes(post.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                    <div className="modern-blog-featured-content">
                      <div className="modern-blog-post-meta">
                        <span className="modern-blog-category-badge">
                          {(post.category || "").replace("-", " ")}
                        </span>
                        <div className="modern-blog-meta-item">
                          <Clock size={14} />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                      <h3 className="modern-blog-post-title">{post.title}</h3>
                      <p className="modern-blog-post-excerpt">{post.excerpt}</p>
                      <div className="modern-blog-post-footer">
                        <div className="modern-blog-author-info">
                          <div className="modern-blog-meta-item">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                          <div className="modern-blog-meta-item">
                            <Calendar size={14} />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>
                        <div className="engagement-stats">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="modern-blog-regular">
            <div className="modern-blog-posts-header">
              <h2 className="modern-blog-section-title">Latest Posts</h2>
              <span className="modern-blog-posts-count">
                {filteredData.length} post{filteredData.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {currentPosts.length > 0 ? (
              <div className="modern-blog-posts-grid">
                {currentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="modern-blog-post-card"
                    onClick={() =>
                      handleNavigation(
                        `/blog-posts-details/${post.id}/${slugify(post.title)}`
                      )
                    }
                    role="button"
                    tabIndex={0}
                  >
                    <div className="modern-blog-post-image-container">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="modern-blog-post-image"
                        loading="lazy"
                      />
                      <div className="modern-blog-post-category">
                        {(post.category || "").replace("-", " ")}
                      </div>
                      <button
                        className="post-save-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavePost(post.id);
                        }}
                        title="Save post"
                      >
                        <Bookmark
                          size={14}
                          fill={savedPosts.includes(post.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                    <div className="modern-blog-post-body">
                      <div className="modern-blog-post-meta-small">
                        <div className="modern-blog-meta-item">
                          <Clock size={13} />
                          <span>{post.readTime} min read</span>
                        </div>
                        <div className="modern-blog-meta-item">
                          <Eye size={13} />
                          <span>{Number(post.views).toLocaleString()} views</span>
                        </div>
                      </div>
                      <h3 className="modern-blog-post-title-small">
                        {post.title}
                      </h3>
                      <p className="modern-blog-post-excerpt-small">
                        {post.excerpt}
                      </p>
                      <div className="modern-blog-post-tags">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="modern-blog-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="modern-blog-post-stats">
                        <div className="modern-blog-post-author">
                          <User size={13} />
                          <span>{post.author}</span>
                        </div>
                        <div className="modern-blog-post-engagement">
                          <span>
                            <Heart size={13} /> {Number(post.likes).toLocaleString()}
                          </span>
                          <span>
                            <MessageCircle size={13} /> {Number(post.comments).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="modern-blog-no-posts">
                <Search size={48} />
                <h3>No posts found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="modern-blog-pagination">
              <div className="modern-blog-pagination-container">
                <button
                  className="modern-blog-pagination-btn"
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  title="Previous page"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="modern-blog-pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`modern-blog-pagination-btn ${
                          page === currentPage ? "active" : ""
                        }`}
                        onClick={() => paginate(page)}
                        title={`Go to page ${page}`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="modern-blog-pagination-btn"
                  onClick={() =>
                    currentPage < totalPages && paginate(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  title="Next page"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <form onSubmit={handleSubmit}>
          <div className="modern-blog-newsletter">
            <div className="newsletter-gradient"></div>
            <div className="modern-blog-newsletter-content">
              <h3>Stay Updated</h3>
              <p>
                Get the latest insights and career tips delivered to your inbox
              </p>
              <div className="modern-blog-newsletter-form">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="modern-blog-newsletter-input"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                />
                <button className="modern-blog-newsletter-btn" type="submit">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup-overlay active">
          <div className="popup-card">
            <div className="popup-icon">✓</div>
            <h2 className="popup-title">Subscribed!</h2>
            <p className="popup-message">
              Thank you for subscribing! You'll receive the latest updates
              directly in your inbox.
            </p>
            <button
              className="popup-btn"
              onClick={() => setShowPopup(false)}
            >
              Great!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernBlogPage;