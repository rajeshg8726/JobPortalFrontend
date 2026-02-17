import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import "./Slider.css";
import axios from "axios";
import { Search, MapPin, Briefcase, TrendingUp, Filter, X, GraduationCap, Globe, Code, Zap, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Modern reusable Search Form
const SearchForm = memo(({ onSubmit, searchTerm, setSearchTerm, location, setLocation, role, setRole, placeholders, isSearching }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <form className="modern-search-form" onSubmit={onSubmit}>
      <div className={`search-form-wrapper ${isExpanded ? 'expanded' : ''}`}>
        {/* Primary Inputs */}
        <div className="search-inputs-primary">
          <div className="search-input-group">
            <Briefcase size={18} className="input-icon" />
            <input
              type="text"
              placeholder={placeholders.role}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="modern-input"
              onFocus={() => setIsExpanded(true)}
              disabled={isSearching}
            />
          </div>
          
          <div className="search-input-group">
            <MapPin size={18} className="input-icon" />
            <input
              type="text"
              placeholder={placeholders.location}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="modern-input"
              onFocus={() => setIsExpanded(true)}
              disabled={isSearching}
            />
          </div>

          <div className="search-input-group flex-1">
            <Search size={18} className="input-icon" />
            <input
              type="text"
              placeholder="Skills, Company, Keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input"
              onFocus={() => setIsExpanded(true)}
              disabled={isSearching}
            />
          </div>

          <button type="submit" className="modern-search-btn" disabled={isSearching} aria-busy={isSearching}>
            {isSearching ? (
              <>
                <span className="btn-spinner" aria-hidden="true"></span>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={18} />
                <span>Search</span>
              </>
            )}
          </button>
        </div>

        {/* Advanced Filters (Expanded) */}
        {isExpanded && (
          <div className="search-advanced-filters">
            <button 
              type="button" 
              className="filter-tag active"
              onClick={() => setIsExpanded(false)}
            >
              <Filter size={14} />
              Show Filters
            </button>
            <button 
              type="button" 
              className="filter-close-btn"
              onClick={() => setIsExpanded(false)}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="search-quick-tips">
        <span className="tip-item">Tip: Use specific keywords for better results</span>
      </div>
    </form>
  );
});

// Carousel Item
const CarouselItem = memo(({ isActive, backgroundImage, title, subtitle, description, searchForm, icon: Icon }) => (
  <div className={`carousel-item-modern ${isActive ? "active" : ""}`}>
    <div
      className="carousel-bg-modern"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="slider-overlay-content">
        <div className="slider-badge">
          <Icon size={16} />
          Popular
        </div>
        <h1 className="slider-title">{title}</h1>
        <p className="slider-subtitle">{subtitle}</p>
        {description && <p className="slider-description">{description}</p>}
        {searchForm}
      </div>
    </div>
  </div>
));


// Carousel Indicators
const CarouselIndicators = memo(({ totalItems, activeIndex, onIndicatorClick }) => (
  <div className="carousel-indicators-modern">
    {Array.from({ length: totalItems }).map((_, index) => (
      <button
        key={index}
        type="button"
        className={`indicator-dot ${index === activeIndex ? "active" : ""}`}
        onClick={() => onIndicatorClick(index)}
        aria-label={`Slide ${index + 1}`}
      />
    ))}
  </div>
));

// Slider Component
const Slider = memo((props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const backendURL = process.env.REACT_APP_API_URL;

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 2);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate search inputs
    if (!role && !location && !searchTerm) {
      alert("Please enter at least one search criteria");
      return;
    }

    setIsSearching(true);
    if (props.setLoading) props.setLoading(true);

    try {
      const res = await axios.get(`${backendURL}/api/jobs-search`, {
        params: { 
          searchTerm: searchTerm.trim(), 
          location: location.trim(), 
          role: role.trim() 
        },
      });
      
      if (res.data && res.data.length > 0) {
        if (props.setSearchedJobs) props.setSearchedJobs(res.data);
        // Scroll to results
        const jobsSection = document.querySelector('.premium-jobcard-container');
        if (jobsSection) {
          jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        if (props.setSearchedJobs) props.setSearchedJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      alert("Error searching jobs. Please try again.");
    } finally {
      setIsSearching(false);
      if (props.setLoading) props.setLoading(false);
    }
  }, [searchTerm, location, role, backendURL, props]);

  const searchForm = useMemo(() => (
    <SearchForm
      onSubmit={handleSearch}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      location={location}
      setLocation={setLocation}
      role={role}
      setRole={setRole}
      isSearching={isSearching}
      placeholders={{
        role: "e.g. Developer",
        location: "e.g. Bengaluru"
      }}
    />
  ), [handleSearch, searchTerm, location, role, isSearching]);

  const searchForm2 = useMemo(() => (
    <SearchForm
      onSubmit={handleSearch}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      location={location}
      setLocation={setLocation}
      role={role}
      setRole={setRole}
      isSearching={isSearching}
      placeholders={{
        role: "Job Role (e.g. Analyst)",
        location: "Location (e.g. Remote)"
      }}
    />
  ), [handleSearch, searchTerm, location, role, isSearching]);

  const carouselItems = useMemo(() => [
    {
      backgroundImage: `${process.env.PUBLIC_URL}/images/t1.webp`,
      title: "Find Your Perfect Job",
      subtitle: "Explore thousands of opportunities from top companies",
      description: "Search by role, location, or skills and land your dream job",
      searchForm: searchForm,
      icon: TrendingUp
    },
    {
      backgroundImage: `${process.env.PUBLIC_URL}/images/t2.webp`,
      title: "Discover Top Companies",
      subtitle: "Apply to exciting roles at leading tech companies",
      description: "Latest internships, entry-level, and senior positions",
      searchForm: searchForm2,
      icon: Briefcase
    }
  ], [searchForm, searchForm2]);

  return (
    <div className="slider-modern-container">
      {/* Main Carousel */}
      <div className="modern-carousel-wrapper">
        <div className="carousel-inner-modern">
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={index}
              isActive={index === activeSlide}
              backgroundImage={item.backgroundImage}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              searchForm={item.searchForm}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Navigation Controls */}
        <button 
          className="carousel-nav-btn prev" 
          onClick={() => setActiveSlide((prev) => (prev - 1 + 2) % 2)}
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button 
          className="carousel-nav-btn next" 
          onClick={() => setActiveSlide((prev) => (prev + 1) % 2)}
          aria-label="Next slide"
        >
          &gt;
        </button>

        {/* Indicators */}
        <CarouselIndicators 
          totalItems={carouselItems.length}
          activeIndex={activeSlide}
          onIndicatorClick={setActiveSlide}
        />
      </div>

      {/* Popular Categories */}
      <section className="quick-categories-section" aria-label="Popular Job Categories">
        <div className="quick-categories-inner">
          <h2 className="quick-categories-title">Explore Opportunities</h2>
          <p className="quick-categories-subtitle">Find jobs that match your skills and career goals</p>
          <div className="quick-categories-grid">
            <Link to="/jobsbytype/Freshers-jobs" className="quick-category-card">
              <div className="quick-category-icon cat-blue"><GraduationCap size={24} /></div>
              <div className="quick-category-info"><h3>Freshers Jobs</h3><p>Start your career journey</p></div>
            </Link>
            <Link to="/jobsbytype/Internship-jobs" className="quick-category-card">
              <div className="quick-category-icon cat-purple"><Award size={24} /></div>
              <div className="quick-category-info"><h3>Internships</h3><p>Gain valuable experience</p></div>
            </Link>
            <Link to="/jobs/Remote-Jobs" className="quick-category-card">
              <div className="quick-category-icon cat-green"><Globe size={24} /></div>
              <div className="quick-category-info"><h3>Remote Jobs</h3><p>Work from anywhere</p></div>
            </Link>
            <Link to="/jobs/2025-batch" className="quick-category-card">
              <div className="quick-category-icon cat-orange"><Users size={24} /></div>
              <div className="quick-category-info"><h3>2025 Batch</h3><p>Latest batch openings</p></div>
            </Link>
            <Link to="/jobsbyrole/software-developer-engineer-role" className="quick-category-card">
              <div className="quick-category-icon cat-cyan"><Code size={24} /></div>
              <div className="quick-category-info"><h3>Software Developer</h3><p>Top tech roles</p></div>
            </Link>
            <Link to="/jobsbyrole/data-scientist-role" className="quick-category-card">
              <div className="quick-category-icon cat-pink"><Zap size={24} /></div>
              <div className="quick-category-info"><h3>Data Science</h3><p>AI & ML opportunities</p></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-indicators-section" aria-label="Platform Statistics">
        <div className="trust-indicators-inner">
          <div className="trust-indicator-item">
            <div className="trust-indicator-icon"><Users size={22} /></div>
            <div className="trust-indicator-content">
              <span className="trust-indicator-number">100+</span>
              <span className="trust-indicator-label">Freshers Helped</span>
            </div>
          </div>
          <div className="trust-indicator-item">
            <div className="trust-indicator-icon"><Briefcase size={22} /></div>
            <div className="trust-indicator-content">
              <span className="trust-indicator-number">250+</span>
              <span className="trust-indicator-label">Job Listings</span>
            </div>
          </div>
          <div className="trust-indicator-item">
            <div className="trust-indicator-icon"><TrendingUp size={22} /></div>
            <div className="trust-indicator-content">
              <span className="trust-indicator-number">100+</span>
              <span className="trust-indicator-label">Top Companies</span>
            </div>
          </div>
          <div className="trust-indicator-item">
            <div className="trust-indicator-icon"><Globe size={22} /></div>
            <div className="trust-indicator-content">
              <span className="trust-indicator-number">100%</span>
              <span className="trust-indicator-label">Free Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Indicator */}
      {isSearching && (
        <div className="search-loading-indicator">
          <div className="loading-spinner-mini"></div>
          <span>Searching jobs...</span>
        </div>
      )}
    </div>
  );
});

Slider.displayName = "Slider";
SearchForm.displayName = "SearchForm";
CarouselItem.displayName = "CarouselItem";
CarouselIndicators.displayName = "CarouselIndicators";

export default Slider;


