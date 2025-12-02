import React from "react";
import { TrendingUp, Clock, Eye, ArrowRight } from "lucide-react";
import slugify from "react-slugify";
import "./RelatedPosts.css";

const RelatedPosts = ({ posts, backendURL, navigate }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="related-posts-section">
        <h3 className="related-posts-title">
          <TrendingUp size={20} />
          Related Articles
        </h3>
        <div className="related-posts-empty">
          <p>No related articles found.</p>
        </div>
      </div>
    );
  }

  const handlePostClick = (e, post) => {
    e.preventDefault();
    const rid = post.id || post._id;
    navigate(`/blog-posts-details/${rid}/${slugify(post.title)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="related-posts-section">
      <div className="related-posts-header">
        <h3 className="related-posts-title">
          <TrendingUp size={20} />
          Related Articles
        </h3>
        <p className="related-posts-subtitle">
          Continue reading similar content
        </p>
      </div>

      <div className="related-posts-grid">
        {posts.map((post) => {
          const rid = post.id || post._id || Math.random();
          const imageSrc =
            post.image && String(post.image).startsWith("http")
              ? post.image
              : `${backendURL}/${post.image || ""}`;

          return (
            <a
              key={rid}
              href={`/blog-posts-details/${rid}/${slugify(post.title)}`}
              onClick={(e) => handlePostClick(e, post)}
              className="related-post-card"
            >
              <div className="related-post-image-container">
                <img 
                  src={imageSrc} 
                  alt={post.title}
                  className="related-post-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="related-post-overlay">
                  <ArrowRight size={24} className="related-post-arrow" />
                </div>
              </div>

              <div className="related-post-content">
                {post.category && (
                  <span className="related-post-category">
                    {post.category.replace("-", " ").toUpperCase()}
                  </span>
                )}

                <h4 className="related-post-title">{post.title}</h4>

                {post.excerpt && (
                  <p className="related-post-excerpt">
                    {post.excerpt.substring(0, 100)}
                    {post.excerpt.length > 100 ? "..." : ""}
                  </p>
                )}

                <div className="related-post-meta">
                  <div className="related-post-meta-item">
                    <Clock size={14} />
                    <span>{post.readTime || 5} min read</span>
                  </div>
                  {post.views > 0 && (
                    <div className="related-post-meta-item">
                      <Eye size={14} />
                      <span>{post.views.toLocaleString()} views</span>
                    </div>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;