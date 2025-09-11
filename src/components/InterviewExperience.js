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
  Link,
} from "lucide-react";
import "./ModernBlog.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";
import slugify from "react-slugify";


const ModernBlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  


  // Mock data - replace with your API calls
  const categories = [
    { id: "all", name: "All Topics", count: 124 },
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

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const response = async () => {
      try {
        const res = await axios.post(
          `${backendURL}/api/subscribeNewsletter`,
          formData
        );
        if (res.data.status) {
          // Show success message or perform any other actions
          setShowPopup(true);
          setFormData({ email: "" });
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    };
    response();
  };

  // Mock blog posts data
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

    const response = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/getAllBlogPosts`);

        // Resiliently extract list from various API shapes
        const list = res?.data?.blogs || res?.data?.data || res?.data || [];
        if (Array.isArray(list) && list.length > 0) {
          // Normalize backend blog object to UI shape
          const normalized = list.map((b) => {
            // parse tags if string
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
            // image handling (relative path -> full url)
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
              raw: b,
            };
          });
          setBlogData(normalized);
          setFilteredData(normalized);
        } else {
          // fallback to mock if API returns nothing
          setBlogData(mockData);
          setFilteredData(mockData);
        }
      } catch (error) {
        console.log("Error in fetching blogs data", error);
        setBlogData(mockData);
        setFilteredData(mockData);
      }
    };
    response();
  }, [backendURL]);

  // Filter and search logic
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

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedCategory, selectedType, searchQuery, blogData]);

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

  const featuredPosts =
    filteredData.length > 0
      ? filteredData.slice(0, 2) // ✅ take first two as featured
      : [];

  const regularPosts =
    filteredData.length > 2
      ? filteredData.slice(2) // ✅ remaining as regular
      : [];

      // Pagination setup
    const postsPerPage = 6;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(regularPosts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    // scroll to top on mount when page changes
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [regularPosts]);


  return (
    <>
      <div className="modern-blog-container">
        {/* Hero Section */}
        <div className="modern-blog-hero">
          <div className="modern-blog-hero-content">
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
                <Plus className="modern-blog-btn-icon" />
                Share Your Story
              </button>
              <button className="modern-blog-btn-secondary">
                <TrendingUp className="modern-blog-btn-icon" />
                Trending Posts
              </button>
            </div>
          </div>
        </div>

        <div className="modern-blog-main">
          {/* Search and Filters */}
          <div className="modern-blog-search-section">
            <div className="modern-blog-search-header">
              {/* Search Bar */}
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

              {/* Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="modern-blog-filter-toggle"
              >
                <Filter className="modern-blog-filter-icon" />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            <div
              className={`modern-blog-filters ${isFilterOpen ? "" : "hidden"}`}
            >
              <div className="modern-blog-filter-grid">
                {/* Categories */}
                <div className="modern-blog-filter-group">
                  <label className="modern-blog-filter-label">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="modern-blog-filter-select"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content Type */}
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

                {/* Sort Options */}
                <div className="modern-blog-filter-group">
                  <label className="modern-blog-filter-label">Sort By</label>
                  <select className="modern-blog-filter-select">
                    <option value="latest">Latest Posts</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                    <option value="most-liked">Most Liked</option>
                  </select>
                </div>

                {/* Time Filter */}
                <div className="modern-blog-filter-group">
                  <label className="modern-blog-filter-label">
                    Time Period
                  </label>
                  <select className="modern-blog-filter-select">
                    <option value="all">All Time</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="modern-blog-featured">
              <div className="modern-blog-section-header">
                <h2 className="modern-blog-section-title">
                  <TrendingUp className="modern-blog-section-icon" />
                  Featured Posts
                </h2>
              </div>
              <div className="modern-blog-featured-grid">
                {featuredPosts.slice(0, 2).map((post) => (
                  <a
                    key={post.id}
                    href={`/blog-posts-details/${post.id}/${slugify(
                      post.title
                    )}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(
                        `/blog-posts-details/${post.id}/${slugify(post.title)}`
                      );
                    }}
                    className="modern-blog-featured-card"
                  >
                    <div className="modern-blog-featured-image-container">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="modern-blog-featured-image"
                      />
                      <div className="modern-blog-featured-overlay"></div>
                      <div className="modern-blog-featured-badge">Featured</div>
                    </div>
                    <div className="modern-blog-featured-content">
                      <div className="modern-blog-post-meta">
                        <span className="modern-blog-category-badge">
                          {(post.category || "").replace("-", " ")}
                        </span>
                        <div className="modern-blog-meta-item">
                          <Clock className="modern-blog-meta-icon" />
                          <span>{post.readTime} min read</span>
                        </div>
                        <div className="modern-blog-meta-item">
                          <Eye className="modern-blog-meta-icon" />
                          <span>
                            {Number(post.views || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <h3 className="modern-blog-post-title">{post.title}</h3>
                      <p className="modern-blog-post-excerpt">{post.excerpt}</p>
                      <div className="modern-blog-post-footer">
                        <div className="modern-blog-author-info">
                          <div className="modern-blog-meta-item">
                            <User className="modern-blog-meta-icon" />
                            <span>{post.author}</span>
                          </div>
                          <div className="modern-blog-meta-item">
                            <Calendar className="modern-blog-meta-icon" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>
                        <ArrowRight className="modern-blog-arrow-icon" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="modern-blog-regular">
            <div className="modern-blog-posts-header">
              <h2 className="modern-blog-section-title">Latest Posts</h2>
              <span className="modern-blog-posts-count">
                {filteredData.length} post{filteredData.length !== 1 ? "s" : ""}{" "}
                found
              </span>
            </div>

            <div className="modern-blog-posts-grid">
              {currentPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/blog-posts-details/${post.id}/${slugify(post.title)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(
                      `/blog-posts-details/${post.id}/${slugify(post.title)}`
                    );
                  }}
                  className="modern-blog-post-card"
                >
                  <div className="modern-blog-post-image-container">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="modern-blog-post-image"
                    />
                    <div className="modern-blog-post-category">
                      {(post.category || "").replace("-", " ")}
                    </div>
                  </div>
                  <div className="modern-blog-post-body">
                    <div className="modern-blog-post-meta-small">
                      <div className="modern-blog-meta-item">
                        <Clock className="modern-blog-meta-icon" />
                        <span>{post.readTime} min</span>
                      </div>
                      <div className="modern-blog-meta-item">
                        <Eye className="modern-blog-meta-icon" />
                        <span>{Number(post.views || 0).toLocaleString()}</span>
                      </div>
                    </div>
                    <h3 className="modern-blog-post-title-small">
                      {post.title}
                    </h3>
                    <p className="modern-blog-post-excerpt-small">
                      {post.excerpt}
                    </p>
                    <div className="modern-blog-post-tags">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="modern-blog-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="modern-blog-post-stats">
                      <div className="modern-blog-post-author">
                        <div className="modern-blog-meta-item">
                          <User className="modern-blog-meta-icon" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <div className="modern-blog-post-engagement">
                        <div className="modern-blog-engagement-item">
                          <Heart className="modern-blog-meta-icon" />
                          <span>
                            {Number(post.likes || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="modern-blog-engagement-item">
                          <MessageCircle className="modern-blog-meta-icon" />
                          <span>
                            {Number(post.comments || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="modern-blog-pagination">
              <div className="modern-blog-pagination-container">
                <button
                  className="modern-blog-pagination-btn"
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className="modern-blog-pagination-numbers">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      className={`modern-blog-pagination-btn ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => paginate(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="modern-blog-pagination-btn"
                  onClick={() =>
                    currentPage < totalPages && paginate(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <form onSubmit={handleSubmit}>
          <div className="modern-blog-newsletter">
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
                  autoComplete="on"
                />
                <button className="modern-blog-newsletter-btn">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ✅ Conditional Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-icon">✅</div>
            <h2 className="popup-title">Subscribed!</h2>
            <p className="popup-message">
              Thank you for subscribing to our newsletter! <br />
              You will now receive the latest updates and insights directly to
              your inbox.
            </p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>
              Okay, Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernBlogPage;
