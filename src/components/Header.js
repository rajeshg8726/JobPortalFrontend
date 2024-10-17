import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DarkModeToggle from './DarkModeToggle';
import './Stylesheet.css';

function Header({ handleSearch }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg  ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="/rglogo.png" alt="RGLOGO" style={{ width: "2rem" }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Batches
                                </Link>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link class="dropdown-item" to='/jobs/2023-batch' >2023 Batch</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/2024-batch' >2024 Batch</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/2025-batch' >2025 Batch</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/2026-batch' >2026 Batch</Link></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Work Type
                                </Link>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link class="dropdown-item" to='/jobsbytype/Internship-jobs' >Internships</Link></li>
                                    <li><Link class="dropdown-item" to='/jobsbytype/full-time-jobs' >Full Time</Link></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Location
                                </Link>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link class="dropdown-item" to='/jobs/Bengaluru' >Bengaluru</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/Hyderabad' >Hyderabad</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/Gurgaon' >Gurgaon</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/Noida' >Noida</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/Chennai' >Chennai</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/Pune' >Pune</Link></li>
                                    <li><Link class="dropdown-item" to='/jobs/Remote' >Remote</Link></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Roles
                                </Link>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link class="dropdown-item" to='/jobsbyrole/software-engineer-jobs' >Software Engineer</Link></li>
                                    <li><Link class="dropdown-item" to='/jobsbyrole/software-developer-jobs' >Software Developer</Link></li>
                                    <li><Link class="dropdown-item" to='/jobsbyrole/software-testing-jobs' >Software Testing</Link></li>
                                    <li><Link class="dropdown-item" to='/jobsbyrole/cloud-engineeer-jobs' >Cloud Engineer</Link></li>
                                    <li><Link class="dropdown-item" to='/jobsbyrole/analytics-and-data-science-jobs' >Analytics & Data Science</Link></li>
                                    <li><Link class="dropdown-item" to='/jobsbyrole/devops-engineer-jobs' >DevOps Engineer</Link></li>
                                    <li><Link class="dropdown-item" to='/jobsbyrole/technical-support-jobs' >Technical Support Engineer</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/updates">Updates</Link>
                            </li>
                        </ul>
                        <DarkModeToggle />
                        <div className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Display the filtered results */}
            {/* <div>
                {filteredData.map((job, index) => (
                    <div key={index}>
                        <h4>{job.title}</h4>
                        <p>{job.description}</p>
                    </div>
                ))}
            </div> */}
        </>
    );
}

export default Header;
