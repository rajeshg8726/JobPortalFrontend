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
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  ChevronUp,
  Tag,
  Sparkles,
  TrendingUp,
  Users,
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import "./BlogDetail.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "react-slugify";

const ConsistentBlogDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const backendURL = process.env.REACT_APP_API_URL;
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });

  // Pagination state for related posts
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: "interview", name: "Interview Experience", icon: "💤" },
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendURL}/api/subscribeNewsletter`,
        formData
      );
      if (res.data?.status) {
        setFormData({ email: "" });
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-toast';
        successMsg.textContent = 'Successfully subscribed to newsletter!';
        document.body.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 3000);
      } else {
        alert(res.data?.message || "Subscription failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  // Enhanced scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show scroll to top button
      setShowScrollTop(currentScrollY > 400);
      
      // Detect scroll direction
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);

      // Reading progress
      const article = document.querySelector(".consistent-blog-article");
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
  }, [lastScrollY]);


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
        setRelatedPosts(normalized);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching related posts:", error);
        setRelatedPosts([]);
      }
    };

    fetchRelated();
  }, [backendURL, id]);

  // Pagination
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

  // Navigation
  const handleNavigation = (path) => navigate(path);
  const handleBack = () => handleNavigation("/real-life-interviews-blog-posts");
  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

  // Markdown parsing function to convert markdown to HTML
  const parseMarkdown = (markdown) => {
    if (!markdown || typeof markdown !== 'string') return '';
    
    let html = markdown;
    
    // Headers (h1-h6)
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    html = html.replace(/^##### (.*$)/gm, '<h5>$1</h5>');
    html = html.replace(/^###### (.*$)/gm, '<h6>$1</h6>');
    
    // Bold and Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\_\_\_(.*?)\_\_\_/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');
    html = html.replace(/\_(.*?)\_/g, '<em>$1</em>');
    
    // Code blocks (triple backticks)
    html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
      return `<pre class="code-block" data-language="${lang || 'text'}"><code>${code.trim()}</code></pre>`;
    });
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="markdown-image" />');
    
    // Unordered lists
    html = html.replace(/^\* (.+)/gm, '<li>$1</li>');
    html = html.replace(/^- (.+)/gm, '<li>$1</li>');
    html = html.replace(/^(\+ .+)/gm, '<li>$1</li>');
    
    // Ordered lists
    html = html.replace(/^\d+\. (.+)/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in ul/ol tags
    html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
      return `<ul>${match}</ul>`;
    });
    
    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr class="markdown-hr" />');
    html = html.replace(/^\*\*\*$/gm, '<hr class="markdown-hr" />');
    
    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
    
    // Tables
    html = html.replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map(cell => cell.trim());
      const cellTags = cells.map(cell => `<td>${cell}</td>`).join('');
      return `<tr>${cellTags}</tr>`;
    });
    
    // Wrap table rows in table tags
    html = html.replace(/(<tr>.*<\/tr>)/gs, (match) => {
      return `<table class="markdown-table">${match}</table>`;
    });
    
    // Alert boxes (custom syntax)
    html = html.replace(/^!!! (info|warning|success|danger) (.*)$/gm, (match, type, content) => {
      const icons = {
        info: 'Info',
        warning: 'AlertTriangle', 
        success: 'CheckCircle',
        danger: 'AlertTriangle'
      };
      return `<div class="alert alert-${type}"><span class="alert-icon">${icons[type]}</span>${content}</div>`;
    });
    
    // Line breaks (double spaces or double newlines)
    html = html.replace(/  \n/g, '<br>');
    html = html.replace(/\n\n/g, '</p><p>');
    
    // Wrap in paragraphs if not already wrapped
    if (!html.includes('<p>') && !html.includes('<h') && !html.includes('<ul>') && !html.includes('<ol>')) {
      html = `<p>${html}</p>`;
    }
    
    // Clean up extra paragraph tags
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<blockquote>)/g, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>|<ol>)/g, '$1');
    html = html.replace(/(<\/ul>|<\/ol>)<\/p>/g, '$1');
    html = html.replace(/<p>(<div class="alert)/g, '$1');
    html = html.replace(/(<\/div>)<\/p>/g, '$1');
    html = html.replace(/<p>(<hr)/g, '$1');
    html = html.replace(/(<\/hr>)<\/p>/g, '$1');

    // final cleanup and return the generated HTML
    return html;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || 
           { name: categoryId?.replace("-", " ") || "", icon: "📝" };
  };

  const getTypeInfo = (typeId) => {
    return contentTypes.find(type => type.id === typeId) || 
           { name: typeId || "" };
  };

  if (loading) {
    return (
      <div className="consistent-loading-container">
        <div className="consistent-loading-content">
          <div className="consistent-spinner"></div>
          <div className="consistent-loading-text">
            <h3>Loading Article</h3>
            <p>Preparing your reading experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="consistent-error-container">
        <div className="consistent-error-content">
          <div className="consistent-error-icon">📖</div>
          <h2>Article Not Found</h2>
          <p>The article you're looking for doesn't exist or has been removed.</p>
          <button onClick={handleBack} className="consistent-back-btn">
            <ArrowLeft className="consistent-icon" />
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(post.category);
  const typeInfo = getTypeInfo(post.type);

  return (
    <div className="consistent-blog-container">
      {/* Enhanced Progress Bar */}
      <div className="consistent-progress-bar">
        <div 
          className="consistent-progress-fill" 
          style={{ width: `${readingProgress}%` }}
        >
          <div className="consistent-progress-glow"></div>
        </div>
      </div>

      {/* Floating Header */}
      <header className={`consistent-header ${isScrollingUp || readingProgress < 5 ? 'visible' : 'hidden'}`}>
        <div className="consistent-header-content">
          <button onClick={handleBack} className="consistent-back-button">
            <ArrowLeft className="consistent-icon" />
            <span>Back to Blog</span>
          </button>

          <div className="consistent-header-title">
            {readingProgress > 20 && (
              <span className="consistent-mini-title">{post.title}</span>
            )}
          </div>

          <div className="consistent-header-actions">
            <button 
              onClick={handleLike} 
              className={`consistent-action-btn ${liked ? "liked" : ""}`}
            >
              <Heart className="consistent-icon" />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>

            <button 
              onClick={handleBookmark} 
              className={`consistent-action-btn ${bookmarked ? "bookmarked" : ""}`}
            >
              <Bookmark className="consistent-icon" />
            </button>

            <div className="consistent-share-container">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)} 
                className="consistent-action-btn"
              >
                <Share2 className="consistent-icon" />
              </button>

              {showShareMenu && (
                <div className="consistent-share-menu">
                  <button onClick={() => handleShare("twitter")}>
                    <Twitter className="consistent-icon" /> Twitter
                  </button>
                  <button onClick={() => handleShare("facebook")}>
                    <Facebook className="consistent-icon" /> Facebook
                  </button>
                  <button onClick={() => handleShare("linkedin")}>
                    <Linkedin className="consistent-icon" /> LinkedIn
                  </button>
                  <button onClick={() => handleShare("copy")}>
                    {copied ? <Check className="consistent-icon" /> : <Copy className="consistent-icon" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Matching Preview Layout */}
      <div className="consistent-main-content">
        <div className="consistent-preview-content">
          {/* Preview Hero - Exact match with preview styling */}
          <div className="consistent-preview-hero">
            {post.image && (
              <img
                src={`${backendURL}/${post.image}`}
                alt={post.title}
                className="consistent-preview-image"
              />
            )}
            <div className="consistent-preview-meta">
              <span className="consistent-preview-category">
                {categoryInfo.icon} {categoryInfo.name}
              </span>
              {typeInfo.name && (
                <span className="consistent-preview-type">
                  {typeInfo.name}
                </span>
              )}
            </div>
            <h1 className="consistent-preview-title">
              {post.title}
            </h1>
            <div className="consistent-preview-stats">
              <span>
                <User className="consistent-icon" /> {post.author}
              </span>
              <span>
                <Clock className="consistent-icon" /> {post.readTime} min read
              </span>
              <span>
                <Calendar className="consistent-icon" /> {formatDate(post.date)}
              </span>
              <span>
                <Eye className="consistent-icon" /> {post.views.toLocaleString()} views
              </span>
            </div>
          </div>

          {/* Preview Article - Exact match with preview styling */}
          <div className="consistent-preview-article">
            {post.excerpt && (
              <p className="consistent-preview-excerpt">
                {post.excerpt}
              </p>
            )}
            <div className="consistent-preview-body">
              <div 
                className="consistent-article-content markdown-content"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
              />
            </div>
            {post.tags.length > 0 && (
              <div className="consistent-preview-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="consistent-preview-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <aside className="consistent-sidebar">
          {/* Related Posts */}
          <div className="consistent-related-section">
            <h3 className="consistent-section-title">
              <TrendingUp className="consistent-icon" />
              Related Articles
            </h3>
            
            <div className="consistent-related-posts">
              {pagedRelatedPosts.map((relatedPost) => {
                const rid = relatedPost.id || relatedPost._id || Math.random();
                const imageSrc = relatedPost.image && String(relatedPost.image).startsWith("http")
                  ? relatedPost.image
                  : `${backendURL}/${relatedPost.image || ""}`;
                
                return (
                  <a 
                    key={rid} 
                    href={`/blog-posts-details/${rid}/${slugify(relatedPost.title)}`}
                    onClick={(e) => { 
                      e.preventDefault(); 
                      handleNavigation(`/blog-posts-details/${rid}/${slugify(relatedPost.title)}`); 
                    }} 
                    className="consistent-related-card"
                  >
                    <div className="consistent-related-image">
                      <img src={imageSrc} alt={relatedPost.title} />
                      <div className="consistent-related-overlay"></div>
                    </div>
                    <div className="consistent-related-content">
                      <span className="consistent-related-category">
                        {(relatedPost.category || "").replace("-", " ")}
                      </span>
                      <h4>{relatedPost.title}</h4>
                      <div className="consistent-related-meta">
                        <Clock className="consistent-icon" />
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="consistent-pagination">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="consistent-pagination-btn"
                >
                  Previous
                </button>
                
                <div className="consistent-pagination-numbers">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`consistent-pagination-number ${page === currentPage ? "active" : ""}`}
                        >
                          {page}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>

                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="consistent-pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Newsletter */}
          <div className="consistent-newsletter">
            <div className="consistent-newsletter-header">
              <h3>Stay Updated</h3>
              <p>Join thousands of readers getting premium insights delivered weekly.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="consistent-newsletter-form">
              <div className="consistent-input-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email address"
                  className="consistent-newsletter-input"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="consistent-newsletter-btn">
                  Subscribe
                </button>
              </div>
              <p className="consistent-newsletter-disclaimer">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </aside>
      </div>

      {/* Comments Section */}
      <section className="consistent-comments-section">
        <div className="consistent-comments-header">
          <h3>Join the Discussion</h3>
          <span className="consistent-comments-count">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>

        <div className="consistent-comment-form">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts and insights..."
            className="consistent-comment-textarea"
            rows="4"
          />
          <div className="consistent-comment-form-actions">
            <button onClick={handleSubmitComment} className="consistent-comment-btn">
              Post Comment
            </button>
          </div>
        </div>

        {comments.length > 0 && (
          <div className="consistent-comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="consistent-comment">
                <div className="consistent-comment-avatar">
                  <img src={comment.authorImage} alt={comment.author} />
                </div>
                <div className="consistent-comment-content">
                  <div className="consistent-comment-header">
                    <span className="consistent-comment-author">{comment.author}</span>
                    <span className="consistent-comment-date">{formatDate(comment.date)}</span>
                  </div>
                  <p className="consistent-comment-text">{comment.content}</p>
                  <div className="consistent-comment-actions">
                    <button className="consistent-comment-action">
                      <ThumbsUp className="consistent-icon" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="consistent-comment-action">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="consistent-scroll-top"
          aria-label="Scroll to top"
        >
          <ChevronUp className="consistent-icon" />
        </button>
      )}
    </div>
  );
};

export default ConsistentBlogDetail;