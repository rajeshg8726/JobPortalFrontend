import React, { useState } from "react";
import { Mail, CheckCircle, Send, Loader, Sparkles, TrendingUp, Users } from "lucide-react";
import axios from "axios";
import "./Newsletter.css";

const Newsletter = ({ backendURL }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${backendURL}/api/subscribeNewsletter`, {
        email: email.trim(),
      });

      if (res.data?.status) {
        setEmail("");
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        setError(res.data?.message || "Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 409) {
        setError("This email is already subscribed!");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="newsletter-wrapper">
      <div className="newsletter-background">
        <div className="newsletter-gradient"></div>
        <div className="newsletter-pattern"></div>
      </div>

      {showSuccess ? (
        <div className="newsletter-success-state">
          <div className="success-animation">
            <div className="success-circle">
              <CheckCircle className="success-icon" />
            </div>
            <div className="success-particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          <h3 className="success-title">You're All Set! 🎉</h3>
          <p className="success-message">
            Welcome aboard! Check your inbox for a confirmation email. 
            We'll keep you updated with the best content.
          </p>
          
          <button 
            onClick={() => setShowSuccess(false)}
            className="success-back-button"
          >
            Subscribe Another
          </button>
        </div>
      ) : (
        <div className="newsletter-content">
          {/* Header */}
          <div className="newsletter-header-section">
            <div className="newsletter-badge">
              <Sparkles size={14} />
              <span>Premium Content</span>
            </div>
            
            <h3 className="newsletter-heading">
              Never Miss an Update
            </h3>
            
            <p className="newsletter-subheading">
              Join <strong>1000+</strong> professionals getting weekly insights on career growth, 
              tech trends, and interview experiences.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="newsletter-form-section">
            <div className="newsletter-input-group">
              <div className="input-icon-nw">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`newsletter-email-input ${error ? "input-error" : ""}`}
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="newsletter-submit-button"
                aria-label="Subscribe"
              >
                {isSubmitting ? (
                  <Loader size={20} className="button-loader" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="newsletter-error-message">
                <span className="error-icon">⚠</span>
                <span>{error}</span>
              </div>
            )}
          </form>

          {/* Benefits */}
          <div className="newsletter-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">
                <TrendingUp size={16} />
              </div>
              <span>Weekly top articles</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <Sparkles size={16} />
              </div>
              <span>Exclusive insights</span>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <Users size={16} />
              </div>
              <span>Join 2K+ readers</span>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="newsletter-trust">
            <div className="trust-avatars">
              <img src="https://i.pravatar.cc/40?img=1" alt="User" />
              <img src="https://i.pravatar.cc/40?img=2" alt="User" />
              <img src="https://i.pravatar.cc/40?img=3" alt="User" />
              <img src="https://i.pravatar.cc/40?img=4" alt="User" />
              <span className="trust-count">+1K</span>
            </div>
            <p className="trust-text">
              ⭐ Rated 4.9/5 by subscribers • No spam, unsubscribe anytime
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;