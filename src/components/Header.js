import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./Header.css";
import axios from "axios";

function Header({ setSearchedJobs }) {
  const [batch, setBatch] = useState([]);
  const [domains, setDomains] = useState([]);
  const [roles, setRoles] = useState([]);

  const backendURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const response1 = await axios.get(`${backendURL}/api/getAllBatches`);
        const response2 = await axios.get(`${backendURL}/api/getAllDomains`);
        const response3 = await axios.get(`${backendURL}/api/getAllRoles`);
        setBatch(response1.data.batches);
        setDomains(response2.data.domains);
        setRoles(response3.data.roles);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };
    fetchBatchData();
  }, [backendURL]);

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
            <span className="brand-text fw-semibold" hidden>
              RGJobs
            </span>
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
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={() => setSearchedJobs(null)}
                  end
                >
                  Home
                </NavLink>
              </li>

              {/* Dropdowns */}
              {[
                {
                  title: "Batches",
                  id: "batchesDropdown",
                  items: batch.map((batch) => ({
                    to: `/jobs/${batch.name}-batch`,
                    label: `${batch.name} Batch`,
                  })),
                },
                {
                  title: "Experiences Level",
                  id: "workTypeDropdown",
                  items: [
                    { to: "/jobsbytype/Internship-jobs", label: "Internships" },
                    { to: "/jobsbytype/Freshers-jobs", label: "Freshers" },
                    {
                      to: "/jobsbytype/0-1-year-experience-jobs",
                      label: "0-1 Year Experience",
                    },
                    {
                      to: "/jobsbytype/1-3-years-experience-jobs",
                      label: "1-3 Years Experience",
                    },
                    {
                      to: "/jobsbytype/3-5-years-experience-jobs",
                      label: "3-5 Years Experience",
                    },
                    {
                      to: "/jobsbytype/senior-roles-jobs",
                      label: "Senior Roles",
                    },
                    {
                      to: "/jobsbytype/Managerial-roles-jobs",
                      label: "Managerial Roles",
                    },
                  ],
                },
                {
                  title: "Domains",
                  id: "locationDropdown",
                  items: domains.map((it) => ({
                    to: `/jobs/${
                      it.name
                        .toLowerCase()
                        .replace(/\//g, "-")      // replace all slashes with hyphens
                        .replace(/\s+/g, "-") // spaces to hyphens
                        .replace(/-+/g, "-") // multiple hyphens to single
                        .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens
                    }-domain`,
                    label: it.name
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase()),
                  })),
                },
                {
                  title: "Job Roles",
                  id: "rolesDropdown",
                  items: roles.map((it) => ({
                    to: `/jobsbyrole/${it.name
                      .toLowerCase()
                      .replace(/\//g, "-")      // replace all slashes with hyphens
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .replace(/^-+|-+$/g, "")}-role`,
                    label: it.name
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase()),
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
                  <ul
                    className="dropdown-menu rounded-3 shadow-sm"
                    aria-labelledby={id}
                  >
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
                <NavLink
                  className="nav-link"
                  to="/real-life-interviews-blog-posts"
                >
                  Tech Hub
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
