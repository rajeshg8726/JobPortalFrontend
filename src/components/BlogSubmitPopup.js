import React from "react";
import "./BlogSubmitPopup.css";

const BlogSubmitPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className="popup-icon">✅</div>
        <h2 className="popup-title">Blog Submitted!</h2>
        <p className="popup-message">
          Thank you for sharing your blog. <br />
          Your submission has been sent for admin review. Once approved, it will
          be published soon!
        </p>
        <button className="popup-btn" onClick={onClose}>
          Okay, Got It
        </button>
      </div>
    </div>
  );
};

export default BlogSubmitPopup;
