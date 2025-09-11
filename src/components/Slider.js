import React, { useState, useCallback, useMemo, memo } from "react";
import "./Slider.css";
import axios from "axios";

// Modern reusable Search Form
const SearchForm = memo(({ onSubmit, searchTerm, setSearchTerm, location, setLocation, role, setRole, placeholders }) => (
  <form className="modern-search-form" onSubmit={onSubmit}>
    <input
      type="text"
      placeholder={placeholders.role}
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="modern-input"
    />
    <input
      type="text"
      placeholder={placeholders.location}
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="modern-input"
    />
    <input
      type="text"
      placeholder="Title, Skills, Company"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="modern-input"
    />
    <button type="submit" className="modern-search-btn">🔍 Search</button>
  </form>
));

// Carousel Item
const CarouselItem = memo(({ isActive, backgroundImage, title, subtitle, searchForm, interval = "20000" }) => (
  <div className={`carousel-item ${isActive ? "active" : ""}`} data-bs-interval={interval}>
    <div
      className="carousel-bg-modern"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${backgroundImage})`,
      }}
    >
      <div className="slider-overlay-content">
        <h1 className="slider-title">{title}</h1>
        <p className="slider-subtitle">{subtitle}</p>
        {searchForm}
      </div>
    </div>
  </div>
));

// Slider Component
const Slider = memo((props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");

  const backendURL = process.env.REACT_APP_API_URL;

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (props.setLoading) props.setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/jobs-search`, {
        params: { searchTerm, location, role },
      });
      if (props.setSearchedJobs) props.setSearchedJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
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
      placeholders={{
        role: "Job Role (e.g. Developer)",
        location: "Location (e.g. Bengaluru)"
      }}
    />
  ), [handleSearch, searchTerm, location, role]);

  const searchForm2 = useMemo(() => (
    <SearchForm
      onSubmit={handleSearch}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      location={location}
      setLocation={setLocation}
      role={role}
      setRole={setRole}
      placeholders={{
        role: "Job Role (e.g. Analyst)",
        location: "Location (e.g. Remote)"
      }}
    />
  ), [handleSearch, searchTerm, location, role]);

  const carouselItems = useMemo(() => [
    {
      backgroundImage: `${process.env.PUBLIC_URL}/images/t1.webp`,
      title: "Find Your Dream Job",
      subtitle: "Search jobs by role, location, or skills",
      searchForm: searchForm
    },
    {
      backgroundImage: `${process.env.PUBLIC_URL}/images/t2.webp`,
      title: "Explore Top Companies",
      subtitle: "Apply to the latest openings and internships",
      searchForm: searchForm2
    }
  ], [searchForm, searchForm2]);

  return (
    <div className="slider-modern-container">
      <div id="carouselExampleIndicators" className="carousel slide modern-carousel">
        <div className="carousel-indicators">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={index}
              isActive={index === 0}
              backgroundImage={item.backgroundImage}
              title={item.title}
              subtitle={item.subtitle}
              searchForm={item.searchForm}
            />
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
});

Slider.displayName = "Slider";
SearchForm.displayName = "SearchForm";
CarouselItem.displayName = "CarouselItem";

export default Slider;