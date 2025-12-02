import React from "react";
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react";

const ShareMenu = ({ showMenu, setShowMenu, handleShare, copied }) => {
  return (
    <div className="blog-share-container">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="blog-action-btn"
        aria-label="Share post"
      >
        <Share2 size={20} />
      </button>

      {showMenu && (
        <>
          <div
            className="blog-share-overlay"
            onClick={() => setShowMenu(false)}
          />
          <div className="blog-share-menu">
            <button onClick={() => handleShare("twitter")}>
              <Twitter size={18} />
              <span>Twitter</span>
            </button>
            <button onClick={() => handleShare("facebook")}>
              <Facebook size={18} />
              <span>Facebook</span>
            </button>
            <button onClick={() => handleShare("linkedin")}>
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </button>
            <button onClick={() => handleShare("copy")}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareMenu;