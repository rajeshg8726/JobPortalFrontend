import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Image as ImageIcon,
  X,
  Plus,
  Hash,
  Type,
  AlignLeft,
  Bold,
  Italic,
  List,
  Link,
  Quote,
  Code,
  Heading,
  Calendar,
  Clock,
  User,
  Tag,
  FileText,
  Sparkles,
} from "lucide-react";
import "./CreateBlogPost.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import BlogSubmitPopup from "./BlogSubmitPopup";

const CreateBlogPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    type: "",
    tags: [],
    featuredImage: null,
    estimatedReadTime: 0,
    publishDate: new Date().toISOString().split("T")[0],
    status: 0, // 0 = draft, 1 = published
    anonymous: false,
  });

  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const backendURL = process.env.REACT_APP_API_URL; // <-- change to your backend URL if different

  const categories = [
    { id: "interview", name: "Interview Experience", icon: "👤" },
    { id: "system-design", name: "System Design", icon: "🏗️" },
    { id: "problem-solving", name: "Problem Solving", icon: "🧠" },
    { id: "career", name: "Career Advice", icon: "📈" },
    { id: "tutorial", name: "Tutorial", icon: "📚" },
    { id: "technology", name: "Technology", icon: "💻" },
  ];

  const contentTypes = [
    {
      id: "experience",
      name: "Experience",
      desc: "Personal experiences and stories",
    },
    {
      id: "tutorial",
      name: "Tutorial",
      desc: "Step-by-step guides and how-tos",
    },
    {
      id: "guide",
      name: "Guide",
      desc: "Comprehensive guides and best practices",
    },
    {
      id: "tips",
      name: "Tips & Tricks",
      desc: "Quick tips and helpful tricks",
    },
    { id: "review", name: "Review", desc: "Reviews and comparisons" },
    { id: "opinion", name: "Opinion", desc: "Thoughts and opinions on topics" },
  ];

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
    // Replace with your navigation logic
  };

  const handleBack = () => {
    navigate("/real-life-interviews-blog-posts");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Calculate estimated read time based on content (fixed word count for empty string)
    if (field === "content") {
      const trimmed = value.trim();
      const words = trimmed ? trimmed.split(/\s+/).length : 0;
      const readTime = Math.ceil(words / 200); // Average reading speed
      setFormData((prev) => ({
        ...prev,
        estimatedReadTime: readTime,
      }));
    }
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData((prev) => ({
          ...prev,
          featuredImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const addTag = (e) => {
    e.preventDefault();
    if (
      newTag.trim() &&
      !formData.tags.includes(newTag.trim()) &&
      formData.tags.length < 8
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const insertFormatting = (format) => {
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let replacement = "";
    switch (format) {
      case "bold":
        replacement = `**${selectedText}**`;
        break;
      case "italic":
        replacement = `*${selectedText}*`;
        break;
      case "heading":
        replacement = `## ${selectedText}`;
        break;
      case "quote":
        replacement = `> ${selectedText}`;
        break;
      case "code":
        replacement = `\`${selectedText}\``;
        break;
      case "list":
        replacement = `- ${selectedText}`;
        break;
      default:
        replacement = selectedText;
    }

    const newContent =
      textarea.value.substring(0, start) +
      replacement +
      textarea.value.substring(end);
    handleInputChange("content", newContent);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + replacement.length,
        start + replacement.length
      );
    }, 0);
  };

  // New: submit data to backend (handles image upload via FormData)
  const submitPost = async (statusToSet = 0) => {
    setSubmitting(true);

    try {
      const payload = new FormData();
      // Append simple fields
      payload.append("title", formData.title || "");
      payload.append("excerpt", formData.excerpt || "");
      payload.append("content", formData.content || "");
      payload.append("category", formData.category || "");
      payload.append("type", formData.type || "");
      payload.append("publish_date", formData.publishDate || "");
      // map incoming statusToSet (string or number) to a numeric status expected by backend
      const statusValue =
        typeof statusToSet === "number"
          ? statusToSet
          : statusToSet === "draft"
          ? 0
          : statusToSet === "pending_review"
          ? 2
          : statusToSet === "published"
          ? 1
          : 0;
      payload.append("status", statusValue);
      payload.append(
        "estimated_read_time",
        String(formData.estimatedReadTime || 0)
      );
      payload.append("anonymous", formData.anonymous ? "1" : "0");

      // Append tags as JSON string (adjust on backend if needed)
      payload.append("tags", JSON.stringify(formData.tags || []));

      // Append image file if exists
      if (formData.featuredImage) {
        payload.append("image", formData.featuredImage);
      }

      const response = await axios.post(
        `${backendURL}/api/insertBlogPosts`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // 'Authorization': `Bearer ${yourAuthToken}` // Uncomment if auth is needed
          },
        }
      );

      const data = response.data;

      // Open popup (do NOT navigate immediately)
      setIsPopupOpen(true);

      console.log("Server response:", data);
      // DO NOT call handleNavigation here — navigation will happen when popup is closed
    } catch (error) {
      console.error("Submit error:", error);
      alert("There was an error submitting your post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Update handleSave to use submitPost for drafts
  const handleSave = () => {
    submitPost("draft");
  };

  const handlePublish = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in the title and content before publishing.");
      return;
    }
    submitPost("pending_review");
  };

  return (
    <>
      <div className="create-blog-container">
        {/* Header */}
        <header className="create-blog-header">
          <div className="create-blog-header-content">
            <div className="create-blog-header-left">
              <button onClick={handleBack} className="create-blog-back-btn">
                <ArrowLeft className="create-blog-icon" />
                <span>Back to Blog</span>
              </button>
              <div className="create-blog-header-divider"></div>
              <h1>Create New Post</h1>
            </div>

            <div className="create-blog-header-actions">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="create-blog-preview-btn"
                disabled={submitting}
              >
                <Eye className="create-blog-icon" />
                {showPreview ? "Hide Preview" : "Preview"}
              </button>
              <button
                onClick={handleSave}
                className="create-blog-save-btn"
                disabled={submitting}
              >
                <Save className="create-blog-icon" />
                {submitting ? "Saving..." : "Save Draft"}
              </button>
              <button
                onClick={handlePublish}
                className="create-blog-publish-btn"
                disabled={submitting}
              >
                <Sparkles className="create-blog-icon" />
                {submitting ? "Submitting..." : "Publish"}
              </button>
            </div>
          </div>
        </header>

        <div className="create-blog-main">
          {!showPreview ? (
            /* Editor View */
            <div className="create-blog-editor">
              <div className="create-blog-content">
                {/* Title Section */}
                <div className="create-blog-section">
                  <div className="create-blog-section-header">
                    <Type className="create-blog-section-icon" />
                    <h2>Post Title</h2>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter an engaging title for your post..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="create-blog-title-input"
                  />
                </div>

                {/* Excerpt Section */}
                <div className="create-blog-section">
                  <div className="create-blog-section-header">
                    <AlignLeft className="create-blog-section-icon" />
                    <h2>Excerpt</h2>
                    <span className="create-blog-section-subtitle">
                      Brief description for preview
                    </span>
                  </div>
                  <textarea
                    placeholder="Write a compelling excerpt that summarizes your post..."
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    className="create-blog-excerpt-input"
                    rows="3"
                  />
                </div>

                {/* Featured Image Section */}
                <div className="create-blog-section">
                  <div className="create-blog-section-header">
                    <ImageIcon className="create-blog-section-icon" />
                    <h2>Featured Image</h2>
                    <span className="create-blog-section-subtitle">
                      Upload a high-quality cover image
                    </span>
                  </div>

                  <div
                    className={`create-blog-image-upload ${
                      dragOver ? "drag-over" : ""
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <div className="create-blog-image-preview">
                        <img src={imagePreview} alt="Featured" />
                        <div className="create-blog-image-overlay">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setImagePreview(null);
                              setFormData((prev) => ({
                                ...prev,
                                featuredImage: null,
                              }));
                            }}
                            className="create-blog-image-remove"
                          >
                            <X className="create-blog-icon" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="create-blog-upload-placeholder">
                        <Upload className="create-blog-upload-icon" />
                        <h3>Drop your image here or click to browse of Default Size 1200X630 or 1200X900 </h3>
                        <p>Supports JPG, PNG, GIF and WEBP up to 2MB</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files[0] &&
                        handleImageUpload(e.target.files[0])
                      }
                      className="create-blog-file-input"
                    />
                  </div>
                </div>

                {/* Content Editor */}
                <div className="create-blog-section">
                  <div className="create-blog-section-header">
                    <FileText className="create-blog-section-icon" />
                    <h2>Content</h2>
                    <span className="create-blog-section-subtitle">
                      {formData.estimatedReadTime > 0 &&
                        `~${formData.estimatedReadTime} min read`}
                    </span>
                  </div>

                  {/* Formatting Toolbar */}
                  <div className="create-blog-toolbar">
                    <button
                      onClick={() => insertFormatting("bold")}
                      className="create-blog-format-btn"
                    >
                      <Bold className="create-blog-icon" />
                    </button>
                    <button
                      onClick={() => insertFormatting("italic")}
                      className="create-blog-format-btn"
                    >
                      <Italic className="create-blog-icon" />
                    </button>
                    <button
                      onClick={() => insertFormatting("heading")}
                      className="create-blog-format-btn"
                    >
                      <Heading className="create-blog-icon" />
                    </button>
                    <button
                      onClick={() => insertFormatting("quote")}
                      className="create-blog-format-btn"
                    >
                      <Quote className="create-blog-icon" />
                    </button>
                    <button
                      onClick={() => insertFormatting("code")}
                      className="create-blog-format-btn"
                    >
                      <Code className="create-blog-icon" />
                    </button>
                    <button
                      onClick={() => insertFormatting("list")}
                      className="create-blog-format-btn"
                    >
                      <List className="create-blog-icon" />
                    </button>
                  </div>

                  <textarea
                    ref={contentRef}
                    placeholder="Start writing your post... Use markdown formatting for rich text."
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    className="create-blog-content-input"
                    rows="20"
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="create-blog-sidebar">
                {/* Category Selection */}
                <div className="create-blog-sidebar-section">
                  <h3>
                    <Hash className="create-blog-icon" />
                    Category
                  </h3>
                  <div className="create-blog-category-grid">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() =>
                          handleInputChange("category", category.id)
                        }
                        className={`create-blog-category-btn ${
                          formData.category === category.id ? "active" : ""
                        }`}
                      >
                        <span className="create-blog-category-icon">
                          {category.icon}
                        </span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Type */}
                <div className="create-blog-sidebar-section">
                  <h3>
                    <Tag className="create-blog-icon" />
                    Content Type
                  </h3>
                  <div className="create-blog-type-list">
                    {contentTypes.map((type) => (
                      <label key={type.id} className="create-blog-type-option">
                        <input
                          type="radio"
                          name="contentType"
                          value={type.id}
                          checked={formData.type === type.id}
                          onChange={(e) =>
                            handleInputChange("type", e.target.value)
                          }
                        />
                        <div className="create-blog-type-content">
                          <span className="create-blog-type-name">
                            {type.name}
                          </span>
                          <span className="create-blog-type-desc">
                            {type.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="create-blog-sidebar-section">
                  <h3>
                    <Tag className="create-blog-icon" />
                    Tags
                  </h3>
                  <form onSubmit={addTag} className="create-blog-tag-form">
                    <input
                      type="text"
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="create-blog-tag-input"
                    />
                    <button type="submit" className="create-blog-tag-add-btn">
                      <Plus className="create-blog-icon" />
                    </button>
                  </form>
                  <div className="create-blog-tags-list">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="create-blog-tag">
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="create-blog-tag-remove"
                        >
                          <X className="create-blog-icon" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className="create-blog-tag-limit">
                    {formData.tags.length}/8 tags added
                  </p>
                </div>

                {/* Publishing Options */}
                <div className="create-blog-sidebar-section">
                  <h3>
                    <Calendar className="create-blog-icon" />
                    Publishing
                  </h3>
                  <div className="create-blog-publishing-options">
                    <label className="create-blog-form-label">
                      Publish Date
                      <input
                        type="date"
                        value={formData.publishDate}
                        onChange={(e) =>
                          handleInputChange("publishDate", e.target.value)
                        }
                        className="create-blog-date-input"
                      />
                    </label>

                    <div className="create-blog-status-info">
                      <Clock className="create-blog-icon" />
                      <span>Status: {formData.status === 0 ? "Draft" : 1}</span>
                    </div>
                  </div>
                </div>

                <div className="create-blog-sidebar-section">
                  <h3>
                    <User className="create-blog-icon" /> Author
                  </h3>
                  <label className="create-blog-form-label">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) =>
                        handleInputChange("anonymous", e.target.checked)
                      }
                    />
                    Submit as Anonymous
                  </label>
                </div>
              </div>
            </div>
          ) : (
            /* Preview View */
            <div className="create-blog-preview">
              <div className="create-blog-preview-header">
                <h2>Post Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="create-blog-close-preview"
                >
                  <X className="create-blog-icon" />
                </button>
              </div>

              <div className="create-blog-preview-content">
                {/* Preview Hero */}
                <div className="create-blog-preview-hero">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt={formData.title}
                      className="create-blog-preview-image"
                    />
                  )}
                  <div className="create-blog-preview-meta">
                    <span className="create-blog-preview-category">
                      {categories.find((c) => c.id === formData.category)?.name}
                    </span>
                    <span className="create-blog-preview-type">
                      {contentTypes.find((t) => t.id === formData.type)?.name}
                    </span>
                  </div>
                  <h1 className="create-blog-preview-title">
                    {formData.title || "Your Amazing Title Here"}
                  </h1>
                  <div className="create-blog-preview-stats">
                    <span>
                      <User className="create-blog-icon" /> Anonymous User
                    </span>
                    <span>
                      <Clock className="create-blog-icon" />{" "}
                      {formData.estimatedReadTime || "0"} min read
                    </span>
                    <span>
                      <Calendar className="create-blog-icon" />{" "}
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="create-blog-preview-article">
                  <p className="create-blog-preview-excerpt">
                    {formData.excerpt ||
                      "Your compelling excerpt will appear here..."}
                  </p>
                  <div className="create-blog-preview-body">
                    {formData.content ? (
                      <pre>{formData.content}</pre>
                    ) : (
                      <p className="create-blog-preview-placeholder">
                        Your main content will appear here as you type...
                      </p>
                    )}
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="create-blog-preview-tags">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="create-blog-preview-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <BlogSubmitPopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          // navigate after popup closed
          handleNavigation("/real-life-interviews-blog-posts");
        }}
      />
    </>
  );
};

export default CreateBlogPost;
