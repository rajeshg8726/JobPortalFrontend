import React from "react";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./Header.css";

function Header({ setSearchedJobs }) {
  return (
    <header className="modern-header" role="banner">
      <nav className="navbar navbar-expand-lg shadow-sm py-3 modern-navbar">
        <div className="container-fluid px-3 px-md-4">
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to="/"
            onClick={() => setSearchedJobs(null)}
            aria-label="Go to homepage"
          >
            <img
              className="logo"
              src="/logo.webp"
              alt="RGJobs Logo"
              height="40"
              width="40"
            />
            <span className="brand-text fw-semibold" hidden>RGJobs</span>
          </Link>

          <button
            className="navbar-toggler modern-toggler"
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
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2 modern-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={() => setSearchedJobs(null)} end>
                  Home
                </NavLink>
              </li>

              {/* Dropdowns */}
              {[
                {
                  title: "Batches",
                  id: "batchesDropdown",
                  items: ["2023", "2024", "2025", "2026"].map((batch) => ({
                    to: `/jobs/${batch}-batch`,
                    label: `${batch} Batch`,
                  })),
                },
                {
                  title: "Work Type",
                  id: "workTypeDropdown",
                  items: [
                    { to: "/jobsbytype/Internship-jobs", label: "Internships" },
                    { to: "/jobsbytype/full-time-jobs", label: "Full Time" },
                  ],
                },
                {
                  title: "Location",
                  id: "locationDropdown",
                  items: [
                    "Bengaluru",
                    "Hyderabad",
                    "Gurgaon",
                    "Noida",
                    "Chennai",
                    "Pune",
                    "Remote",
                  ].map((city) => ({
                    to: `/jobs/${city}`,
                    label: city,
                  })),
                },
                {
                  title: "Roles",
                  id: "rolesDropdown",
                  items: [
                    "software-engineer",
                    "software-developer",
                    "software-testing",
                    "cloud-engineeer",
                    "analytics-and-data-science",
                    "devops-engineer",
                    "technical-support",
                  ].map((role) => ({
                    to: `/jobsbyrole/${role}-jobs`,
                    label: role.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                  })),
                },
              ].map(({ title, id, items }) => (
                <li className="nav-item dropdown" key={id}>
                  <span
                    className="nav-link dropdown-toggle"
                    id={id}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    tabIndex={0}
                  >
                    {title}
                  </span>
                  <ul className="dropdown-menu rounded-3 shadow-sm" aria-labelledby={id}>
                    {items.map((item, idx) => (
                      <li key={idx}>
                        <NavLink className="dropdown-item" to={item.to}>
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}

              <li className="nav-item">
                <NavLink className="nav-link" to="/real-life-interview-experiences">
                  Interviews
                </NavLink>
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
