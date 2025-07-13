import React from "react";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./Header.css";

function Header(props) {
  return (
    <header className="modern-header" role="banner">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2"
        aria-label="Main navigation"
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            onClick={() => props.setSearchedJobs(null)}
            aria-label="Go to homepage"
          >
            <img className="logo"
              src="/logo.png"
              alt="RGJobs Logo"
              
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarModern"
            aria-controls="navbarModern"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarModern">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 modern-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={() => props.setSearchedJobs(null)}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="batchesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  Batches
                </span>
                <ul className="dropdown-menu" aria-labelledby="batchesDropdown">
                  {["2023", "2024", "2025", "2026"].map((batch) => (
                    <li key={batch}>
                      <NavLink
                        className="dropdown-item"
                        to={`/jobs/${batch}-batch`}
                      >
                        {batch} Batch
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="workTypeDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  Work Type
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="workTypeDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbytype/Internship-jobs"
                    >
                      Internships
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbytype/full-time-jobs"
                    >
                      Full Time
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="locationDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  Location
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="locationDropdown"
                >
                  {[
                    "Bengaluru",
                    "Hyderabad",
                    "Gurgaon",
                    "Noida",
                    "Chennai",
                    "Pune",
                    "Remote",
                  ].map((city) => (
                    <li key={city}>
                      <NavLink className="dropdown-item" to={`/jobs/${city}`}>
                        {city}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="rolesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  Roles
                </span>
                <ul className="dropdown-menu" aria-labelledby="rolesDropdown">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbyrole/software-engineer-jobs"
                    >
                      Software Engineer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbyrole/software-developer-jobs"
                    >
                      Software Developer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbyrole/software-testing-jobs"
                    >
                      Software Testing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbyrole/cloud-engineeer-jobs"
                    >
                      Cloud Engineer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbyrole/analytics-and-data-science-jobs"
                    >
                      Analytics & Data Science
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbyrole/devops-engineer-jobs"
                    >
                      DevOps Engineer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/jobsbyrole/technical-support-jobs"
                    >
                      Technical Support Engineer
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/real-life-interview-experiences"
                >
                  Interviews
                </NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center ms-lg-3 mt-3 mt-lg-0">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
